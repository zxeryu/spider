//获取某个字母下的所有歌手ids
const { load } = require("../../../util/parse");
const { map } = require("lodash");

const testData = `
<ul class="singerList">
<li><a href="/geshou/57648.htm"><div class="t-i"><img src="http://aliyunimg.9ku.com/pic/gstx/6/57648.jpg?x-oss-process=image/resize,m_fill,w_106,h_80,limit_0/auto-orient,0" onerror="$(this).attr('src','http://www.9ku.com/images/no-small-avatar.png');" /></div><div class="t-t"><div class="t-singer">二炮手插曲</div><p class="t-songNum">1首</p></div><div class="t-z">播放</div></a></li>
<li><a href="/geshou/10243.htm"><div class="t-i"><img src="http://aliyunimg.9ku.com/pic/gstx/2/10243.jpg?x-oss-process=image/resize,m_fill,w_106,h_80,limit_0/auto-orient,0" onerror="$(this).attr('src','http://www.9ku.com/images/no-small-avatar.png');" /></div><div class="t-t"><div class="t-singer">二宝(王浩琳)</div><p class="t-songNum">7首</p></div><div class="t-z">播放</div></a></li>
<li><a href="/geshou/11494.htm"><div class="t-i"><img src="http://aliyunimg.9ku.com/pic/gstx/2/11494.jpg?x-oss-process=image/resize,m_fill,w_106,h_80,limit_0/auto-orient,0" onerror="$(this).attr('src','http://www.9ku.com/images/no-small-avatar.png');" /></div><div class="t-t"><div class="t-singer">Echo</div><p class="t-songNum">5首</p></div><div class="t-z">播放</div></a></li>
<li><a href="/geshou/3320.htm"><div class="t-i"><img src="http://aliyunimg.9ku.com/pic/gstx/1/3320.jpg?x-oss-process=image/resize,m_fill,w_106,h_80,limit_0/auto-orient,0" onerror="$(this).attr('src','http://www.9ku.com/images/no-small-avatar.png');" /></div><div class="t-t"><div class="t-singer">尔萨(马尔萨)</div><p class="t-songNum">31首</p></div><div class="t-z">播放</div></a></li>
<li><a href="/geshou/47259.htm"><div class="t-i"><img src="http://aliyunimg.9ku.com/pic/gstx/5/47259.jpg?x-oss-process=image/resize,m_fill,w_106,h_80,limit_0/auto-orient,0" onerror="$(this).attr('src','http://www.9ku.com/images/no-small-avatar.png');" /></div><div class="t-t"><div class="t-singer">额尔德木图</div><p class="t-songNum">2首</p></div><div class="t-z">播放</div></a></li>
<li><a href="/geshou/18802.htm"><div class="t-i"><img src="http://aliyunimg.9ku.com/pic/gstx/2/18802.jpg?x-oss-process=image/resize,m_fill,w_106,h_80,limit_0/auto-orient,0" onerror="$(this).attr('src','http://www.9ku.com/images/no-small-avatar.png');" /></div><div class="t-t"><div class="t-singer">E歌</div><p class="t-songNum">1首</p></div><div class="t-z">播放</div></a></li>
<li><a href="/geshou/3923.htm"><div class="t-i"><img src="http://aliyunimg.9ku.com/pic/gstx/1/3923.jpg?x-oss-process=image/resize,m_fill,w_106,h_80,limit_0/auto-orient,0" onerror="$(this).attr('src','http://www.9ku.com/images/no-small-avatar.png');" /></div><div class="t-t"><div class="t-singer">二娃李军(李军)</div><p class="t-songNum">3首</p></div><div class="t-z">播放</div></a></li>
<li><a href="/geshou/42062.htm"><div class="t-i"><img src="http://aliyunimg.9ku.com/9kuimg/geshou/20170205/9213f714d00de3ba.jpg?x-oss-process=image/resize,m_fill,w_106,h_80,limit_0/auto-orient,0" onerror="$(this).attr('src','http://www.9ku.com/images/no-small-avatar.png');" /></div><div class="t-t"><div class="t-singer">二龙</div><p class="t-songNum">2首</p></div><div class="t-z">播放</div></a></li>
<li><a href="/geshou/2806.htm"><div class="t-i"><img src="http://aliyunimg.9ku.com/pic/gstx/1/2806.jpg?x-oss-process=image/resize,m_fill,w_106,h_80,limit_0/auto-orient,0" onerror="$(this).attr('src','http://www.9ku.com/images/no-small-avatar.png');" /></div><div class="t-t"><div class="t-singer">恩炀</div><p class="t-songNum">10首</p></div><div class="t-z">播放</div></a></li>
<li><a href="/geshou/1728.htm"><div class="t-i"><img src="http://aliyunimg.9ku.com/pic/gstx/1/1728.jpg?x-oss-process=image/resize,m_fill,w_106,h_80,limit_0/auto-orient,0" onerror="$(this).attr('src','http://www.9ku.com/images/no-small-avatar.png');" /></div><div class="t-t"><div class="t-singer">Eric Carmen</div><p class="t-songNum">11首</p></div><div class="t-z">播放</div></a></li>
<li><a href="/geshou/57920.htm"><div class="t-i"><img src="" onerror="$(this).attr('src','http://www.9ku.com/images/no-small-avatar.png');" /></div><div class="t-t"><div class="t-singer">E-eye-E</div><p class="t-songNum">1首</p></div><div class="t-z">播放</div></a></li>
<li><a href="/geshou/42786.htm"><div class="t-i"><img src="" onerror="$(this).attr('src','http://www.9ku.com/images/no-small-avatar.png');" /></div><div class="t-t"><div class="t-singer">二强叔叔</div><p class="t-songNum">1首</p></div><div class="t-z">播放</div></a></li>
<li><a href="/geshou/39749.htm"><div class="t-i"><img src="http://aliyunimg.9ku.com/pic/gstx/4/39749.jpg?x-oss-process=image/resize,m_fill,w_106,h_80,limit_0/auto-orient,0" onerror="$(this).attr('src','http://www.9ku.com/images/no-small-avatar.png');" /></div><div class="t-t"><div class="t-singer">Eric-Z</div><p class="t-songNum">1首</p></div><div class="t-z">播放</div></a></li>
<li><a href="/geshou/43092.htm"><div class="t-i"><img src="http://aliyunimg.9ku.com/pic/gstx/5/43092.jpg?x-oss-process=image/resize,m_fill,w_106,h_80,limit_0/auto-orient,0" onerror="$(this).attr('src','http://www.9ku.com/images/no-small-avatar.png');" /></div><div class="t-t"><div class="t-singer">Elvis West</div><p class="t-songNum">0首</p></div><div class="t-z">播放</div></a></li>
</ul>
`;

module.exports = {
  name: "",
  method: "get",
  url: alphabet => `geshou/dalunan-${alphabet}-all.htm`,
  analysis: html => {
    const $ = load(html);
    const singerList = $(".singerList");
    const as = $(singerList)
        .find("a")
        .toArray();
    const list = map(as, ({ attribs, children }) => {
      const href = attribs.href;
      const id = href.substring(href.lastIndexOf("/")+1, href.lastIndexOf("."));
      return { id };
    });
    return list;
  }
};
