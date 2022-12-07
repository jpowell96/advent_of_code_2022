"use strict";
exports.__esModule = true;
exports.buildDirectoryStructure = void 0;
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
                            name: directoryToChangeTo,
                            children: {}
                        };
                        currentWorkingDirectory.children[directoryToChangeTo] = newDirectory;
                    }
                    currentWorkingDirectory = currentWorkingDirectory.children[directoryToChangeTo];
                }
            }
        }
        else {
        }
    }
    return rootDirectory;
}
exports.buildDirectoryStructure = buildDirectoryStructure;
function createRootDirectory() {
    return {
        name: "",
        children: {}
    };
}
