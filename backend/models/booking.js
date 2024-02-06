import mongoose from "mongoose";

const Schema = mongoose.Schema;

const bookingSchema = new Schema(
  { 
    source : {
      type: String,
      required: true
    },
    destination : {
      type: String,
      required: true
    },
    departure: {
      type: String,
      required: true
    },
    arrival: {
      type: String,
      required: true
    },
    totalDuration:{
      type: String,
      required: true
    },
    userDetails:{
      type: Object,
      required: true
    },
    fare:{
      type: Object,
      required: true
    },
    overlays:{
      type: Array,
      require: false
    },
    payment:{
      type: String,
      required: true
    }
  },
  {
    versionKey: false,
  }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
