import registerUser from "../models/user.js";

export const getUser = async () => {
    const user = await registerUser.find({}).limit(1);
    return user.pop();
}
