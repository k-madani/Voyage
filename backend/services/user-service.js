import User from "../models/user.js";

export const searchByEmail = async (params = {}) => {
  const user = await User.findOne({email: params.email}).exec(); // exec returns a promise
  return user;
};

export const searchById = async (params = {}) => {
  const user = await User.findOne({_id: params.id}).exec(); // exec returns a promise
  return user;
};

export const create = async (params = {}) => {
  const user = new User(params);
  return await user.save();
};

export const remove = async (id) => {
  return await User.findByIdAndDelete(id).exec();
};

export const update = async (params, id) => {
  const user = await User
    .findByIdAndUpdate(id, params, { new: true })
    .exec();
  return user;
};
