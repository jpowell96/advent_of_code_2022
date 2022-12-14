const fs = require("fs");

fs.readFile("../input.txt", "utf-8", function read(err, data) {
    if (err) {
        throw err;
    }
    const rows : string[] = data.split("\n");
    let forest: number[][] = [];

    for (const rowString of rows) {
        const forestRow : number[] = [];
        for (let idx = 0; idx < rowString.length; idx++) {
            forestRow.push(Number.parseInt(rowString.charAt(idx)));
        }
        forest.push(forestRow);
    }

    console.log(countVisibleTrees(forest));
});

// Run time is size of table * work done in each cell
// size of table = row * column
// work done in each cell = (r + c)
// (rc) * (r + c)
export function countVisibleTrees(forest: number[][]) : number {
    let visibleTrees = 0;
    for (let row = 0; row < forest.length; row++) {
        for (let column = 0; column < forest[row].length; column++) {
            // If the element is at the edge, it's visible
            if (isOnTheEdgeOfForest(row, forest, column)) {
                visibleTrees += 1;
            } else {
                // Check if it's visible up down left right
                if (isVisibleInColumn(row, column, forest) || isVisibleInRow(row, column, forest)) {
                    visibleTrees += 1;
                }
            }
        }
    }
    
    return visibleTrees;
}

export function isOnTheEdgeOfForest(row: number, forest: number[][], column: number) : boolean {
    return row === 0 || row === forest.length - 1 || column === 0 || column === forest[row].length - 1;
}

export function isVisibleInColumn(treeRow: number, treeColumn: number, forest: number[][]) : boolean {
    const treeHeight = forest[treeRow][treeColumn];
    let isVisibleFromUp : boolean = true;
       for (let row = 0; row < treeRow; row++) {
         const otherTreeHeight = forest[row][treeColumn];
         if (otherTreeHeight >= treeHeight) {
            isVisibleFromUp = false;
            break;
         }
    }

    let isVisibleFromDown : boolean = true;
        for (let row = treeRow + 1; row < forest.length; row++) {
          const otherTreeHeight = forest[row][treeColumn];
          if (otherTreeHeight >= treeHeight) {
             isVisibleFromDown = false;
             break;
          }
    
     }
 

    return isVisibleFromUp || isVisibleFromDown;
}

export function isVisibleInRow(treeRow: number, treeColumn: number, forest: number[][]) : boolean {
    const treeHeight = forest[treeRow][treeColumn];
    let isVisibleFromLeft : boolean = true;
    for (let column = 0; column < treeColumn; column++) {
        const otherTreeHeight = forest[treeRow][column];
        if (otherTreeHeight >= treeHeight) {
            isVisibleFromLeft = false;
            break;
        }   
    }
    let isVisibleFromRight : boolean = true;
    for (let column = treeColumn + 1; column < forest[0].length; column++) {
        const otherTreeHeight = forest[treeRow][column];
        if (otherTreeHeight >= treeHeight) {
            isVisibleFromRight = false;
            break;
        }   
    }
    return isVisibleFromLeft || isVisibleFromRight;
}   
