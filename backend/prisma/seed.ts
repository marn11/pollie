import { Pool } from 'pg';
import { PrismaClient } from '../src/generated/client';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: 'admin@pollie.dev' },
    update: {},
    create: {
      email: 'admin@pollie.dev',
      name: 'Pollie Admin',
    },
  });
  const polls = [
    {
      title: 'Should AI models be allowed in primary education?',
      description: 'Discussing the role of LLMs for students under 12.',
      isAnonymous: false,
      options: [
        'Yes, as a tutor',
        "No, it's too early",
        'Only for teachers',
        'Under strict supervision',
      ],
    },
    {
      title: 'The 2026 Remote Work Debate',
      description: 'How many days should we really be in the office?',
      isAnonymous: true,
      options: [
        'Fully Remote',
        '1 day a week',
        '3 days (Hybrid)',
        'Office only',
      ],
    },
    {
      title: 'Best coding language for 2026?',
      description: 'Which language is dominating your workflow this year?',
      isAnonymous: false,
      options: ['TypeScript', 'Rust', 'Go', 'Python (AI focus)', 'Zig'],
    },
    {
      title: 'The Ultimate Pizza Topping Crime',
      description: 'Which of these truly does NOT belong on a pizza?',
      isAnonymous: true,
      options: [
        'Pineapple',
        'Anchovies',
        'Corn',
        'Olives',
        'Kiwi (Wait, what?)',
      ],
    },
    {
      title: 'Which superpower would help a Dev the most?',
      description: 'If you could pick one...',
      isAnonymous: false,
      options: [
        "Reading the client's mind",
        'Time Travel (for deadlines)',
        'Infinite Focus',
        'No need for sleep',
      ],
    },
  ];

  for (const p of polls) {
    await prisma.poll.create({
      data: {
        title: p.title,
        description: p.description,
        isAnonymous: p.isAnonymous,
        creatorId: p.isAnonymous ? null : admin.id,
        options: {
          create: p.options.map((o) => ({ text: o })),
        },
      },
    });
  }
  console.log('Seeding finished!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
