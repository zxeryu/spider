const cheerio = require("cheerio");

function load(content, options, isDocument) {
  return cheerio.load(content, options, isDocument);
}

module.exports = {
  load
};
