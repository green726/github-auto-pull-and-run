let fs = require('fs')
let repo = require('./languageControl.js').parsedConfig.repoToClone;
let spawnSync = require('child_process').spawnSync;
let clone = require('git-clone');

function pull(){
    let child1 = spawnSync('cd ./repo && git pull https://github.com/AstrocoreGames/astrocoreBeta', {
      shell: true
    })
}
  
function gitInit(){
    let child2 = spawnSync('cd ./repo && git init', {
      shell: true
    })
    return null;
}

function gitClone() {
    if (fs.existsSync('./repo')) {
      fs.rmdirSync("./repo", { recursive: true });
    }
    clone(repo, "../repo")
    console.log("Cloned repo")
    return null;
}

function npmInit() {
    let child3 = spawnSync('cd ./repo && npm i', {
      shell: true
    })

    return null;
}

module.exports = { 
    pull,
    gitInit,
    gitClone,
    npmInit
}