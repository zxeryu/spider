//get song list by singerId
const { load } = require("../../../util/parse");
const { map } = require("lodash");
const { findIdFromUrl } = require("../../../util/string");

module.exports = {
  name: "song-list",
  method: "get",
  url: singerId => `geshou/${singerId}.htm`,
  analysis: html => {
    const $ = load(html);
    const as = $(".musicList")
      .find(".clearfix .t-i")
      .toArray();
    const list = map(as, ({ attribs }) => {
      const songId = findIdFromUrl(attribs.href);
      return { songId };
    });
    return list;
  }
};
