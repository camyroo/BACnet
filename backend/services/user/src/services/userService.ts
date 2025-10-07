import * as userRepository from '../repositories/userRepository';

export const getAllUsers = async () => {
  return await userRepository.findAllUsers();
};

export const getUserById = async (id: string) => {
  return await userRepository.findUserById(id);
}

export const getUserByEmail = async (email: string) => {
  return await userRepository.findUserByEmail(email)
}

export const updateUserById = async () => {

}

export const updateUserStatus = async () => {

}

export const createNewUser = async (email: string, name: string) => {
  const discriminator = Math.floor(1000 + Math.random() * 9000).toString();
  
  return await userRepository.insertUser(email, name, discriminator);
};

export const deleteUser = async (id: string) => {
  const user = await userRepository.removeUserById(id);
  
  if (!user) {
    throw new Error('User not found');
  }
  
  return user;
};