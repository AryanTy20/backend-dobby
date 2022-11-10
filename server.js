import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
const PORT = process.env.PORT || 5000;
//core setting
const allowedUrl = ["https://dobbyads.netlify.app","http://localhost:3000"];
app.use(express.json({ limit: "5mb", extended: true }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: allowedUrl,
    credentials: true,
  })
);
//DB Connection
import { dbConnect } from "./dbConnect";
dbConnect();

//Routes
import { AuthRoutes, UserRoutes } from "./routes";
app.get("/",(req,res)=>{
  res.json("server running api")
});

app.use("/api/auth", AuthRoutes);
app.use("/api/user", UserRoutes);

// Error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong !";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
