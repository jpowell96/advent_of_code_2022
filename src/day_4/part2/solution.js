"use strict";
exports.__esModule = true;
exports.overlaps = void 0;
var fs = require("fs");
var AssignmentPair = /** @class */ (function () {
    function AssignmentPair(input) {
        // 1. Split on comma to get left / right
        // ["2-4"], ["6-8"]
        var _a = input.split(","), left = _a[0], right = _a[1];
        var leftAssignment = left.split("-");
        this.left = [Number.parseInt(leftAssignment[0]), Number.parseInt(leftAssignment[1])];
        var rightAssignment = right.split("-");
        this.right = [Number.parseInt(rightAssignment[0]), Number.parseInt(rightAssignment[1])];
    }
    return AssignmentPair;
}());
// Returns true if a overlaps b (left.0 <= right.0 && left.1 >= right.1)
// [6,8], [2,4]
// 6 <= 2 && 8 >= 2
// 6 <= 2 &&  8 >= 4
// [2, 4] [6,8]
function overlaps(left, right) {
    if (left[0] > right[0] && left[1] > right[1]) {
        return false;
    }
    // Case where left partially overlaps with right: [[2 , 5], [4,6]]
    return (left[0] <= right[0] && left[1] >= right[0]) ||
        // Case where right is a subset of left at the end point: [[2, 5] , [4,5]]
        // 2 <= 4 && 5 >= 5
        (left[0] <= right[0] && left[1] >= right[1]);
}
exports.overlaps = overlaps;
try {
    var data = fs.readFileSync('../input.txt', 'utf8');
    var assignmentPairs = data.split("\n");
    var numberOfOverlaps = assignmentPairs
        .map(function (assignmentPair) { return new AssignmentPair(assignmentPair); })
        .map(function (pair) { return overlaps(pair.left, pair.right) || overlaps(pair.right, pair.left); })
        .filter(function (doesOverlap) { return doesOverlap; })
        .length;
    console.log("We have %d overlaps", numberOfOverlaps);
}
catch (err) {
    console.error(err);
}
