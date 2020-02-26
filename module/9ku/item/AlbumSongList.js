//get song list in album by albumId
const { load } = require("../../../util/parse");
const { map } = require("lodash");
const { findIdFromUrl } = require("../../../util/string");

module.exports = {
    name: "album-song-list",
    method: "get",
    url: albumId => `zjmusic/${albumId}.htm`,
    analysis: html => {
        const $ = load(html);
        const as = $(".musicList")
            .find(".t-i")
            .toArray();
        const list = map(as, ({attribs}) => {
            const href = attribs.href;
            const songId = findIdFromUrl(href);
            return{songId};
        });
        return list;
    }
};



