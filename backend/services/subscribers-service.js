import Subscriber from "../models/subscribers.js";

export const createSubscriber = (params) => {
    const subs = new Subscriber(params);
    return subs.save();
}

export const getSubscribers = async () => {
    const subscribers = await Subscriber.find({}).exec();
    return subscribers;
}