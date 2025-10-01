# BACnet Social Platform

A real-time messaging platform featuring servers, channels, direct messages, and voice chat capabilities for communities and teams.

## Tech Stack

**Frontend**
- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- NextAuth.js (Google OAuth)

**Backend**
- Express.js
- Socket.io (Real-time communication)
- Prisma ORM
- PostgreSQL

**Infrastructure**
- Docker
- AWS S3 / Cloudinary (File storage)
- Vercel (Frontend hosting)
- Railway (Backend hosting)

**Additional**
- WebRTC (Voice chat)
- Stripe (Payment processing - Test Mode)

## Features

- Real-time messaging with instant delivery
- Voice channels powered by WebRTC
- Server and channel organization
- Direct messages between users
- File and image sharing
- User presence indicators (online/offline/busy)
- Role-based permissions (owner, admin, member)
- Typing indicators
- Message editing and deletion

## Setup

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- PostgreSQL

### Installation
```bash
# Clone repository
git clone <repo-url>
cd bacnet-social

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Start with Docker
docker-compose up -d

# Run database migrations
npx prisma migrate dev

# Start development servers
npm run dev