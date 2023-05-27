const ErrorReponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  if (err.name === "CastError") {
    const message = `Ressource not found ${err.value}`;
    error = new ErrorReponse(message, 404);
  }
  //Mongoose duplicate value
  if (err.code === 11000) {
    const message = "Duplicate field value entered";
    error = new ErrorReponse(message, 400);
  }
  //Mongoose validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => "" + val.message);
    error = new ErrorReponse(message, 400);
  }
  res.status(error.codeStatus || 500).json({
    succes: false,
    error: error.message || "server error",
  });
};
module.exports = errorHandler;
