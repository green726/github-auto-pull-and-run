let fs = require('fs');
let rawConfig = fs.readFileSync("./config.json").toString();
let parsedConfig = JSON.parse(rawConfig);
let fileToRun = parsedConfig.fileToRun;
let child;
//child process things
let {spawnSync, spawn} = require('child_process');
function reset() {
  console.log("python3Main.js: resetting code");
  startServer();
  killChild();
}

function killChild() {
  console.log("python3Main.js: killing child");
  child.kill();
}

function startServer() {
  console.log(`python3Main.js: running code from ${fileToRun}`);
    child = spawn(`cd ./repo && python ${fileToRun} && echo 'python start good'`, {
        shell: true
      });
    child.stderr.on('data', function (data) {
        console.error("python error:", data.toString());
      });
    child.stdout.on('data', function (data) {
        console.log("python log:", data.toString());
      });
    child.on('exit', function (exitCode) {
        console.log("Child exited with code: " + exitCode);
      });
}  



module.exports = { 
  startServer: startServer,
  reset: reset 
}