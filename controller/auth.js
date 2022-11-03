import { User } from "../models";
import bcrypt from "bcrypt";
import { CustomError } from "../utils";

export const AuthController = {
  async signUp(req, res, next) {
    res.json(req.body);
  },
  async signIn(req, res, next) {},
  async logout(req, res, next) {
    res.send("logout");
  },
};
