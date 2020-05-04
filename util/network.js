const axios = require("axios");

function get(url) {
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(res => resolve(res.data))
      .catch(err => {
        console.error(err);
        reject(err);
      });
  });
}

async function execute(config, module, ...routeParams) {
  const rootUrl = config.rootUrl;
  const { method, url, analysis } = module;
  const html = await get(rootUrl + url(...routeParams));
  return analysis(html);
}

function download(url) {
  return new Promise((resolve, reject) => {
    axios({
      url,
      method: "GET",
      responseType: "stream", // important
    })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
        console.error(err);
      });
  });
}

module.exports = {
  get,
  execute,
  download
};
