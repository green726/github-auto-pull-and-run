let fs = require('fs')
//express stuff
let express = require("express");
let app = express();
let http = require("http").createServer(app);
//git clone package
let clone = require('git-clone');
//child process things
let spawn = require('child_process').spawn;
const { SIGINT } = require('constants');
//port to listen for github API
let port = 9090;
//config file
let config;
//different child processes
let child;
let child2;
let child3;
//has child1 existed, if so need to kill the server before starting again
let childHasExisted = false;



fs.rmdirSync("./repo", { recursive: true });
clone("https://github.com/AstrocoreGames/astrocoreBeta", "./repo")
setTimeout(init, 200)
setTimeout(pull, 2000)
setTimeout(killChild, 3000);
//TODO: write code to copy the repo data.dat to dataPersist.dat before pulling new repo and after pull new repo replace new data.dat with persistentData.dat
app.post("/github", (req, res) => {
    pull()
    setTimeout(killChild, 600)
    console.log('Done')
    res.send("Done")
})

function killChild(){
  if (childHasExisted){
    child.kill("SIGINT")
    console.log("killed child")
    child = spawn('npx kill-port 8000', {
      shell: true
    })
    child.stderr.on('data', function (data) {
      console.error("Server error:", data.toString());
    });
  child.stdout.on('data', function (data) {
      console.log("Server log:", data.toString());
    });
  child.on('exit', function (exitCode) {
      console.log("Child exited with code: " + exitCode);
    });
    setTimeout(function(){ child.kill("SIGINT")}, 1000)

    setTimeout(startServer, 5000)
  } else{
    setTimeout(startServer, 5000)
  }
  
}

function startServer() {
      child = spawn('cd ./repo && echo 1 && npm i && echo 2 && node server.js && echo 3', {
        shell: true
      });
    
    childHasExisted = true;
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

function pull(){
  child2 = spawn('cd ./repo && git pull https://github.com/AstrocoreGames/astrocoreBeta', {
    shell: true
  })
  child2.stderr.on('data', function (data) {
    console.error("Git pull error:", data.toString());
  });


  setTimeout(() => {
    child2.kill("SIGINT")
    console.log("killed child 2")
  }, 2000)
}

function init(){
  child3 = spawn('cd ./repo && git init', {
    shell: true
  })
  child3.stderr.on('data', function (data) {
    console.error("Git init error:", data.toString());
  });


  setTimeout(() => {
    child3.kill("SIGINT")
    console.log("killed child 3")
  }, 2000)
}


http.listen(port, "0.0.0.0", () => {
    console.log("listening on *:9090");
  });

  