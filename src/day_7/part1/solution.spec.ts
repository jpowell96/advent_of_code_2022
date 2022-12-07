import { buildDirectoryStructure, TreeNode } from "./solution";

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
    children : {
        "test" : {
            children: {
                
                    "other" : {
                        children : {
                            "e" : {
                                children: {}
                            },
                            "file.txt" : {
                                children: {},
                                size: 1234
                            }
                        }
                    }
                
            }
        }
    }
 }

 const result : TreeNode = buildDirectoryStructure(commands);
 expect(result).toEqual(expected);
});


