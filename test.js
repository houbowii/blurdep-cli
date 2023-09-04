const handle = require("./handle");


handle.generateDependencyTree("", "depDependencies", 1)
  .then((depTree) => {
    console.log(JSON.stringify(depTree));
    }) 
  .catch((error) => console.error(error));