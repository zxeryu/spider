const { isEmpty } = require("lodash");
function findIdFromUrl(url) {
  if (isEmpty(url)) {
    return null;
  }
  return url.substring(url.lastIndexOf("/") + 1, url.lastIndexOf("."));
}

function imgUrlWithNoParams(url) {
  if (isEmpty(url)) {
    return null;
  }
  return url.substring(0, url.indexOf("?"));
}

module.exports = {
  findIdFromUrl,
  imgUrlWithNoParams
};
