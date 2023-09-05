class DepTree {
    constructor(name, version){
        this.name = name;
        this.version = version;
        this.forest = []; 
    }

    /**
     * @param {DepTree} childTree
     */
    addChildTree(childTree){
        this.forest.push(childTree);
    }
    toString() {
        return JSON.stringify({
            "name": String(this.name),
            "version": String(this.version),
            "forest": this.forest
        });
    }
}
module.exports = DepTree;