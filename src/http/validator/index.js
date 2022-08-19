const WAValidator = require("multicoin-address-validator");


module.exports = {
  getTransactionHistorySchema: {
    $$strict: true,
    period: {
      type: "enum",
      values: [
        "30d",
        "20d",
        "10d"
      ],
      optional: true,
    },
    address: {
      type: "string",
      custom: (v, errors) => {
        const valid = WAValidator.validate(v, 'ETH');
        if(!valid) errors.push({ type: 'ethAddress' });
        return v
      },
    },
  },
  getBalanceSchema: {
    $$strict: true,
    address: {
      type: "string",
      custom: (v, errors) => {
        const valid = WAValidator.validate(v, 'ETH');
        if(!valid) errors.push({ type: 'ethAddress' });
        return v
      },
    },
  },
};
