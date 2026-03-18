const mongoose = require("mongoose");
const Trade = require("../models/trade");
const calculatePL = require("../utils/calculatePL");
const CustomError = require("../utils/customError");

// CREATE TRADE
exports.createTrade = async (req, res, next) => {
  try {
    let {
      market,
      pair,
      direction,
      entryPrice,
      exitPrice,
      lotSize,
      strategy,
      notes,
    } = req.body;

    if (!market || !pair || !direction || !entryPrice || !exitPrice || !lotSize) {
      throw new CustomError("Please provide all required trade fields", 400);
    }

    // Normalize
    market = market.trim().toLowerCase();
    strategy = strategy?.trim().toLowerCase();

    const { profitLoss, outcome } = calculatePL({
      direction,
      entryPrice,
      exitPrice,
      lotSize,
    });

    const trade = await Trade.create({
      user: req.user.id,
      market,
      pair,
      direction,
      entryPrice,
      exitPrice,
      lotSize,
      strategy,
      notes,
      profitLoss,
      outcome,
    });

    res.status(201).json(trade);
  } catch (error) {
    next(error);
  }
};

// GET ALL TRADES
exports.getTrades = async (req, res, next) => {
  try {
    let { strategy, market, page = 1, limit = 10 } = req.query;

    const queryObject = { user: req.user.id };

    if (strategy) queryObject.strategy = strategy.trim().toLowerCase();
    if (market) queryObject.market = market.trim().toLowerCase();

    const skip = (Number(page) - 1) * Number(limit);

    const trades = await Trade.find(queryObject)
      .sort("-createdAt")
      .skip(skip)
      .limit(Number(limit));

    const totalTrades = await Trade.countDocuments(queryObject);

    res.json({
      total: totalTrades,
      page: Number(page),
      count: trades.length,
      trades,
    });
  } catch (error) {
    next(error);
  }
};

// GET SINGLE TRADE
exports.getSingleTrade = async (req, res, next) => {
  try {
    const { id: tradeId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(tradeId)) {
      throw new CustomError("Invalid trade ID", 400);
    }

    const trade = await Trade.findOne({
      _id: tradeId,
      user: req.user.id,
    });

    if (!trade) {
      throw new CustomError("Trade not found", 404);
    }

    res.json(trade);
  } catch (error) {
    next(error);
  }
};

// UPDATE TRADE
exports.updateSingleTrade = async (req, res, next) => {
  try {
    const { id: tradeId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(tradeId)) {
      throw new CustomError("Invalid trade ID", 400);
    }

    let trade = await Trade.findOne({
      _id: tradeId,
      user: req.user.id,
    });

    if (!trade) {
      throw new CustomError("Trade not found", 404);
    }

    let updatedData = { ...req.body };

    // Normalize
    if (updatedData.strategy) {
      updatedData.strategy = updatedData.strategy.trim().toLowerCase();
    }
    if (updatedData.market) {
      updatedData.market = updatedData.market.trim().toLowerCase();
    }

    const direction = updatedData.direction || trade.direction;
    const entryPrice = updatedData.entryPrice || trade.entryPrice;
    const exitPrice = updatedData.exitPrice || trade.exitPrice;
    const lotSize = updatedData.lotSize || trade.lotSize;

    if (
      updatedData.entryPrice ||
      updatedData.exitPrice ||
      updatedData.direction ||
      updatedData.lotSize
    ) {
      const { profitLoss, outcome } = calculatePL({
        direction,
        entryPrice,
        exitPrice,
        lotSize,
      });

      updatedData.profitLoss = profitLoss;
      updatedData.outcome = outcome;
    }

    trade = await Trade.findOneAndUpdate(
      { _id: tradeId, user: req.user.id },
      updatedData,
      { new: true, runValidators: true }
    );

    res.json(trade);
  } catch (error) {
    next(error);
  }
};

// DELETE TRADE
exports.deleteSingleTrade = async (req, res, next) => {
  try {
    const { id: tradeId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(tradeId)) {
      throw new CustomError("Invalid trade ID", 400);
    }

    const trade = await Trade.findOneAndDelete({
      _id: tradeId,
      user: req.user.id,
    });

    if (!trade) {
      throw new CustomError("Trade not found", 404);
    }

    res.json({
      success: true,
      message: "Trade deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};