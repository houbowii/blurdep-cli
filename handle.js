const path = require("path");
const bestFS = require("./src/utils/bestFS");
const DepTree = require("./src/entity/depTree");

async function generateDependencyTree(path2resolve = "", field = "dependencies", depth = 1) {
    let target = path2resolve === "" ? path.resolve("./package.json") : path.resolve("./node_modules/", path2resolve, "./package.json");
    try {
        let content = await bestFS.readFile(target);
        let { dependencies = {} } = JSON.parse(content);
        let depTree = Object.entries(dependencies || {}).map(([key, value]) => new DepTree(key, value));
        if (depth > 0) {
            for (let i = 0; i < depTree.length; i++) {
                let childTree = await generateDependencyTree(depTree[i].name, field, depth - 1);
                childTree.forEach(element => {
                    depTree[i].addChildTree(element);
                });

            }
        }
        return depTree;

    } catch (error) {
        return error;
    }
}

module.exports = {generateDependencyTree};

// generateDependencyTree("", "depDependencies", 2)
//   .then((depTree) => {
//     console.log(JSON.stringify(depTree));
//     })
//   .catch((error) => console.error(error));