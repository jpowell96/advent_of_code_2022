import { buildDirectoryStructure, populateDirectorySize, TreeNode } from "./solution";

test("It reads in nested CD command", () => {
 const commands : Array<string> = [
    "$ cd test",
    "$ cd other",
    "$ ls",
    "dir e",
    "1234 file.txt"
 ];


 const expected : TreeNode = {
    name: "",
    kind: "directory",
    children : {
        "test" : {
            name: "test",
            kind: "directory",
            children: {
                
                    "other" : {
                        name: "other",
                        kind: "directory",
                        children : {
                            "e" : {
                                name: "e",
                                children: {},
                                kind: "directory"
                            },
                            "file.txt" : {
                                name: "file.txt",
                                children: {},
                                size: 1234,
                                kind: "file"
                            }
                        }
                    }
                
            }
        }
    }
 }

 const result : TreeNode = buildDirectoryStructure(commands);
});

test("It calcualates size correctly", () => {
    const root: TreeNode = {
        name: "",
        children: {},
        kind: "directory"
    };

    const child1File : TreeNode = {
        name: "file.txt",
        kind: "file",
        size: 10,
        parent: root,
        children: {}
    };

    const child2NestedFile : TreeNode = {
        name: "file2.txt",
        kind: "file",
        size: 20,
        parent: root,
        children: {}
    };

    const child2Dir : TreeNode = {
        name: "dirA",
        kind: "directory",
        parent: root,
        children: {
            "file2.txt" : child2NestedFile
        }
    };

    root.children = {
        "file.txt" : child1File,
        "dirA" : child2Dir
    }

    const result = populateDirectorySize(root);
    expect(result).toBeDefined();
});


