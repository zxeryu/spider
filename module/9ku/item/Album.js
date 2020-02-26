//get album by singerId
const { load } = require("../../../util/parse");
const { map } = require("lodash");
const { findIdFromUrl, imgUrlWithNoParams } = require("../../../util/string");

module.exports = {
  name: "album",
  method: "get",
  url: singerId => `zj/${singerId}.htm`,
  analysis: html => {
    const $ = load(html);
    const albumList = $(".album3")
      .find("a")
      .toArray();
    const list = map(albumList, ({ attribs, children }) => {
      const href = attribs.href;
      const albumId = findIdFromUrl(href);

      const img = children[0].children[0].attribs.src;
      const image = imgUrlWithNoParams(img);

      const albumName = children[1].children[0].data;
      const pubTime = children[2].children[0].data;

      return { albumId, image, albumName, pubTime };
    });
    return list;
  }
};
