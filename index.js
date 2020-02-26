const { execute } = require("./util/network");
const {
  config,
  modules: {
    Classify,
    SingerList,
    SongList,
    SongDetail,
    Album,
    AlbumSongList,
    SingerDetail
  }
} = require("./module/9ku");

async function start() {
  //分类
  // const data = await execute(config, Classify);
  //根据字母顺序获取歌手ids
  // const data = await execute(config, SingerList, 'dalunv','e');
  //根据singerId获取songIds
  // const data = await execute(config, SongList, "2263");
  //根据songId获取song detail
  // const data = await execute(config, SongDetail, "188060");
  //根据songId获取album list
  // const data = await execute(config, Album, "2263");
  //根据albumId获取song ids
  // const data = await execute(config, AlbumSongList, "141375");
  // 根据singerId获取singer detail
  const data = await execute(config, SingerDetail, "2263");

  console.log("--------------------------");
  console.log(data);
  console.log("--------------------------");
}

try {
  start();
} catch (e) {
  console.error(e);
}
