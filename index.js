#!/usr/bin/env node
const handle = require("./server/handle");
const bestFS = require("./server/bestFS");

handle.generateDependencyTree("", "depDependencies", 2)
  .then((depTree) => {
    bestFS.writeFile("./client/data.json", JSON.stringify(depTree));
    }) 
  .catch((error) => console.error(error));
