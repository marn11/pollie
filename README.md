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

1. Clone the repo

git clone https://github.com/your-username/pollie.git
cd pollie

2. Create the required env files (three total)

- `postgres/.env`

```
POSTGRES_USER=<db_user>
POSTGRES_PASSWORD=<db_password>
POSTGRES_DB=<db_name>
```

- `backend/.env`

```
# Postgres connection (container names match docker-compose)
DATABASE_URL=postgresql://<db_user>:<db_password>@postgres:5432/<db_name>
DATABASE_HOST=postgres
DATABASE_PORT=5432
POSTGRES_USER=<db_user>
POSTGRES_PASSWORD=<db_password>
POSTGRES_DB=<db_name>

# Auth / secrets
JWT_SECRET=<jwt_secret>
CLIENT_ID=<google_oauth_client_id>
CLIENT_SECRET=<google_oauth_client_secret>
CALLBACK_URL=http://localhost:3001/api/v1/auth/google/callback
```

- `frontend/.env`

```
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1/
JWT_SECRET=<same_jwt_secret_as_backend>
```

3. Run everything with the helper script

- `chmod +x ./setup.sh`
- `./setup.sh`

The script validates the env files, builds the Docker images, runs Prisma migrations, and seeds the database. Once it finishes, the app is available at http://localhost:3000.

🏗️ Architecture
Frontend: Next.js 16 (App Router), Tailwind CSS, Lucide-React, Facehash.

Backend: NestJS, Passport.js (Google OAuth2), JWT.

ORM: Prisma 7 with PostgreSQL.

Security: Bcrypt, Crypto (SHA-256), HttpOnly Cookies.
