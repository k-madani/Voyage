import User from "../models/user.js";

export const getMiles = async (id) => {
    const user = await User.findOne({ _id: id }).exec();
    return { id, milePoints: user.milePoints };
}

export const updateMiles = async (id, params) => {
    const user = await User.findByIdAndUpdate(id, params, { new: true }).exec();
    return { id, milePoints: user.milePoints, userType: user.userType }
}
