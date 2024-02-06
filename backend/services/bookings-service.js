import Booking from "../models/booking.js";

export const createBooking = (details) => {
    const booking = new Booking(details);
    return booking.save();
}

export const fetchAllBookings = async () => {
    const bookings = await Booking.find({}).exec();
    return bookings;
}

export const fetchBookingById = async (id) => {
    const booking = await Booking.findOne({ _id: id }).exec();
    return booking;
}