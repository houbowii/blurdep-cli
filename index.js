#!/usr/bin/env node

const path = require("path");
const handle = require("./server/handle");
const bestFS = require("./server/bestFS");

let thisfilelocation = path.resolve(__dirname, "..");
let jsondatalocation = path.join(thisfilelocation, "./client/data.json")

let depthFlagIndex = (process.env.npm_config_depth) ? process.env.npm_config_depth : 2;
let root = (process.env.npm_config_root) ? process.env.npm_config_root : "";

handle.generateDependencyTree(root, "", "depDependencies", depthFlagIndex)
  .then((depTree) => {
    bestFS.writeFile(jsondatalocation, JSON.stringify(depTree));
  })
  .catch((error) => console.error(error));