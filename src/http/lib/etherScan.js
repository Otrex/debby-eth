const axios = require("axios").default;
const { etherScan } = require("../../config");
const ETHER_UNIT = Math.pow(10, 18);

class EtherScan {
  defaultOptions = {};

  constructor(defaultOptions = {}) {
    this.defaultOptions = defaultOptions;
    this.request = axios.create({
      baseURL: etherScan.baseUrl,
    });
  }

  /**
   * @desc Options parameter contains
   * @param {String} module
   * @param {String} address
   * ...
   */
  async makeRequest(options = {}) {
    const query = new URLSearchParams({ ...this.defaultOptions, ...options });
    const response = await this.request.get(`/?${query.toString()}`);
    return response.data;
  }

  async getNormalTrxByAddr(
    address,
    startblock = 0,
    endblock = 99999999,
    page = 1,
    offset = 20,
    sort = "asc"
  ) {
    return this.makeRequest({
      sort,
      page,
      offset,
      address,
      endblock,
      startblock,
      action: "txlist",
    });
  }

  async getInternalTrxByAddr(
    address,
    startblock = 0,
    endblock = 99999999,
    page = 1,
    offset = 20,
    sort = "asc"
  ) {
    return this.makeRequest({
      sort,
      page,
      offset,
      address,
      endblock,
      startblock,
      action: "txlistinternal",
    });
  }

  async getBalanceFromAddr(address, tag = "latest") {
    return this.makeRequest({
      tag,
      address,
      action: "balance",
    });
  }

  async getBalanceHistory(
    address,
    startblock = 0,
    endblock = 99999999,
    page = 1,
    offset = 100,
    sort = "asc"
  ) {
    const [internalTrx, normalTrx] = await Promise.all([
      this.getInternalTrxByAddr(
        address,
        startblock,
        endblock,
        page,
        offset,
        sort
      ),
      this.getNormalTrxByAddr(
        address,
        startblock,
        endblock,
        page,
        offset,
        sort
      ),
    ]);

    let result = [...internalTrx.result, ...normalTrx.result];
    result = result.sort((a, b) => +a.timeStamp - +b.timeStamp);

    // This is the store for the balance at that transaction block
    let currentBalance = 0;
    return result.map((e) => {
      // e :is the response from the API
      const moneyIn = e.to.toLowerCase() === address.toLowerCase();

      // converts the value to ethereum
      const value = e.value / ETHER_UNIT;

      // This was done because internal transactions do not come with gasPrice
      // so calculations to get price is done directly (coverts the value to ethereum)
      const gas =
        "gasPrice" in e
          ? (e.gasUsed * e.gasPrice) / ETHER_UNIT
          : e.gasUsed / ETHER_UNIT;

      // this updates the currentbalance for the given transaction data
      currentBalance = moneyIn
        ? currentBalance + value
        : currentBalance - (value + gas);

      return {
        to: e.to,
        from: e.from,
        balance: currentBalance,
        timeStamp: new Date(+e.timeStamp * 1000),
      };
    });
  }
}

module.exports = new EtherScan({
  module: "account",
  apiKey: etherScan.apiKey,
});
