const express = require("express");
const router = express.Router();

const { getSummary, getStrategyStats, getMonthlyPerformance } = require("../controllers/analyticsController");
const authMiddleware = require("../middleware/authMiddleware");

/**
 * @swagger
 * /api/analytics/summary:
 *   get:
 *     summary: Get overall trading performance summary
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns total trades, win rate, and profit
 */

// @route   GET /api/analytics/summary
router.get("/summary", authMiddleware, getSummary);


/**
 * @swagger
 * /api/analytics/strategies:
 *   get:
 *     summary: Get performance breakdown by strategy
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Strategy statistics
 */

// @route   GET /api/analytics/strategies
router.get("/strategies", authMiddleware, getStrategyStats);

/**
 * @swagger
 * /api/analytics/monthly:
 *   get:
 *     summary: Get monthly trading performance
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Monthly performance data
 */

// @route  GET /api/analytics/monthly
router.get("/monthly", authMiddleware, getMonthlyPerformance);

module.exports = router;