var fs = require('fs')
var express = require("express");
var app = express();
var http = require("http").createServer(app);
var clone = require('git-clone');
var spawn = require('child_process').spawn;

fs.rmdirSync("./repo", { recursive: true });
clone("https://github.com/AstrocoreGames/astrocoreBeta", "./repo")
setTimeout(startServer, 5000);

app.post("/github", (req, res) => {
    fs.rmdirSync("./repo", { recursive: true });
    clone("https://github.com/AstrocoreGames/astrocoreBeta", "./repo")
    setTimeout(startServer, 5000)
    console.log('Done')
    res.send("Done")
})

function startServer() {
    var child = spawn('cd ./repo && echo 1 && npm i && echo 2 && node server.js && echo 3', {
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


http.listen(9090, "0.0.0.0", () => {
    console.log("listening on *:9090");
  });

  