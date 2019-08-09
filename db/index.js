const ENV = process.env.NODE_ENV || "development";
const testData = require("./data/test-data");
const devData = require("./data/development-data");

const data = {
  production: devData,
  development: devData,
  test: testData
};

module.exports = data[ENV];
