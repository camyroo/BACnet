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

### Usage
```bash

# 1. Start database
cd ..
docker-compose up -d

# 2. Run servers (need TWO terminals)
# Terminal 1:
cd backend && npm run dev

# Terminal 2:
cd frontend && npm run dev
```

### Installation
```bash
# 1. Clone
git clone git@github.com:camyroo/BACnet.git
cd BACnet

# 2. Install (two separate directories)
cd backend && npm install
cd ../frontend && npm install

# 3. Environment setup
cd ../backend
cp .env.example .env
# Generate JWT_SECRET and add to .env
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

```
