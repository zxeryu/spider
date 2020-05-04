const fs = require("fs");

async function writeFile(path, content) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, content, err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

async function appendFile(path, content) {
  return new Promise((resolve, reject) => {
    fs.appendFile(path, content, err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

module.exports = {
  writeFile
};
