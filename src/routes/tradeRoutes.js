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