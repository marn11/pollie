import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePollDto } from './dto/create-poll.dto';
import * as crypto from 'crypto';
import { VoteDto } from './dto/vote.dto';

@Injectable()
export class PollsService {
  constructor(private prisma: PrismaService) {}

  async create(createPollDto: CreatePollDto, userId: number) {
    const { title, description, isAnonymous, options } = createPollDto;

    return this.prisma.poll.create({
      data: {
        title,
        description,
        isAnonymous,
        creatorId: isAnonymous ? null : userId,
        options: {
          create: options.map((text) => ({ text })),
        },
      },
      include: {
        options: true,
      },
      // this will tell prisma to return the options too
    });
  }

  async findAll() {
    const polls = await this.prisma.poll.findMany({
      include: {
        creator: {
          select: {
            name: true,
            avatar: true,
            email: true,
          },
        },
        _count: {
          select: { votes: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    return polls.map((poll) => ({
      ...poll,
      creator: poll.isAnonymous
        ? { name: 'Anonymous', avatar: null, seed: `anon-poll-${poll.id}` }
        : {
            name: poll.creator?.name || 'Guest',
            avatar: poll.creator?.avatar || null,
            seed: poll.creator?.email || `guest-${poll.id}`,
          },
    }));
  }

  async castVote(pollId: number, voteDto: VoteDto, user: any) {
    const { optionId, voteAnonymous } = voteDto;
    const voterHash = crypto
      .createHash('sha256')
      .update(`${user.userId}-${pollId}-${process.env.JWT_SECRET}`)
      .digest('hex');
    const existingVote = await this.prisma.vote.findUnique({
      where: {
        pollId_voterHash: {
          pollId,
          voterHash,
        },
      },
    });
    if (existingVote) throw new BadRequestException('You already voted here');
    const option = await this.prisma.option.findFirst({
      where: {
        id: optionId,
        pollId,
      },
    });

    if (!option) {
      throw new BadRequestException('Invalid option for this poll');
    }
    // hash = sha256(userid+pollid+secretsalt)
    return this.prisma.vote.create({
      data: {
        pollId,
        optionId,
        voterHash,
        isAnonymous: voteAnonymous,
        userId: voteAnonymous ? null : user.userId,
      },
    });
  }
  async findOne(pollId: number, userId: number) {
    const voterHash = crypto
      .createHash('sha256')
      .update(`${userId}-${pollId}-${process.env.JWT_SECRET}`)
      .digest('hex');
    const poll = await this.prisma.poll.findUnique({
      where: { id: pollId },
      include: {
        creator: {
          select: { name: true, avatar: true },
        },
        options: {
          include: {
            _count: {
              select: { votes: true },
            },
          },
        },
        votes: {
          include: {
            user: {
              select: { name: true, avatar: true },
            },
          },
        },
      },
    });
    if (!poll) throw new NotFoundException('Poll not found');
    const userVote = await this.prisma.vote.findUnique({
      where: {
        pollId_voterHash: { pollId, voterHash },
      },
    });
    const totalVotes = poll.options.reduce(
      (sum, opt) => sum + opt._count.votes,
      0,
    );
    return {
      id: poll.id,
      title: poll.title,
      description: poll.description,
      isAnonymous: poll.isAnonymous,
      creator: poll.isAnonymous
        ? { name: 'Anonymous', avatar: null, seed: `anon-poll-${poll.id}` }
        : {
            name: poll.creator?.name || 'Guest',
            avatar: poll.creator?.avatar || null,
            seed: `user-${poll.creator?.name}`,
          },
      hasVoted: !!userVote,
      selectedOptionId: userVote?.optionId || null,
      totalVotes,
      options: poll.options.map((opt) => ({
        id: opt.id,
        text: opt.text,
        count: opt._count.votes,
        percentage:
          totalVotes > 0
            ? Math.round((opt._count.votes / totalVotes) * 100)
            : 0,
      })),
      voters: poll.votes.map((v) => ({
        name: v.isAnonymous ? 'Anonymous' : v.user?.name || 'Public User',
        avatar: v.isAnonymous ? null : v.user?.avatar || null,
        optionText: poll.options.find((o) => o.id === v.optionId)?.text,
        seed: v.isAnonymous
          ? `anon-voter-${v.id}`
          : v.user?.name || `user-${v.id}`,
      })),
    };
  }
}
