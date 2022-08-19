const { Schema, model } = require("mongoose");

/**
 * - id
 * - address
 * - balance
 * - tokenType
 */

const walletSchema = new Schema(
  {
    address: String,
    balance: Number,
    tokenType: {
      default: "ETH",
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = model("Wallet", walletSchema);
