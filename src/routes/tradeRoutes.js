const express = require("express");
const router = express.Router();

const { createTrade,
    getTrades,
    getSingleTrade,
    updateSingleTrade,
    deleteSingleTrade
} = require("../controllers/tradeController");

const authMiddleware = require("../middleware/authMiddleware");

/**
 * @swagger
 * /api/trades:
 *   get:
 *     summary: Get all trades for logged-in user
 *     tags: [Trades]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: strategy
 *         schema:
 *           type: string
 *       - in: query
 *         name: market
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: List of trades
 */


/**
 * @swagger
 * /api/trades/{id}:
 *   get:
 *     summary: Get a single trade
 *     tags: [Trades]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Trade found
 *       404:
 *         description: Trade not found
 */

/**
 * @swagger
 * /api/trades/{id}:
 *   patch:
 *     summary: Update a trade
 *     tags: [Trades]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Trade updated
 */

/**
 * @swagger
 * /api/trades/{id}:
 *   delete:
 *     summary: Delete a trade
 *     tags: [Trades]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Trade deleted
 */

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
 *         description: Strategy stats
 */

/**
 * @swagger
 * /api/trades:
 *   post:
 *     summary: Create a new trade
 *     description: Log a new trade with automatic profit/loss calculation based on trade details
 *     tags: [Trades]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - market
 *               - pair
 *               - direction
 *               - entryPrice
 *               - exitPrice
 *               - lotSize
 *             properties:
 *               market:
 *                 type: string
 *                 example: crypto
 *               pair:
 *                 type: string
 *                 example: BTC/USDT
 *               direction:
 *                 type: string
 *                 example: buy
 *               entryPrice:
 *                 type: number
 *                 example: 40000
 *               exitPrice:
 *                 type: number
 *                 example: 42000
 *               lotSize:
 *                 type: number
 *                 example: 1
 *               strategy:
 *                 type: string
 *                 example: breakout
 *               notes:
 *                 type: string
 *                 example: Clean breakout on resistance
 *     responses:
 *       201:
 *         description: Trade created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 user:
 *                   type: string
 *                 market:
 *                   type: string
 *                 pair:
 *                   type: string
 *                 direction:
 *                   type: string
 *                 entryPrice:
 *                   type: number
 *                 exitPrice:
 *                   type: number
 *                 lotSize:
 *                   type: number
 *                 strategy:
 *                   type: string
 *                 notes:
 *                   type: string
 *                 profitLoss:
 *                   type: number
 *                 outcome:
 *                   type: string
 *                   example: win
 *                 createdAt:
 *                   type: string
 *                 updatedAt:
 *                   type: string
 *       400:
 *         description: Missing or invalid input data
 *       401:
 *         description: Unauthorized (No token or invalid token)
 */

// @route POST /api/trades
router.post("/", authMiddleware, createTrade);

// @route GET /api/trades
router.get("/", authMiddleware, getTrades);

// @route GET /api/trades/id
router.get("/:id", authMiddleware, getSingleTrade);

// @route PATCH /api/trades/id
router.patch("/:id", authMiddleware, updateSingleTrade);

// @route DELETE /api/trades/id
router.delete("/:id", authMiddleware, deleteSingleTrade);

module.exports = router;