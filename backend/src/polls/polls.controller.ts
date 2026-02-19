import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { PollsService } from './polls.service';
import { AuthGuard } from '@nestjs/passport';
import { CreatePollDto } from './dto/create-poll.dto';
import { VoteDto } from './dto/vote.dto';

@Controller('polls')
export class PollsController {
  constructor(private readonly pollsService: PollsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createPollDto: CreatePollDto, @Req() req) {
    return this.pollsService.create(createPollDto, req.user.userId);
  }
  @Post(':id/vote')
  @UseGuards(AuthGuard('jwt'))
  vote(
    @Param('id', ParseIntPipe) id: number,
    @Body() voteDto: VoteDto,
    @Req() req,
  ) {
    return this.pollsService.castVote(id, voteDto, req.user);
  }
  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    return this.pollsService.findAll();
  }
  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Param('id', ParseIntPipe) id: number, @Req() req) {
    return this.pollsService.findOne(id, req.user.userId);
  }
}
