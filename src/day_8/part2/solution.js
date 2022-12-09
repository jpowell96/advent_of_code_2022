"use strict";
exports.__esModule = true;
exports.calculateRowScenicScore = exports.calculateColumnScenicScore = exports.calculateScenicScore = void 0;
var fs = require("fs");
fs.readFile("../input.txt", "utf-8", function read(err, data) {
    if (err) {
        throw err;
    }
    var rows = data.split("\n");
    var forest = [];
    for (var _i = 0, rows_1 = rows; _i < rows_1.length; _i++) {
        var rowString = rows_1[_i];
        var forestRow = [];
        for (var idx = 0; idx < rowString.length; idx++) {
            forestRow.push(Number.parseInt(rowString.charAt(idx)));
        }
        forest.push(forestRow);
    }
    var result = calculateScenicScore(forest);
    console.log(Math.max.apply(Math, result.flatMap(function (x) { return x; })));
});
function calculateScenicScore(forest) {
    var sceneScores = [];
    for (var row = 0; row < forest.length; row++) {
        var scores = [];
        for (var column = 0; column < forest[row].length; column++) {
            var rowSceneScore = calculateRowScenicScore(row, column, forest);
            var columnSceneScore = calculateColumnScenicScore(row, column, forest);
            var scenicScore = rowSceneScore * columnSceneScore;
            scores.push(scenicScore);
        }
        sceneScores.push(scores);
    }
    return sceneScores;
}
exports.calculateScenicScore = calculateScenicScore;
function calculateColumnScenicScore(treeRow, treeColumn, forest) {
    var treeHeight = forest[treeRow][treeColumn];
    var upScore = 0;
    for (var row = 0; row < treeRow; row++) {
        var otherTreeHeight = forest[row][treeColumn];
        upScore += 1;
        if (otherTreeHeight >= treeHeight) {
            break;
        }
    }
    var downScore = 0;
    for (var row = treeRow + 1; row < forest.length; row++) {
        var otherTreeHeight = forest[row][treeColumn];
        downScore += 1;
        if (otherTreeHeight >= treeHeight) {
            break;
        }
    }
    return upScore * downScore;
}
exports.calculateColumnScenicScore = calculateColumnScenicScore;
function calculateRowScenicScore(treeRow, treeColumn, forest) {
    var treeHeight = forest[treeRow][treeColumn];
    var leftScore = 0;
    for (var column = 0; column < treeColumn; column++) {
        var otherTreeHeight = forest[treeRow][column];
        leftScore += 1;
        if (otherTreeHeight >= treeHeight) {
            break;
        }
    }
    var rightScore = 0;
    for (var column = treeColumn + 1; column < forest[0].length; column++) {
        var otherTreeHeight = forest[treeRow][column];
        rightScore += 1;
        if (otherTreeHeight >= treeHeight) {
            break;
        }
    }
    return leftScore * rightScore;
}
exports.calculateRowScenicScore = calculateRowScenicScore;
