import mongoose from "mongoose";

const imgSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const userScheme = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  images: {
    type: [{ imgSchema }],
  },
});

export default mongoose.model("User", userScheme);
