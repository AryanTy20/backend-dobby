import dotenv from "dotenv";
dotenv.config();

export const { DB_URL, TOKEN_SECRET } = process.env;
