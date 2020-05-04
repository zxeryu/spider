// combine items
const {execute, download} = require("../../util/network");
const {writeFile} = require("../../util/file");
const {config, modules} = require("./index");
const {forEach} = require("lodash");

/**************************************Classify****************************************************/

async function startClassifyTask() {
    const data = await execute(config, modules.Classify);
    await writeFile(
        "E:/zx/code/web-server/spider/source/" + config.dir + "/classify.json",
        JSON.stringify(data)
    );
}

/**************************************Singer List****************************************************/

async function singerList(singers, tasks) {
    if (tasks.length > 0) {
        const task = tasks.shift();
        const data = await execute(
            config,
            modules.SingerList,
            task.classifyId,
            task.alphabet
        );
        console.log("--finish task---", task, data.length);
        singers.push(...data);
        await singerList(singers, tasks);
    } else {
        await saveSingerList(singers);
    }
}

const alphabets = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "g",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z"
];

const singerIDs = [];

async function startSingerTask() {
    //获取分类
    const classifies = await execute(config, modules.Classify);

    const tasks = [];
    forEach(classifies, ({classifyId}) => {
        forEach(alphabets, alphabet => {
            tasks.push({classifyId, alphabet});
        });
    });
    await singerList(singerIDs, tasks);
}

async function saveSingerList(singers) {
    await writeFile(
        "E:/zx/code/web-server/spider/source/" + config.dir + "/singers.json",
        JSON.stringify(singers)
    );
}

/**************************************Singer List****************************************************/

async function downSong(rootPath, songId) {
    const data = await execute(config, modules.SongDetail, songId);
    const {media} = data;
    const mediaName = media.substring(media.lastIndexOf("/") + 1);
    const blob = await download(media);
    await writeFile(rootPath + mediaName, blob);
}

module.exports = {
    startClassifyTask,
    startSingerTask
};

