const config = require("./config");
const SingerClassify = require("./item/SingerClassify");
const SingerAlphabet = require("./item/SingerAlphabet");

module.exports = {
  config,
  modules: { SingerClassify, SingerAlphabet }
};
