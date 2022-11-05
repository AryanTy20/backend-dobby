import { User } from "../models";
import { CustomError } from "../utils";

export const UserController = {
  async upload(req, res, next) {
    if (!req.body) return next(CustomError(403, "{name,image}  is required"));
    try {
      const user = await User.findById(req.user.id);
      const exist = user.images.some((item) => item.name === req.body.name);
      if (exist) return next(CustomError(403, "Name already exist"));
      await User.findByIdAndUpdate(req.user.id, {
        $push: { images: req.body },
      });
      res.status(200).json("Image uploaded");
    } catch (err) {
      next(err);
    }
  },
  async search(req, res, next) {
    const query = req.query.name;
    try {
      const user = await User.findById(req.user.id);
      const data = user.images
        .map((item) => {
          if (new RegExp(query, "i").test(item.name)) {
            return item;
          }
        })
        .filter((el) => el);
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  },
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
