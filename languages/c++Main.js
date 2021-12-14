let fs = require('fs');
let rawConfig = fs.readFileSync("../config.json").toString();
let parsedConfig = JSON.parse(rawConfig);
let fileToRun = parsedConfig.fileToRun;
let child;
//child process things
let {spawnSync, spawn} = require('child_process');
function reset() {
  console.log("c++Main.js: resetting code");
  startServer();
  killChild();
}

function killChild() {
  console.log("c++Main.js: killing child");
  child.kill();
}

function compileCode() {
    console.log("c++Main.js: compiling code");
    child = spawnSync(`cd ../repo && g++ ${fileToRun}.cpp -o ${fileToRun}.exe && echo 'c++ compile good'`, {
        shell: true
    });
    console.log("c++Main.js: compile code done");
    return null;
}

async function startServer() {
    await compileCode();
  console.log(`c++Main.js: running code from ${fileToRun}`);
    child = spawn(`cd ../repo && ${fileToRun} && echo 'c++ start good'`, {
        shell: true
      });
    child.stderr.on('data', function (data) {
        console.error("c++ error:", data.toString());
      });
    child.stdout.on('data', function (data) {
        console.log("c++ log:", data.toString());
      });
    child.on('exit', function (exitCode) {
        console.log("Child exited with code: " + exitCode);
      });
}  



module.exports = { 
  startServer: startServer,
  reset: reset 
}