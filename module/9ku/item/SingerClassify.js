//获取区域分类列表
const { load } = require("../../../util/parse");
const { map } = require("lodash");

const testData = `
<ul class="singerLei">
<li><a href="/geshou/dalunan-all-all.htm"><img src="/static/images/singer/neidi1.jpg" /><span>内地男歌手</span></a></li>
<li><a href="/geshou/dalunv-all-all.htm"><img src="/static/images/singer/neidi2.jpg" /><span>内地女歌手</span></a></li>
<li><a href="/geshou/daluzuhe-all-all.htm"><img src="/static/images/singer/neidi3.jpg" /><span>内地组合</span></a></li>
<li><a href="/geshou/gangtainan-all-all.htm"><img src="/static/images/singer/gangtai1.jpg" /><span>港台男歌手</span></a></li>
<li><a href="/geshou/gangtainv-all-all.htm"><img src="/static/images/singer/gangtai2.jpg" /><span>港台女歌手</span></a></li>
<li><a href="/geshou/gangtaizuhe-all-all.htm"><img src="/static/images/singer/gangtai3.jpg" /><span>港台组合</span></a></li>
<li><a href="/geshou/oumeinan-all-all.htm"><img src="/static/images/singer/4.jpg" /><span>欧美男歌手</span></a></li>
<li><a href="/geshou/oumeinv-all-all.htm"><img src="/static/images/singer/5.jpg" /><span>欧美女歌手</span></a></li>
<li><a href="/geshou/oumeizuhe-all-all.htm"><img src="/static/images/singer/6.jpg" /><span>欧美组合</span></a></li>
<li><a href="/geshou/rhnan-all-all.htm"><img src="/static/images/singer/7.jpg" /><span>日韩男歌手</span></a></li>
<li><a href="/geshou/rhnv-all-all.htm"><img src="/static/images/singer/8.jpg" /><span>日韩女歌手</span></a></li>
<li><a href="/geshou/rhzuhe-all-all.htm"><img src="/static/images/singer/9.jpg"/><span>日韩组合</span></a></li>
</ul>
`;

module.exports = {
  name: "singer",
  method: "get",
  url: () => "music/t_singer.htm",
  analysis: html => {
    const $ = load(testData);
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
      return { href, image, name };
    });
    return list;
  }
};
