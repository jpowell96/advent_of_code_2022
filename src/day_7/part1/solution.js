"use strict";
exports.__esModule = true;
exports.findAll = exports.populateDirectorySize = exports.buildDirectoryStructure = void 0;
var fs = require("fs");
fs.readFile("input.txt", "utf-8", function read(err, data) {
    if (err) {
        throw err;
    }
    var commands = data.split("\n");
    // 1. Build the file structure
    var fileSystemTree = buildDirectoryStructure(commands);
    // 2. Populate the sizes
    populateDirectorySize(fileSystemTree);
    // 3. Find the directories less than 100k
    var result = findAll(hasLessThan100kSize, fileSystemTree);
    var totalSizeOfDirecotires = result
        .map(function (node) { return (node === null || node === void 0 ? void 0 : node.size) ? node.size : 0; })
        .reduce(function (acc, val) { return acc + val; }, 0);
    console.log(totalSizeOfDirecotires);
});
function buildDirectoryStructure(commands) {
    // 1. Create ROOT Dir
    var rootDirectory = createRootDirectory();
    var currentWorkingDirectory = rootDirectory;
    // 2. Read in each command and handle accordingly
    for (var _i = 0, commands_1 = commands; _i < commands_1.length; _i++) {
        var command = commands_1[_i];
        // 1. Decide if it's an input or ouput command
        // Input => args[0] === '$'
        var args = command.split(" ");
        if (args[0] === "$") {
            // ls
            if (args[1] === "ls") {
                // Do nothing
                continue;
            }
            else if (args[1] === "cd") {
                var directoryToChangeTo = args[2];
                // Go up a directory, unless you're at the root
                if (directoryToChangeTo === "..") {
                    if (currentWorkingDirectory.parent) {
                        currentWorkingDirectory = currentWorkingDirectory.parent;
                    }
                    // Go to the outermost directory
                }
                else if (directoryToChangeTo === "/") {
                    currentWorkingDirectory = rootDirectory;
                }
                else {
                    // if directory exists, CD into it, else, create it then CD
                    var nextDirectory = currentWorkingDirectory.children[directoryToChangeTo];
                    if (!nextDirectory) {
                        var newDirectory = {
                            parent: currentWorkingDirectory,
                            name: directoryToChangeTo,
                            children: {},
                            kind: "directory"
                        };
                        currentWorkingDirectory.children[directoryToChangeTo] = newDirectory;
                    }
                    currentWorkingDirectory = currentWorkingDirectory.children[directoryToChangeTo];
                }
            }
        }
        else {
            // EIther a directory or file. Check existence or add to the structure.
            if (args[0] === "dir") {
                var directoryName = args[1];
                if (!currentWorkingDirectory.children[directoryName]) {
                    currentWorkingDirectory.children[directoryName] = {
                        name: directoryName,
                        parent: currentWorkingDirectory,
                        children: {},
                        kind: "directory"
                    };
                }
            }
            else {
                var fileSize = args[0], fileName = args[1];
                if (!currentWorkingDirectory.children[fileName]) {
                    currentWorkingDirectory.children[fileName] = {
                        name: fileName,
                        parent: currentWorkingDirectory,
                        size: Number.parseInt(fileSize),
                        children: {},
                        kind: "file"
                    };
                }
            }
        }
    }
    return rootDirectory;
}
exports.buildDirectoryStructure = buildDirectoryStructure;
function populateDirectorySize(node) {
    var stack = [];
    // I want to do a post-order traversal to populate the size across the tree
    stack.push(node);
    var visited = new Set();
    while (stack.length > 0) {
        // Post order to populate?
        // TODO: How do I get rid of annoying "may be undefined" errors?
        var current = stack.pop();
        switch (current.kind) {
            case "directory":
                var children = Object.values(current.children);
                var visitedChildren = 0;
                // To do a postorder, we only mark a node as visited if all it's children are visted.
                for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
                    var child = children_1[_i];
                    if (visited.has(child)) {
                        visitedChildren += 1;
                    }
                }
                if (children.length === visitedChildren) {
                    // Sum all the kids, add node to visited.
                    var totalSizeOfSubDirectories = children.map(function (child) { return child.size ? child.size : 0; }).reduce(function (accumulator, value) { return accumulator + value; }, 0);
                    current.size = totalSizeOfSubDirectories;
                    visited.add(current);
                    console.log(current.name);
                }
                else {
                    stack.push(current);
                    for (var _a = 0, children_2 = children; _a < children_2.length; _a++) {
                        var child = children_2[_a];
                        stack.push(child);
                    }
                }
                break;
            case "file":
                visited.add(current);
                console.log(current.name);
                break;
            default:
                throw new Error("Unrecognized type: " + current.kind);
        }
    }
}
exports.populateDirectorySize = populateDirectorySize;
function findAll(predicate, root) {
    var stack = [];
    stack.push(root);
    var result = [];
    while (stack.length > 0) {
        var current = stack.pop();
        if (predicate(current)) {
            result.push(current);
        }
        if (current.kind === "directory") {
            var children = Object.values(current.children);
            for (var _i = 0, children_3 = children; _i < children_3.length; _i++) {
                var child = children_3[_i];
                stack.push(child);
            }
        }
    }
    return result;
}
exports.findAll = findAll;
var myNode = {
    name: "",
    size: 2,
    kind: "directory",
    children: {}
};
function hasLessThan100kSize(treeNode) {
    if (!treeNode.size) {
        return false;
    }
    else {
        return treeNode.kind === "directory" && treeNode.size < 100000;
    }
}
//findAll(hasLessThan100kSize, myNode);
function createRootDirectory() {
    return {
        name: "",
        children: {},
        kind: "directory"
    };
}
