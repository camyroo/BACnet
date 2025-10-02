import { PrismaClient } from '../generated/prisma';

// part of prisma db - source of truth 
// this creates an instance of primsa client that we need to import everywhere. 
// This is the connction to db. 

// usually we shouldn't need to touch this again. 

const prisma = new PrismaClient();

export default prisma; 