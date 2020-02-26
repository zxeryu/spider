//get singer list by classifyId and alphabet
const { findIdFromUrl } = require("../../../util/string");

const { load } = require("../../../util/parse");
const { map } = require("lodash");

module.exports = {
  name: "singer-list",
  method: "get",
  url: (classifyId, alphabet) => `geshou/${classifyId}-${alphabet}-all.htm`,
  analysis: html => {
    const $ = load(html);
    const singerList = $(".singerList");
    const as = $(singerList)
      .find("a")
      .toArray();
    const list = map(as, ({ attribs, children }) => {
      const href = attribs.href;
      const singerId = findIdFromUrl(href);
      return { singerId };
    });
    return list;
  }
};
