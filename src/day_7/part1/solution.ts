
export interface TreeNode {
    parent?: TreeNode,
    name?: string,
    size?: number,
    children : {[name: string] : TreeNode};
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
                            children : {}
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
                        children: {}
                    }
                }
            }
        }
    }

    return rootDirectory;
}

export function populateDirectorySize(node: TreeNode) : void {

}

function createRootDirectory() : TreeNode {
   return {
        name: "",
        children: {}
    };
}