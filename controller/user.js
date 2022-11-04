import { User } from "../models";
import { CustomError } from "../utils";

export const UserController = {
  async upload(req, res, next) {
    if (!req.body) return next(CustomError(403, "{name,image}  is required"));

    try {
      await User.findByIdAndUpdate(req.user.id, {
        $push: { images: req.body },
      });
      res.status(200).json("Image uploaded");
    } catch (err) {
      next(err);
    }
  },
  async search(req, res, next) {},
  async getImg(req, res, next) {
    try {
      const user = await User.findOne({ _id: req.user.id });
      const { images } = user;
      res.status(200).json(images);
    } catch (err) {
      next(err);
    }
  },
};
