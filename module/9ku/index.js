const config = require("./config");
const Classify = require("./item/Classify");
const SingerList = require("./item/SingerList");
const SongList = require("./item/SongList");
const SongDetail = require("./item/SongDetail");
const Album = require("./item/Album");
const AlbumSongList = require("./item/AlbumSongList");
const SingerDetail = require("./item/SingerDetail");

module.exports = {
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
};
