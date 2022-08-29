const app = require("../../src/app");
const { assert } = require("chai");
const supertest = require("supertest");

const server = supertest(app);
const address = "0xbb24de7225b20424C4ba555b20D29F36722808BE";

describe("ETH wallet test", () => {
  it("should get the wallet balance based on addresses", async () => {
    const res = await server.get(`/wallets?address=${address}`);

    console.log(res.body, res.error);
    assert.equal(res.status, 200);
    assert.exists(res.body.data);
  });

  it("should get the transactions balance based on addresses", async () => {
    const res = await server.get(`/transactions?address=${address}&period=30d`);

    console.log(res.body, res.error);
    assert.equal(res.status, 200);
    assert.exists(res.body.data);
  });
});
