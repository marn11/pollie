import { Pool } from "pg";
import { PrismaClient } from "../src/generated/client";
import { PrismaPg } from "@prisma/adapter-pg";


const pool = new Pool({connectionString: process.env.DATABASE_URL});
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({adapter});

async function main() {
	await prisma.user.upsert({
		where: {email: "admin@test.com"},
		update: {},
		create : {
			email: "admin@test.com",
			name: "Admin",
		},
	});
	console.log("Seeding finished!");
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
})
.finally(async () => {
	await prisma.$disconnect();
});