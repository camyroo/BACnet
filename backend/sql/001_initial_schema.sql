CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(255) NOT NULL,
  discriminator VARCHAR(4) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  sub_tier VARCHAR(50) DEFAULT 'free' NOT NULL,
  stripe_customer_id VARCHAR(255) UNIQUE,
  CONSTRAINT unique_username_discriminator UNIQUE (username, discriminator)
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username_discriminator ON users(username, discriminator);
CREATE INDEX idx_users_stripe_customer_id ON users(stripe_customer_id) WHERE stripe_customer_id IS NOT NULL;
