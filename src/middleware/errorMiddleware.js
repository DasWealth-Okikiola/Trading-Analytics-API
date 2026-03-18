const errorHandler = (err, req, res, next) => {
  console.error(err);

  let statusCode = err.statusCode || 500;
  let message = err.message || "Something went wrong";

  // Mongoose Bad ObjectId
  if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid ID format";
  }

  // Duplicate Email
  if (err.code === 11000) {
    statusCode = 400;
    message = "Email already exists";
  }

  // Validation Errors
  if (err.name === "ValidationError") {
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
    statusCode = 400;
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = errorHandler;