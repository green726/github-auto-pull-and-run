let fs = require('fs');
let rawConfig = fs.readFileSync("../config.json").toString();
let parsedConfig = JSON.parse(rawConfig);
let wayToRun = parsedConfig.wayToRun;
let port = parsedConfig.port;
let fileToRun = parsedConfig.fileToRun;
console.log(`fileToRun: ${fileToRun}`);

let startServer = require("../languages/" + wayToRun + "Main.js").startServer;

function reset() {
    resetFunc = require("../languages/" + wayToRun + "Main.js").reset;
    resetFunc();
}

module.exports = {
    wayToRun,
    parsedConfig,
    port,
    reset,
    startServer,
    fileToRun,
}