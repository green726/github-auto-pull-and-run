//express stuff
let express = require("express");
let app = express();
let http = require("http").createServer(app);
let reset = require('./languageControl.js').reset;
let port = require('./languageControl.js').port;
let {gitClone, gitInit, npmInit} = require('./utilFuncs');
let pull = require('./utilFuncs.js').pull;
let initCommands = require('./languageControl.js').initCommands;

(async function() {
  initCommands();
  await gitClone();
  await gitInit();
  await npmInit();
  setTimeout( () => {reset();}, 1000);
})()


http.listen(port, "0.0.0.0", () => {
    console.log(`listening on *${port}`);
  });

app.post("/github", (req, res) => {
    pull();
    reset();
    res.send("Done")
    console.log("Pulled and reset");
})

