"use strict";
exports.__esModule = true;
exports.executeCommand = exports.fromInputString = void 0;
var fs = require('fs');
var cargo = {
    1: ["P", "F", "M", "Q", "W", "G", "R", "T"],
    2: ["R", "F", "H"],
    3: ["P", "Z", "R", "V", "G", "H", "S", "D"],
    4: ["Q", "H", "P", "B", "F", "W", "G"],
    5: ["P", "S", "M", "J", "H"],
    6: ["M", "Z", "T", "H", "S", "R", "P", "L"],
    7: ["P", "T", "H", "N", "M", "L"],
    8: ["F", "D", "Q", "R"],
    9: ["D", "S", "C", "N", "L", "P", "H"]
};
function fromInputString(commandInWords) {
    var splitOnSpaces = commandInWords.split(" ");
    var numOfCratesToMove = Number.parseInt(splitOnSpaces[1]);
    var fromColumn = Number.parseInt(splitOnSpaces[3]);
    var toColumn = Number.parseInt(splitOnSpaces[5]);
    var command = {
        to: toColumn,
        from: fromColumn,
        numberOfCratesToMove: numOfCratesToMove
    };
    return command;
}
exports.fromInputString = fromInputString;
function executeCommand(command, ship) {
    var fromColumn = ship[command.from];
    var toColumn = ship[command.to];
    for (var i = 0; i < command.numberOfCratesToMove; i++) {
        var popped = fromColumn.pop();
        if (popped) {
            toColumn.push(popped);
        }
    }
}
exports.executeCommand = executeCommand;
// Question solution
fs.readFile("input.txt", "utf-8", function read(err, data) {
    if (err) {
        throw err;
    }
    var commands = data.split("\n");
    commands.map(function (command) { return fromInputString(command); })
        .forEach(function (command) {
        executeCommand(command, cargo);
    });
    console.log(cargo);
});
