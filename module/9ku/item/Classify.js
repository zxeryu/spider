//get area classify list
const { load } = require("../../../util/parse");
const { map } = require("lodash");

module.exports = {
  name: "classify",
  method: "get",
  url: () => "music/t_singer.htm",
  analysis: html => {
    const $ = load(html);
    //取第一个分类
    const areaClassify = $(".singerLei").toArray()[0];
    const lis = $(areaClassify)
      .find("li")
      .toArray();
    const as = map(lis, item => item.children[0]);
    const list = map(as, ({ attribs, children }) => {
      const href = attribs.href;
      const image = children[0].attribs.src;
      const name = children[1].children[0].data;
      const classifyId = href.substring(
        href.lastIndexOf("/") + 1,
        href.indexOf("-")
      );
      return { href, image, name, classifyId };
    });
    return list;
  }
};
