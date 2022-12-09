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

    const result = calculateScenicScore(forest);
    console.log(Math.max(...result.flatMap(x => x)));


});

export function calculateScenicScore(forest: number[][]) : number[][] {
    const sceneScores : number[][] = [];

    for (let row = 0; row < forest.length; row++) {
        let scores = [];
        for (let column = 0; column < forest[row].length; column++) {
            const rowSceneScore = calculateRowScenicScore(row, column, forest);
            const columnSceneScore = calculateColumnScenicScore(row, column, forest);

           const scenicScore = rowSceneScore * columnSceneScore;
           scores.push(scenicScore);
        }
        sceneScores.push(scores);
    }
    
    return sceneScores;
}


export function calculateColumnScenicScore(treeRow: number, treeColumn: number, forest: number[][]) : number {
    const treeHeight = forest[treeRow][treeColumn];
    let upScore : number = 0;
       for (let row = 0; row < treeRow; row++) {
         const otherTreeHeight = forest[row][treeColumn];
         upScore += 1;
         if (otherTreeHeight >= treeHeight) {
            break;
         }
    }

    let downScore : number = 0;
        for (let row = treeRow + 1; row < forest.length; row++) {
          const otherTreeHeight = forest[row][treeColumn];
          downScore += 1;
          if (otherTreeHeight >= treeHeight) {
             break;
          }
    
     }
 

    return upScore * downScore;
}


export function calculateRowScenicScore(treeRow: number, treeColumn: number, forest: number[][]) : number {
    const treeHeight = forest[treeRow][treeColumn];
    let leftScore : number = 0;
    for (let column = 0; column < treeColumn; column++) {
        const otherTreeHeight = forest[treeRow][column];
        leftScore += 1;
        if (otherTreeHeight >= treeHeight) {
            break;
        }   
    }

    let rightScore : number = 0;
    for (let column = treeColumn + 1; column < forest[0].length; column++) {
        const otherTreeHeight = forest[treeRow][column];
        rightScore += 1;
        if (otherTreeHeight >= treeHeight) {
            break;
        }   
    }
    return leftScore * rightScore;
}   
