import mongoose from "mongoose";

const userScheme = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  images: {
    type: [
      {
        name: {
          type: String,
        },
        image: {
          type: String,
        },
      },
    ],
  },
});

export default mongoose.model("User", userScheme);
