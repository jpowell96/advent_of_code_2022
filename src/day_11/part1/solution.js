"use strict";
exports.__esModule = true;
exports.roundOfInspections = exports.idToMonkey = exports.Monkey = void 0;
var Monkey = /** @class */ (function () {
    function Monkey(id, items, stressFunction, test) {
        this.id = id;
        this.items = items;
        this.stressFunction = stressFunction;
        this.test = test;
    }
    /** For each item in items, inspect the item - applying the stressFunction */
    Monkey.prototype.inspect = function () {
        this.items = this.items.map(this.stressFunction);
    };
    Monkey.prototype.toss = function (monkeys) {
        // For each item, divide by 3. Then call test to decide who it goes to.
        this.items = this.items.map(function (num) { return Math.floor(num / 3); });
        while (this.items.length > 0) {
            var item = this.items.shift();
            var next = this.test(item);
            monkeys[next].items.push(item);
        }
    };
    return Monkey;
}());
exports.Monkey = Monkey;
var zero = new Monkey(0, [56, 56, 92, 65, 71, 61, 79], function (num) { return num * 7; }, function (num) { return num % 3 === 0 ? 3 : 7; });
var prime = new Monkey(1, [61, 85], function (num) { return num + 5; }, function (num) { return num % 11 ? 6 : 4; });
var duo = new Monkey(2, [54, 96, 82, 78, 69], function (num) { return num * num; }, function (num) { return num % 7 === 0 ? 0 : 7; });
var san = new Monkey(3, [57, 59, 65, 95], function (num) { return num + 4; }, function (num) { return num % 2 === 0 ? 5 : 1; });
var corto = new Monkey(4, [62, 67, 80], function (num) { return num * 17; }, function (num) { return num % 19 === 0 ? 2 : 6; });
var quintin = new Monkey(5, [91], function (num) { return num + 7; }, function (num) { return num % 5 === 0 ? 1 : 4; });
var sexto = new Monkey(6, [79, 83, 64, 52, 77, 56, 63, 92], function (num) { return num + 6; }, function (num) { return num % 17 === 0 ? 2 : 0; });
var septo = new Monkey(7, [50, 97, 76, 96, 80, 56], function (num) { return num + 3; }, function (num) { return num % 13 === 0 ? 3 : 5; });
exports.idToMonkey = {
    0: zero,
    1: prime,
    2: duo,
    3: san,
    4: corto,
    5: quintin,
    6: sexto,
    7: septo
};
// Divide worry level by 3
function roundOfInspections(monkeys, itemCount) {
    for (var key in monkeys) {
        var monkey = monkeys[key];
        // 1. Inspect items
        monkey.inspect();
        if (itemCount[monkey.id]) {
            itemCount[monkey.id] = itemCount[monkey.id] + monkey.items.length;
        }
        else {
            itemCount[monkey.id] = monkey.items.length;
        }
        // 2. Toss items to the next people
        monkey.toss(monkeys);
    }
    return itemCount;
}
exports.roundOfInspections = roundOfInspections;
var result = {};
var itemCount = {};
for (var i = 0; i < 20; i++) {
    result = roundOfInspections(exports.idToMonkey, itemCount);
}
console.log(result);
