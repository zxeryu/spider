const { execute } = require("./util/network");
const {
  config,
  modules: { SingerClassify, SingerAlphabet }
} = require("./module/9ku");

async function start() {
  // const data = await execute(config, SingerClassify, 1);
  const data = await execute(config, SingerAlphabet, 'a');
  console.log("--------------------------");
  console.log("data====", data);
  console.log("--------------------------");
}

try {
  start();
} catch (e) {
  console.error(e);
}
