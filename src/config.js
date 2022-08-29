require("dotenv").config();

module.exports = {
  db: {
    uri: process.env.DB_URI,
    database:
      process.env.APP_ENV === "test" ? process.env.TEST_DB : process.env.DB,
  },
  app: {
    port: +(process.env.PORT || 3000),
  },
  etherScan: {
    apiKey: process.env.ETHER_SCAN_API_KEY,
    baseUrl: process.env.ETHER_SCAN_BASE_URL,
  },
};
