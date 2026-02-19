# 🗳️ Pollie: Secure & Anonymous Polling System
Pollie is a full-stack polling application built with NestJS and Next.js. It allows users to create public or anonymous polls and cast votes with a strict "one-vote-per-user" enforcement while also giving voters the ability to keep their vote private. The app is responsive btw!

<img width="1900" height="942" alt="image" src="https://github.com/user-attachments/assets/b701f8b3-bf03-4c6f-bfd7-751444a2fb70" />
<img width="1917" height="944" alt="image" src="https://github.com/user-attachments/assets/e7fee617-864a-46d2-ac09-9bd3bd0bd0b1" />

## 📖 Overview
- Creation is Flexible: Polls can be public (showing the creator) or anonymous (hiding the creator even from database admins).
- Voting is Secure: Users can choose to vote publicly or anonymously on any given poll.
- Integrity is Guaranteed: The system prevents double-voting using cryptographic hashing, ensuring results are always accurate.

## 🛠️ Key Technical Choices
1) I opted for the latest Prisma 7 architecture. Unlike previous versions that relied on a heavy Rust-based engine, Prisma 7 uses a TypeScript-native Driver Adapter (@prisma/adapter-pg). They announced that the bundle output is now 90% smaller!
2) To satisfy the "Absolute Anonymity" requirement, I implemented a Salted SHA-256 Hashing strategy. When a user votes, I generate a voterHash using `SHA256(UserId + PollId + SECRET_SALT)`.
3) For users without profile pictures or for anonymous participants, I integrated Facehash which is a cool package I found while scrolling on X.
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
