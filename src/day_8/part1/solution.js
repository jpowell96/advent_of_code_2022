"use strict";
exports.__esModule = true;
exports.isVisibleInRow = exports.isVisibleInColumn = exports.isOnTheEdgeOfForest = exports.countVisibleTrees = void 0;
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
    console.log(countVisibleTrees(forest));
});
// Run time is size of table * work done in each cell
// size of table = row * column
// work done in each cell = (r + c)
// (rc) * (r + c)
function countVisibleTrees(forest) {
    var visibleTrees = 0;
    for (var row = 0; row < forest.length; row++) {
        for (var column = 0; column < forest[row].length; column++) {
            // If the element is at the edge, it's visible
            if (isOnTheEdgeOfForest(row, forest, column)) {
                visibleTrees += 1;
            }
            else {
                // Check if it's visible up down left right
                if (isVisibleInColumn(row, column, forest) || isVisibleInRow(row, column, forest)) {
                    visibleTrees += 1;
                }
            }
        }
    }
    return visibleTrees;
}
exports.countVisibleTrees = countVisibleTrees;
function isOnTheEdgeOfForest(row, forest, column) {
    return row === 0 || row === forest.length - 1 || column === 0 || column === forest[row].length - 1;
}
exports.isOnTheEdgeOfForest = isOnTheEdgeOfForest;
function isVisibleInColumn(treeRow, treeColumn, forest) {
    var treeHeight = forest[treeRow][treeColumn];
    var isVisibleFromUp = true;
    for (var row = 0; row < treeRow; row++) {
        var otherTreeHeight = forest[row][treeColumn];
        if (otherTreeHeight >= treeHeight) {
            isVisibleFromUp = false;
            break;
        }
    }
    var isVisibleFromDown = true;
    for (var row = treeRow + 1; row < forest.length; row++) {
        var otherTreeHeight = forest[row][treeColumn];
        if (otherTreeHeight >= treeHeight) {
            isVisibleFromDown = false;
            break;
        }
    }
    return isVisibleFromUp || isVisibleFromDown;
}
exports.isVisibleInColumn = isVisibleInColumn;
function isVisibleInRow(treeRow, treeColumn, forest) {
    var treeHeight = forest[treeRow][treeColumn];
    var isVisibleFromLeft = true;
    for (var column = 0; column < treeColumn; column++) {
        var otherTreeHeight = forest[treeRow][column];
        if (otherTreeHeight >= treeHeight) {
            isVisibleFromLeft = false;
            break;
        }
    }
    var isVisibleFromRight = true;
    for (var column = treeColumn + 1; column < forest[0].length; column++) {
        var otherTreeHeight = forest[treeRow][column];
        if (otherTreeHeight >= treeHeight) {
            isVisibleFromRight = false;
            break;
        }
    }
    return isVisibleFromLeft || isVisibleFromRight;
}
exports.isVisibleInRow = isVisibleInRow;
