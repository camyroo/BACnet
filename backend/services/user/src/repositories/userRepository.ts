import pool from '../config/db';

export const findAllUsers = async () => {
  const result = await pool.query('SELECT * FROM users');
  return result.rows;
};

export const findUserById = async (id: string) => {
  const result = await pool.query(
    'SELECT * FROM users WHERE id = $1',
    [id]
  )
  return result.rows[0]
}

export const findUserByEmail = async (email: string) => {
  const result = await pool.query(
    'SELECT * FROM users WHERE email = $1',
    [email]
  )
  return result.rows[0]
}

export const updateUserById = async () => {

}

export const updateUserStatus = async () => {

}

export const insertUser = async (email: string, name: string, discriminator: string) => {
  const result = await pool.query(
    'INSERT INTO users (email, name, discriminator) VALUES ($1, $2, $3) RETURNING *',
    [email, name, discriminator]
  );
  return result.rows[0];
};

export const removeUserById = async (id: string) => {
  const result = await pool.query(
    'DELETE FROM users WHERE id = $1 RETURNING *',
    [id]
  );
  return result.rows[0];
};