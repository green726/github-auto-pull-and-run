const { spawnSync, spawn } = require('child_process');
let fs = require('fs');
const { parse } = require('path');
let rawConfig = fs.readFileSync("../config.json").toString();
let parsedConfig = JSON.parse(rawConfig);
let wayToRun = parsedConfig.wayToRun;
let port = parsedConfig.port;
let fileToRun = parsedConfig.fileToRun;

let rawCommands = fs.readFileSync("../commands.json").toString();


let parsedCommands = JSON.parse(rawCommands);

let commandsArr = []

function initCommands() {
    for (let i of Object.keys(parsedCommands[wayToRun])) {
        for (let v of Object.keys(parsedCommands[wayToRun][i])) {
            let command = parsedCommands[wayToRun][i][v];
            parsedCommands[wayToRun][i][v] = command.replace(/fileToRun/g, fileToRun)
        }
    }
}

let isCompiledLang = "compile" in parsedCommands[wayToRun] ? true : false;

function compile() {
    for (let command of Object.values(parsedCommands[wayToRun].compile)) {
        let child2 = spawnSync(command, {
            shell: true
        })
    }
}

function run() {
    for (let command of Object.values(parsedCommands[wayToRun].start)) {
        let child = spawn(command, {
            shell: true
        })
        child.stderr.on('data', function(data) {
            console.error("Code error:", data.toString());
        });
        child.stdout.on('data', function(data) {
            console.log("Code log:", data.toString());
        });
        child.on('exit', function(exitCode) {
            console.log("Code exited with code: " + exitCode);
        });
    }
}

async function reset() {
    if (isCompiledLang) {
        await compile();
        run();
    } else {
        run();
    }
}

module.exports = {
    compile,
    run,
    reset,
    isCompiledLang,
    port,
    fileToRun,
    parsedConfig,
    port,
    initCommands
}
