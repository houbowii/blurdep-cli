#!/usr/bin/env node
const handle = require("../server/handle");
const bestFS = require("../server/bestFS");

let depthFlagIndex = (process.env.npm_config_depth)?process.env.npm_config_depth:2;

handle.generateDependencyTree("", "depDependencies", depthFlagIndex)
  .then((depTree) => {
    bestFS.writeFile("./client/data.json", JSON.stringify(depTree));
    }) 
  .catch((error) => console.error(error));
