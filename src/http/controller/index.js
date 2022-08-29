const {
  $validator,
  getBalanceSchema,
  getTransactionHistorySchema,
} = require("../validator");

const {
  groupBy,
  subtractDateByDays,
} = require('../lib/utils');

const EtherScan = require("../lib/etherScan");
class Controller {
  static async getWalletBalance(req, res, next) {
    try {
      // Validate Request
      const { address } = req.query;

      const check = $validator.compile(getBalanceSchema);
      const isValid = check(req.query);

      if (Array.isArray(isValid)) {
        return res.status(422).json(isValid);
      }

      // Fetch wallet based on the address
      const data = await EtherScan.getBalanceFromAddr(address);

      // Return wallet balance
      return res.status(200).json({
        success: true,
        data: {
          balance: data.result / Math.pow(10, 18),
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async getTransactionHistory(req, res, next) {
    try {
      const ONE_HOUR_IN_TIMESTAMP = 3600;
      const { address, period } = req.query;

      // REQUEST VALIDATION
      const check = $validator.compile(getTransactionHistorySchema);
      const isValid = check(req.query);
      if (Array.isArray(isValid)) {
        return res.status(422).json(isValid);
      }

      const [periodNum] = period.split("d");

      const data = await EtherScan.getBalanceHistory(address);

      let records = groupBy(data, (e) => e.timeStamp.setMinutes(0, 0));

      records = Object.entries(records)
        .map(([key, value]) => ({
          time: new Date(+key),
          balance: value
            .reduce((prev, curr) => prev + curr.balance, 0),
        }))
        .filter((el) => el.time > subtractDateByDays(+periodNum));

      return res.status(200).json({
        success: true,
        data: records,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
