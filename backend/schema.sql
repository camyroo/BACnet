-- 1. Nuke db and make a new one

-- 1. fine if we want to start fresh
DROP TABLE IF EXISTS users;

-- Then run: 
-- sudo docker exec -i BACnet_db psql -U postgres ~/BACnet/backend/schema.sql


-- 2. Apply migration to existing db

-- create new migration file. e.g 001_add_password_field.sql and add commands like below:

-- Add a new column
--LTER TABLE users ADD COLUMN password_hash VARCHAR(255);

-- Modify an existing column
--ALTER TABLE users ALTER COLUMN name TYPE VARCHAR(200);

-- Then run:
-- docker exec -i BACnet_db psql -U postgres < ~/BACnet/backend/migrations/001_add_password_field.sql


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    subscription_tier VARCHAR(50) DEFAULT 'free'
);

INSERT INTO users (email, name) VALUES 
    ('test@example.com', 'Test User'),
    ('gilbert@gilbert.com', 'Gilbert');