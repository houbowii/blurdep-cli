#!/usr/bin/env node
const handle = require("./handle");


handle.generateDependencyTree("", "depDependencies", 2)
  .then((depTree) => {
    console.log(JSON.stringify(depTree));
    }) 
  .catch((error) => console.error(error));