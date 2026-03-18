const mongoose = require("mongoose");

const tradeSchema = new mongoose.Schema(
{
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  market: {
    type: String,
    trim: true,
    enum: ["forex", "crypto", "stocks", "indices", "commodities"],
    required: true
  },

  pair: {
    type: String,
    required: true
  },

  direction: {
    type: String,
    enum: ["buy", "sell"],
    required: true
  },

  entryPrice: {
    type: Number,
    required: true
  },

  exitPrice: {
    type: Number,
    required: true
  },

  lotSize: {
    type: Number,
    required: true
  },

  strategy: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },

  notes: {
    type: String,
    default: ""
  },

  profitLoss: {
    type: Number
  },

  outcome: {
    type: String,
    enum: ["win", "loss"]
  }

},
{
  timestamps: true
});

module.exports = mongoose.model("Trade", tradeSchema);