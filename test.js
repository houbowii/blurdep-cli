#!/usr/bin/env node
const handle = require("./handle");
const bestFS = require("./src/utils/bestFS");

handle.generateDependencyTree("", "depDependencies", 2)
  .then((depTree) => {
    bestFS.writeFile("./client/data.json", JSON.stringify(depTree));
    }) 
  .catch((error) => console.error(error));
