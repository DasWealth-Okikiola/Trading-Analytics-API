const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const setupSwagger = require('./src/docs/swagger');

require("dotenv").config();

const connectDB = require("./src/config/database");
const authRoutes = require('./src/routes/authRoutes');
const tradeRoutes = require("./src/routes/tradeRoutes");
const analyticsRoutes = require("./src/routes/analyticsRoutes");
const errorHandler = require('./src/middleware/errorMiddleware');

const app = express();

// Security middleware
app.use(helmet());

// Allow cross-origin requests
app.use(cors());

// Logging
app.use(morgan("dev"));

// Body parser
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use("/api/trades", tradeRoutes);
app.use("/api/analytics", analyticsRoutes);


// Health check route
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Trading Analytics API is running",
  });
});

// DOCS
setupSwagger(app);

// Error Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(PORT, console.log(`Server running on port ${PORT} ✅ ✅ ✅`))
  }
  catch (error) {
    console.log(error)
  }
}

start()