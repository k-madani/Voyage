import mongoose from "mongoose";

const Schema = mongoose.Schema;

const subscribersSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    type: {
        type: String,
        required: true,
    }
  },
  {
    versionKey: false,
  }
);

const  Subscriber = mongoose.model("Subscribers", subscribersSchema);

export default Subscriber;
