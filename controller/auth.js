import { User } from "../models";
import bcrypt from "bcrypt";
import { CustomError } from "../utils";

export const AuthController = {
  async signUp(req, res, next) {
    const { name, password, repeatPassword } = req.body;
    if (!name || !password || !repeatPassword) {
      return next(
        CustomError(403, "{name,password,repeatPassword} is required")
      );
    }
    if (password !== repeatPassword) {
      next(CustomError(403, "Password not matched"));
    }

    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      const newUser = new User({
        name,
        password: hash,
      });
      await newUser.save();
      return res.status(204).json("User created");
    } catch (err) {
      next(err);
    }
  },
  async signIn(req, res, next) {},
  async logout(req, res, next) {
    res.send("logout");
  },
};
