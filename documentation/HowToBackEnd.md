# Backend Setup Flow

## Complete Backend Architecture Flow

1. **Prisma Schema** (schema.prisma)
   ↓ defines table structure
   
2. **Migration** (npx prisma migrate dev)
   ↓ creates actual database table
   
3. **Prisma Client** (db.ts)
   ↓ provides connection to database
   
4. **Controller** (userController.ts)
   ↓ uses prisma to do database operations
   
5. **Routes** (userRoutes.ts)
   ↓ maps URLs to controller functions
   
6. **Main App** (index.ts)
   ↓ connects routes to Express server
   
7. **API endpoints are ready**

## Available API Endpoints

```
GET    /api/users           - Get all users
POST   /api/users           - Create new user

```

## Remember

- **Prisma Schema** = Blueprint for your database
- **Migration** = Applies the blueprint to actual database
- **Prisma Client** = Your tool to talk to the database
- **Controller** = Business logic (what to do with data)
- **Routes** = URL mapping (which URL calls which controller)
- **Main App** = Connects everything together