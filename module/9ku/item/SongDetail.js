//get song detail
const { load } = require("../../../util/parse");
const { findIdFromUrl } = require("../../../util/string");

module.exports = {
  name: "song-detail",
  method: "get",
  url: songId => `play/${songId}.htm`,
  analysis: html => {
    const $ = load(html);

    const mediaScript = $("script").toArray()[0];
    const mediaStr = mediaScript.children[0].data;
    let media = mediaStr
      .substring(mediaStr.indexOf("{"), mediaStr.indexOf("}"))
      .trim();
    media = media.substring(media.indexOf('"') + 1, media.lastIndexOf('"'));
    const songId = findIdFromUrl(media);

    const extraScript = $('script[type="application/ld+json"]').toArray()[0];
    const extra = extraScript.children[0].data;

    const img = $(".playerAlbum img").toArray()[0];
    let image = img.attribs.src;
    image = image.substring(0, image.indexOf("?"));

    const lrcTextArea = $("#lrc_content").toArray()[0];
    let lrc = lrcTextArea.children[0].data;

    return { songId, media, image, extra:JSON.parse(extra), lrc };
  }
};
