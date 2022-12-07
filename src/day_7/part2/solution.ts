const fs = require("fs");

fs.readFile("../input.txt", "utf-8", function read(err, data) {
    if (err) {
        throw err;
    }
    const commands : string[] = data.split("\n");
    // 1. Build the file structure
    const fileSystemTree: TreeNode = buildDirectoryStructure(commands);

    // 2. Populate the sizes
    populateDirectorySize(fileSystemTree);

    // 3. Find smallest directory we can delete to have enough space.
    const totalDirectorySize : number = (fileSystemTree.size as number);
    const totalDiskSpace : number = 70000000;
    const totalUnusedSpace = totalDiskSpace - totalDirectorySize;
     
    // Find x, such that totalDiskSpace - (totalDirectorySize - x) > 30000000

    function willAllowDiskSpaceDownload(treeNode: TreeNode) : boolean {
        return totalDiskSpace - (totalDirectorySize - (treeNode.size as number)) > 30000000;
    }

    // 3. Find the directories less than 100k
    const result: TreeNode[] = findAll(willAllowDiskSpaceDownload, fileSystemTree);
    const asSizes = result.map(node => node?.size ? node.size : Number.MAX_VALUE);
    console.log(Math.min(...asSizes));

})





export interface TreeNode {
    parent?: TreeNode,
    name: string,
    size?: number,
    children : {[name: string] : TreeNode},
    kind: "directory" | "file"
}


export function buildDirectoryStructure(commands: string[]): TreeNode {
    // 1. Create ROOT Dir
    const rootDirectory = createRootDirectory();
    let currentWorkingDirectory = rootDirectory;

    // 2. Read in each command and handle accordingly
    for (const command of commands) {
        // 1. Decide if it's an input or ouput command
        // Input => args[0] === '$'
        const args : string[] = command.split(" ");

        if (args[0] === "$") {
            // ls
            if (args[1] === "ls") {
                // Do nothing
                continue;
            } else if (args[1] === "cd") {
                const directoryToChangeTo = args[2];
                // Go up a directory, unless you're at the root
                if (directoryToChangeTo === "..") {
                   if (currentWorkingDirectory.parent) {
                    currentWorkingDirectory = currentWorkingDirectory.parent;
                   }
                // Go to the outermost directory
                } else if (directoryToChangeTo === "/") {
                    currentWorkingDirectory = rootDirectory;
                } else {
                    // if directory exists, CD into it, else, create it then CD
                    let nextDirectory = currentWorkingDirectory.children[directoryToChangeTo];

                    if (!nextDirectory) {
                          const newDirectory : TreeNode = {
                            parent: currentWorkingDirectory,
                            name: directoryToChangeTo,
                            children : {},
                            kind: "directory"
                         };
                         currentWorkingDirectory.children[directoryToChangeTo] = newDirectory;
                    }

                    currentWorkingDirectory = currentWorkingDirectory.children[directoryToChangeTo];
                }
            }
        } else {
            // EIther a directory or file. Check existence or add to the structure.
            if (args[0] === "dir") {
                const directoryName : string = args[1];
                if (!currentWorkingDirectory.children[directoryName]) {
                    currentWorkingDirectory.children[directoryName] = {
                        name: directoryName,
                        parent: currentWorkingDirectory,
                        children: {},
                        kind: "directory",
                    }
                }
            } else {
                const [fileSize, fileName] = args;
                if (!currentWorkingDirectory.children[fileName]) {
                    currentWorkingDirectory.children[fileName]  = {
                        name: fileName,
                        parent: currentWorkingDirectory,
                        size: Number.parseInt(fileSize),
                        children: {},
                        kind: "file",
                    }
                }
            }
        }
    }

    return rootDirectory;
}

export function populateDirectorySize(node: TreeNode) : void {
    const stack : TreeNode[] = []
    // I want to do a post-order traversal to populate the size across the tree
    stack.push(node);
    const visited : Set<TreeNode> = new Set();

    while (stack.length > 0) {
        // Post order to populate?
        // TODO: How do I get rid of annoying "may be undefined" errors?
        const current : TreeNode  = (stack.pop() as TreeNode);

        switch (current.kind) {
            case "directory":
                const children : TreeNode[] = Object.values(current.children);
                let visitedChildren : number = 0;
                // To do a postorder, we only mark a node as visited if all it's children are visted.
                for (const child of children) {
                    if (visited.has(child)) {
                        visitedChildren += 1;
                    } 
                }

                if (children.length === visitedChildren) {
                    // Sum all the kids, add node to visited.
                    const totalSizeOfSubDirectories: number =
                    children.map(child => child.size ? child.size : 0).reduce((accumulator, value) => accumulator + value, 0);
                    
                    current.size = totalSizeOfSubDirectories;
                    visited.add(current);
                    console.log(current.name)
                } else {
                    stack.push(current);
                    for (const child of children) {
                        stack.push(child);
                    }   
                }

                break;
            case "file":
                visited.add(current);
                console.log(current.name)
                break;
            default:
                throw new Error("Unrecognized type: " + current.kind);
        }
    }
}

export function findAll(predicate: (node: TreeNode) => boolean, root: TreeNode) : TreeNode[] {
    const stack : TreeNode[] = [];
    stack.push(root);
    const result : TreeNode[]= [];

    while (stack.length > 0) {
        const current : TreeNode = (stack.pop() as TreeNode);

        if (predicate(current)) {
            result.push(current);
        }

        if (current.kind === "directory") {
            const children : TreeNode[] = Object.values(current.children);
            for (const child of children) {
                stack.push(child);
            }
        }
    }

    return result;
}


const myNode : TreeNode = {
    name: "",
    size: 2,
    kind: "directory",
    children: {}
}

function hasLessThan100kSize(treeNode: TreeNode) : boolean {
    if (!treeNode.size) {
        return false;
    } else {
        return treeNode.kind === "directory" && treeNode.size < 100000;
    }
}

//findAll(hasLessThan100kSize, myNode);

function createRootDirectory() : TreeNode {
   return {
        name: "",
        children: {},
        kind: "directory"
    };
}