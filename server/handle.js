const path = require("path");
const bestFS = require("./bestFS");
const DepTree = require("./depTree");

async function generateDependencyTree(root, path2resolve = "", field = "dependencies", depth = 1) {
        // let target = (path2resolve === "") ? return : path2resolve;
    if (root==="") return;
    let target;
    if (path2resolve===""){
        target = path.resolve(root, "./package.json");
    } else {
        target = path.resolve(root, "./node_modules", path2resolve, "./package.json")
    }
    if (target==="") {
        return;
    }
    try {
        let content = await bestFS.readFile(target);
        let { dependencies = {} } = JSON.parse(content);
        let depTree = Object.entries(dependencies || {}).map(([key, value]) => new DepTree(key, value));
        if (depth > 0) {
            for (let i = 0; i < depTree.length; i++) {
                let childTree = await generateDependencyTree(root, depTree[i].name, field, depth - 1);
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