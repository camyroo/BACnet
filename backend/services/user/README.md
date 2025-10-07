# Setup for now 

# 1. Navigate to the project
cd ~/BACnet/backend/services/user

# 2. Create .env file
envPOSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=bacnet
POSTGRES_USER=cam
POSTGRES_PASSWORD=password123

# 3. Start the database container
docker-compose up -d

# 4. Wait a few seconds for DB to initialize, then create the schema
docker exec -i bacnet_db psql -U cam -d bacnet < src/sql/schema.sql

# 5. Verify the table was created
docker exec -it bacnet_db psql -U cam -d bacnet -c "\d users"

# Quick Check Commands

# Check if database is running
docker ps

# Check if table exists
docker exec -it bacnet_db psql -U cam -d bacnet -c "\dt"

# Test the API
curl http://localhost:3001/api/users