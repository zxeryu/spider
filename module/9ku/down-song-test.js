const {download, execute} = require("../../util/network");
const {writeFile} = require("../../util/file");
const {modules, config} = require("./index");
const fs = require('fs');

async function downSong(rootPath, song) {
    const data = await execute(config, modules.SongDetail, song.songId);
    const {media} = data;
    const suffix = media.substring(media.lastIndexOf("."));
    const mediaName = data.extra.title ? data.extra.title + suffix : media.substring(media.lastIndexOf("/") + 1);
    console.log('song', mediaName, media);
    await downloadFile(media,rootPath + mediaName);
}

async function downloadFile(url, filepath) {
    const writer = fs.createWriteStream(filepath);
    const response = await download(url);
    response.data.pipe(writer);
    return new Promise((resolve, reject) => {
        writer.on("finish", resolve);
        writer.on("error", reject);
    });
}


async function startSongListTask(singerId) {
    const songList = await execute(config, modules.SongList, singerId);
    console.log(songList);
    await startDownSongs(songList);
}

async function startDownSongs(songList) {
    if (songList.length > 0) {
        const songId = songList.shift();
        try {
            console.log('down start');
            await downSong("E:/zx/code/ghub/spider/source/jay/", songId);
            console.log('down success');
        } catch (e) {
            console.log('down error', e);
        } finally {
            startDownSongs(songList);
        }
    }
}

// "798"
// downSong('', '41813');
// startSongListTask("798");

// downSong("E:/zx/code/ghub/spider/source/jay/", {songId:'41813'});

console.log(__dirname,__filename);