import Offer from "../models/offers.js";

export const offers = async (offerData = {}) => {
    const offer = new Offer(offerData);
    return offer.save();
};


export const getOffers = async () => {
    const offers = Offer.find();
    return offers;
}