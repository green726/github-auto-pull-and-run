let fs = require('fs');
let rawConfig = fs.readFileSync("../config.json").toString();
let parsedConfig = JSON.parse(rawConfig);
let fileToRun = parsedConfig.fileToRun;
let child;
//child process things
let {spawnSync, spawn} = require('child_process');
//has child existed, if so need to kill the server before starting again
function reset() {
  console.log("nodeMain.js: resetting server");
  killChild();
  startServer();
}

function killChild(){
    let child2 = spawnSync('npx kill-port 8000', {
      shell: true
    })

    child.kill("SIGINT");
}

function startServer() {
  console.log(`nodeMain.js: starting server at ${fileToRun}`);
    child = spawn(`cd ../repo && npm i && node ${fileToRun} && echo 'server start good'`, {
        shell: true
      });
    child.stderr.on('data', function (data) {
        console.error("Server error:", data.toString());
      });
    child.stdout.on('data', function (data) {
        console.log("Server log:", data.toString());
      });
    child.on('exit', function (exitCode) {
        console.log("Child exited with code: " + exitCode);
      });
}  



module.exports = { 
  startServer: startServer,
  reset: reset 
}