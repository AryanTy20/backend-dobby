import mongoose from "mongoose";
import { DB_URL } from "./config";

export const dbConnect = () => {
  mongoose
    .connect(DB_URL)
    .then(() => console.log("Db Connected"))
    .catch((err) => console.log(err));
};
