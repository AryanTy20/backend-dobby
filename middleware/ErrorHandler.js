import { CustomError } from "../service/CustomError";
const DEBUG_MODE = true;
export const errorHandler = (err, req, res, next) => {
  let statusCode = 500;
  let data = {
    message: err ? err : "Internal server error",
    ...(DEBUG_MODE == "true" && { originalError: err.message }),
  };

  if (err instanceof CustomError) {
    statusCode: err.status;
    data = {
      message: err.message,
    };
  }

  return res.status(statusCode).json(data);
};
