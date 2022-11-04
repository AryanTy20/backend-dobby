import { JWT, CustomError } from "../utils";

export const verifyToken = (req, res, next) => {
  if (!req.cookies) return next(CustomError(403, "Unauthorized"));
  const id = JWT.signVerify(req.cookies.token);
  if (!id) {
    res
      .clearCookie("token", {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json("Invalid token");
  }
  req.user = id;
  next();
};
