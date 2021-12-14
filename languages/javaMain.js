let fs = require('fs');
let rawConfig = fs.readFileSync("../config.json").toString();
let parsedConfig = JSON.parse(rawConfig);
let fileToRun = parsedConfig.fileToRun;
let child;
//child process things
let {spawnSync, spawn} = require('child_process');
function reset() {
  console.log("javaMain.js: resetting code");
  startServer();
  killChild();
}

function killChild() {
  console.log("javaMain.js: killing child");
  child.kill();
}

function compileCode() {
    console.log("javaMain.js: compiling code");
    let child2 = spawnSync(`cd ../repo && javac ${fileToRun}.java && echo 'java compile good'`, {
        shell: true
    });
    console.log("javaMain.js: compile code done");
    return null;
}

async function startServer() {
    await compileCode();
  console.log(`javaMain.js: running code from ${fileToRun}`);
    child = spawn(`cd ../repo && java ${fileToRun} && echo 'java start good'`, {
        shell: true
      });
    child.stderr.on('data', function (data) {
        console.error("java error:", data.toString());
      });
    child.stdout.on('data', function (data) {
        console.log("java log:", data.toString());
      });
    child.on('exit', function (exitCode) {
        console.log("Child exited with code: " + exitCode);
      });
}  



module.exports = { 
  startServer: startServer,
  reset: reset 
}