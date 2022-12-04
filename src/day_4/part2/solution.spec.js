"use strict";
exports.__esModule = true;
var solution_1 = require("./solution");
describe("Overlap test cases", function () {
    test("two pairs sharing a single endpoint", function () {
        var left = [5, 7];
        var right = [7, 9];
        var result = (0, solution_1.overlaps)(left, right);
        expect(result).toBe(true);
    });
    test("two pairs where right is a subset of left", function () {
        var left = [2, 8];
        var right = [3, 7];
        var result = (0, solution_1.overlaps)(left, right);
        expect(result).toBe(true);
    });
    test("two pars where right is a single point and a subset of left", function () {
        var left = [4, 6];
        var right = [6, 6];
        var result = (0, solution_1.overlaps)(left, right);
        expect(result).toBe(true);
    });
    test("Two pairs that overlap", function () {
        var left = [2, 6];
        var right = [4, 8];
        expect((0, solution_1.overlaps)(left, right)).toBe(true);
    });
});
