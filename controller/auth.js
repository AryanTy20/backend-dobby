import { User } from "../models";
import bcrypt from "bcrypt";
import { CustomError, JWT } from "../utils";

export const AuthController = {
  async signUp(req, res, next) {
    const { username, password, repeatPassword } = req.body;
    if (!username || !password || !repeatPassword) {
      return next(
        CustomError(403, "{username,password,repeatPassword} is required")
      );
    }
    if (password !== repeatPassword) {
      next(CustomError(403, "Password not matched"));
    }

    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      const newUser = new User({
        username,
        password: hash,
      });
      await newUser.save();
      const token = JWT.sign({ id: newUser._id });
      res
        .cookie("token", token, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
        })
        .json("User created");
    } catch (err) {
      next(err);
    }
  },
  async signIn(req, res, next) {
    const { username, password } = req.body;
    if (!username || !password) {
      return next(CustomError(403, "{username,password} is required"));
    }
    try {
      const user = await User.findOne({ username });
      if (!user) return next(CustomError(400, "Wrong credentials"));
      const correctPassword = await bcrypt.compare(password, user.password);
      if (!correctPassword) return next(CustomError(400, "Wrong credentials"));
      const token = JWT.sign({ id: user._id });
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
    } catch (err) {
      next(err);
    }
  },
  async logout(req, res, next) {
    if (!req.cookie) return next(CustomError(403, "Unauthorized"));
    res.clearCookie("token", {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
  },
};
