const app = require("./app");
const config = require("./config");
const createMongodbConnection = require("./database");

// createMongodbConnection()
//   .then(() => {
app.listen(config.app.port, () => {
  console.log(`App has started on port: ${config.app.port}`);
});
// })
// .catch((err) => {
//   console.log(err);
// });
