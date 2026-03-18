const mongoose = require("mongoose");
const Trade = require("../models/trade");

// SUMMARY
exports.getSummary = async (req, res, next) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const stats = await Trade.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: null,
          totalTrades: { $sum: 1 },
          totalProfit: { $sum: "$profitLoss" },
          wins: {
            $sum: { $cond: [{ $eq: ["$outcome", "win"] }, 1, 0] },
          },
          losses: {
            $sum: { $cond: [{ $eq: ["$outcome", "loss"] }, 1, 0] },
          },
        },
      },
    ]);

    const result = stats[0] || {
      totalTrades: 0,
      totalProfit: 0,
      wins: 0,
      losses: 0,
    };

    const winRate = result.totalTrades
      ? (result.wins / result.totalTrades) * 100
      : 0;

    const lossRate = result.totalTrades
      ? (result.losses / result.totalTrades) * 100
      : 0;

    res.json({
      ...result,
      winRate: Number(winRate.toFixed(2)),
      lossRate: Number(lossRate.toFixed(2)),
    });
  } catch (error) {
    next(error);
  }
};

// STRATEGY
exports.getStrategyStats = async (req, res, next) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const stats = await Trade.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: "$strategy",
          tradeCount: { $sum: 1 },
          totalProfit: { $sum: "$profitLoss" },
          wins: {
            $sum: { $cond: [{ $eq: ["$outcome", "win"] }, 1, 0] },
          },
        },
      },
      {
        $project: {
          strategy: "$_id",
          _id: 0,
          tradeCount: 1,
          totalProfit: 1,
          winRate: {
            $round: [
              {
                $cond: [
                  { $eq: ["$tradeCount", 0] },
                  0,
                  {
                    $multiply: [
                      { $divide: ["$wins", "$tradeCount"] },
                      100,
                    ],
                  },
                ],
              },
              2,
            ],
          },
        },
      },
      { $sort: { totalProfit: -1 } },
    ]);

    res.json(stats);
  } catch (error) {
    next(error);
  }
};

// MONTHLY
exports.getMonthlyPerformance = async (req, res, next) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const stats = await Trade.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          totalProfit: { $sum: "$profitLoss" },
          tradeCount: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          month: {
            $concat: [
              { $toString: "$_id.year" },
              "-",
              {
                $cond: [
                  { $lt: ["$_id.month", 10] },
                  { $concat: ["0", { $toString: "$_id.month" }] },
                  { $toString: "$_id.month" },
                ],
              },
            ],
          },
          totalProfit: 1,
          tradeCount: 1,
        },
      },
      { $sort: { month: 1 } },
    ]);

    res.json(stats);
  } catch (error) {
    next(error);
  }
};