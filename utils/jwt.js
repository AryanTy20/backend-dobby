import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config";

class JWT {
  static sign(payload, expires = "1d") {
    return jwt.sign(payload, TOKEN_SECRET, { expiresIn: expires });
  }
  static signVerify(payload) {
    return jwt.verify(payload, TOKEN_SECRET);
  }
}

export default JWT;
