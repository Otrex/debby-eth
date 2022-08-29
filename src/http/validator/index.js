const WAValidator = require("multicoin-address-validator");
const Validator = require("fastest-validator");

module.exports = {
  $validator : new Validator({
    useNewCustomCheckerFunction: true,
    messages: {
      ethAddress: "The address entered is not an eth address",
    },
  }),
  getTransactionHistorySchema: {
    $$strict: true,
    period: {
      type: "enum",
      values: ["30d", "14d", "7d", "1d"],
    },
    address: {
      type: "string",
      custom: (v, errors) => {
        const valid = WAValidator.validate(v, "ETH");
        if (!valid) errors.push({ type: "ethAddress" });
        return v;
      },
    },
  },
  getBalanceSchema: {
    $$strict: true,
    address: {
      type: "string",
      custom: (v, errors) => {
        const valid = WAValidator.validate(v, "ETH");
        if (!valid) errors.push({ type: "ethAddress" });
        return v;
      },
    },
  },
};
