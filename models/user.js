import mongoose from "mongoose";

const userScheme = new mongoose.Schema({
  username: {
    type: string,
    required: true,
    unique: true,
  },
  password: {
    type: string,
    required: true,
  },
  images: {
    type: [
      {
        name: {
          type: string,
        },
        image: {
          type: string,
        },
      },
    ],
  },
});

export default mongoose.model("User", userScheme);
