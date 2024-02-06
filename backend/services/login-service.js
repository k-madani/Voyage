import loginUser from "../models/user.js";

export const userLogin = async (userCredentials = {}) => {
  const user = await loginUser.findOne(userCredentials).exec();
  return user;
};
