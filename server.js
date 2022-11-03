import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
const app = express();
const PORT = process.env.PORT || 5000;
//core setting
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
  })
);

//Routes

// Error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong !";
  return res.status(status).json({
    sucess: false,
    status,
    message,
  });
});
app.listen(PORT, () => console.log(`server running on port ${PORT}`));