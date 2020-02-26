//get singer detail
const { load } = require("../../../util/parse");
const { imgUrlWithNoParams } = require("../../../util/string");

module.exports = {
  name: "ginger-detail",
  method: "get",
  url: singerId => `geshou/${singerId}/info.htm`,
  analysis: html => {
    const $ = load(html);
    const img = $(".t-i")
      .find("img")
      .toArray()[0];
    let image = img.attribs.src;
    image = imgUrlWithNoParams(image);

    const nameH = $(".t-t")
      .find("h1")
      .toArray()[0];
    const name = nameH.children[0].data;

    // const descDiv = $(".grzl-tdel").toArray()[0];
    // const desc = descDiv.children[0].data;

    const birthDiv = $(".birth").toArray()[0];
    const birth = birthDiv.children[0].data;
    return { image, name,   birth };
  }
};
