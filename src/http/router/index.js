const router = require("express").Router();
const Controller = require("../controller");

router.get("/wallets", Controller.getWalletBalance);
router.get("/transactions", Controller.getTransactionHistory);

module.exports = router;
