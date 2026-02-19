# 🗳️ Pollie: Secure & Anonymous Polling System
Pollie is a full-stack polling application built with NestJS and Next.js. It allows users to create public or anonymous polls and cast votes with a strict "one-vote-per-user" enforcement while also giving voters the ability to keep their vote private.

## 📖 Overview
- Creation is Flexible: Polls can be public (showing the creator) or anonymous (hiding the creator even from database admins).
- Voting is Secure: Users can choose to vote publicly or anonymously on any given poll.
- Integrity is Guaranteed: The system prevents double-voting using cryptographic hashing, ensuring results are always accurate.

## 🛠️ Key Technical Choices
1) Prisma 7 & Driver Adapters — Uses the TypeScript-native Driver Adapter (@prisma/adapter-pg) for a smaller bundle.
2) Salted Deterministic Hashing — Voter hash is `SHA256(UserId + PollId + SECRET_SALT)` to enforce one-vote-per-user without linking identities.
3) Deterministic Avatars — Facehash seeds avatars with the voter hash or poll id for consistent visuals without storing identities.
4) HttpOnly Cookie Auth — JWTs live in HttpOnly cookies to mitigate XSS token theft.

## 🚀 Local Setup Instructions
**Prerequisites:** Docker & Docker Compose, Node.js v20+, Google Cloud Project (for OAuth credentials)

### 1) Clone the repo
```bash
git clone https://github.com/marn11/pollie.git
cd pollie
```

### 2) Create the required env files (three total)
- `postgres/.env`
```env
POSTGRES_USER=<db_user>
POSTGRES_PASSWORD=<db_password>
POSTGRES_DB=<db_name>
```

- `backend/.env`
```env
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
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1/
JWT_SECRET=<same_jwt_secret_as_backend>
```

### 3) Run everything with the helper script
```bash
chmod +x ./setup.sh
./setup.sh
```

The script validates the env files, builds the Docker images, brings up the stack, runs Prisma migrations, and seeds the database. Once it finishes, the app is available at http://localhost:3000.

## 🏗️ Architecture
- Frontend: Next.js 16 (App Router), Tailwind CSS, Lucide-React, Facehash.
- Backend: NestJS, Passport.js (Google OAuth2), JWT.
- ORM: Prisma 7 with PostgreSQL.
- Security: Bcrypt, Crypto (SHA-256), HttpOnly Cookies.
