const models = require('../../database/models');
const Validator = require("fastest-validator");
const {
  getBalanceSchema, 
  getTransactionHistorySchema
} = require('../validator');

const EtherScan = require('../lib/etherScan');

const v = new Validator({
    useNewCustomCheckerFunction: true,
    messages: {
      ethAddress: "The address entered is not an eth address"
    }
});

class Controller {
  static async getWalletBalance(req, res, next) {
    try {
      // Validate Request
      const { address } = req.query;

      const check = v.compile(getBalanceSchema)
      const isValid = check(req.query);

      if (Array.isArray(isValid)) {
        return res.status(422).json(isValid)
      }

      // Fetch wallet based on the address
      const data = await EtherScan.getBalanceFromAddr(address);

      // Return wallet balance
      return res.status(200).json({
        success: true,
        data: {
          balance: data.result / Math.pow(10, 18),
        },
      })

    } catch (error) {
      next(error)
    }
  }

  static async getTransactionHistory(req, res, next) {
    try {
      const ONE_HOUR_IN_TIMESTAMP = 3600;
      const { address, period } = req.query;
      const check = v.compile(getTransactionHistorySchema)
      const isValid = check(req.query);

      if (Array.isArray(isValid)) {
        return res.status(422).json(isValid)
      }
      
      const data = await EtherScan.getBalanceHistory(address);

      const response = [];

      let prevTimestamp = data[0].timeStamp;

      data.forEach((e) => {
        // if (Math.abs(e.timeStamp - prevTimestamp) < ONE_HOUR_IN_TIMESTAMP) {
        //   return;
        // } else {
          response.push(e)
        //   prevTimestamp = e.timeStamp
        //   return;
        // }
      });

      return res.status(200).json({
        success: true,
        data: response,
      });

    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;