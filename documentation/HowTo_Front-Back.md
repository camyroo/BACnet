# Flow Front-Back

## User Interaction Flow

1. Page loads
   ↓
2. useEffect runs
   ↓
3. fetchUsers() called → GET /api/users
   ↓
4. Users displayed in list
   ↓
5. User fills out form
   ↓
6. User clicks "Create User"
   ↓
7. createUser() called → POST /api/users
   ↓
8. Form cleared
   ↓
9. fetchUsers() called again → list updates with new user

## Frontend-Backend Communication

### GET Request Flow
```
Frontend (Next.js)              Backend (Express)
─────────────────────          ──────────────────
GET http://localhost:3001      → userController.getUsers()
   /api/users                     → prisma.user.findMany()
                                  → returns JSON
```

### POST Request Flow
```
Frontend (Next.js)              Backend (Express)
─────────────────────          ──────────────────
POST http://localhost:3001     → userController.createUser()
   /api/users                     → prisma.user.create()
   body: {email, username}        → returns new user
```

## Remember this

- **State** = Variables that cause re-renders when changed
- **useEffect** = Run code when component loads
- **fetch** = Make HTTP requests to your backend
- **async/await** = Handle asynchronous operations (API calls)
- **Controlled inputs** = Form inputs controlled by React state