//express stuff
let express = require("express");
let app = express();
let http = require("http").createServer(app);
let reset = require('./languageControl.js').reset;
let startServer = require('./languageControl.js').startServer;
let port = require('./languageControl.js').port;
let {gitClone, gitInit, npmInit} = require('./utilFuncs');
let pull = require('./utilFuncs.js').pull;

(async function() {
  await gitClone();
  await gitInit();
  await npmInit();
  setTimeout( () => {startServer();}, 1000);
})()


http.listen(port, "0.0.0.0", () => {
    console.log(`listening on *${port}`);
  });

app.post("/github", (req, res) => {
    pull();
    reset();
    console.log('Done')
    res.send("Done")
})

