🗳️ Pollie: Secure & Anonymous Polling System
Pollie is a full-stack polling application built with NestJS and Next.js. It allows users to create public or anonymous polls and cast votes with a strict "one-vote-per-user" enforcement while also giving the voters the ability to keep their vote private.

📖 Overview
In a world where data privacy is paramount, Pollie provides a platform for honest feedback. Whether it's a team decision or a controversial social debate, Pollie ensures that:

Creation is Flexible: Polls can be public (showing the creator) or anonymous (hiding the creator even from database admins).

Voting is Secure: Users can choose to vote publicly or anonymously on any given poll.

Integrity is Guaranteed: The system prevents double-voting using cryptographic hashing, ensuring results are always accurate.

🛠️ Key Technical Choices
1. Prisma 7 & Driver Adapters
I opted for the latest Prisma 7 architecture. Unlike previous versions that relied on a heavy Rust-based engine, Prisma 7 uses a TypeScript-native Driver Adapter (@prisma/adapter-pg). They announced that the bundle output is now 90% smaller!

2. Salted Deterministic Hashing for Anonymity
To satisfy the "Absolute Anonymity" requirement, I implemented a Salted SHA-256 Hashing strategy.

Mechanism: When a user votes, I generate a voterHash using SHA256(UserId + PollId + SECRET_SALT).

Why: This creates a "blind" unique identifier. I can enforce the "one-vote-per-user" rule at the database level (using a unique constraint) without ever storing a direct link between a UserId and a Vote in anonymous mode. Even with full database access, the votes cannot be traced back to individuals.

3. Deterministic Avatars with facehash
For users without profile pictures or for anonymous participants, I integrated Facehash which is a cool package I found while scrolling on X.

Why: It provides a friendly, visual identity without requiring external image hosting or compromising privacy. By seeding the Facehash with the voterHash or a pollId, I ensure a user has a consistent "face" throughout a session without actually knowing who they are.

4. HttpOnly Cookie Authentication
Authentication is handled via JWTs stored in HttpOnly cookies.

Why: This is the industry standard for preventing XSS (Cross-Site Scripting) attacks. Since the frontend JavaScript cannot access the cookie, the token cannot be stolen by malicious scripts, unlike localStorage implementations.

🚀 Local Setup Instructions
Prerequisites
Docker & Docker Compose

Node.js v20+

Google Cloud Project (for OAuth credentials)

1. Clone & Environment Setup


git clone https://github.com/your-username/pollie.git
cd pollie
Create a .env file in the root and backend folders with the following:


``DATABASE_URL="postgresql://user:password@localhost:5432/pollie?schema=public"
JWT_SECRET="your_ultra_secret_string"
GOOGLE_CLIENT_ID="your_google_id"
GOOGLE_CLIENT_SECRET="your_google_secret"
GOOGLE_CALLBACK_URL="http://localhost:3000/auth/google/callback"
NEXT_PUBLIC_API_URL="http://localhost:3000/"``

2. Run the app

1. Install dependencies:
	- `chmod +x ./setup.sh`
	- `bash ./setup.sh`
	
🏗️ Architecture
Frontend: Next.js 16 (App Router), Tailwind CSS, Lucide-React, Facehash.

Backend: NestJS, Passport.js (Google OAuth2), JWT.

ORM: Prisma 7 with PostgreSQL.

Security: Bcrypt, Crypto (SHA-256), HttpOnly Cookies.