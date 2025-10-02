import { PrismaClient } from '../generated/prisma';

// this creates an instance of primsa client that we need to import everywhere. 
// This is the connction to db

const prisma = new PrismaClient();

export default prisma; 