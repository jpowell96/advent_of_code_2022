var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var fs = require('fs');
/**
 * Opponent Choice
 * Rock => A
 * Paper => B
 * Scissors => C
 *
 * Your choices
 * X => Rock
 * Y => Paper
 * Z => Scissors
 *
 */
var choiceToPointValue = new Map();
choiceToPointValue.set("X", 1);
choiceToPointValue.set("Y", 2);
choiceToPointValue.set("Z", 3);
var opponentToPointValue = new Map();
choiceToPointValue.set("A", 1);
choiceToPointValue.set("B", 2);
choiceToPointValue.set("C", 3);
var opponentWeaknesToPointValue = new Map();
// Rock (A) is weak to Paper (Y)
opponentWeaknesToPointValue.set("A", 2);
// Paper (B) is weak to Scissors (Z)
opponentWeaknesToPointValue.set("B", 3);
// Scissors (C) is weak to Rock (X)
opponentWeaknesToPointValue.set("C", 1);
var playerWeaknesses = new Map();
// Rock (A) beats Scissors (Z)
playerWeaknesses.set("A", 3);
// Paper (B) beats Rock (X)
playerWeaknesses.set("B", 1);
// Scissors (C) beats Paper (Y)
playerWeaknesses.set("C", 2);
var opponentToPlayerSigns = new Map();
// Rock
opponentToPlayerSigns.set("A", "X");
// Paper
opponentToPlayerSigns.set("B", "Y");
// Scissors
opponentToPlayerSigns.set("C", "Z");
var WIN = 6;
var DRAW = 3;
var LOSS = 0;
// 1. Read in file, split on new line
function doTheThing(filePath) {
    return __awaiter(this, void 0, void 0, function () {
        var totalScore;
        return __generator(this, function (_a) {
            totalScore = 0;
            fs.readFile(filePath, "utf-8", function read(err, data) {
                if (err) {
                    throw err;
                }
                var games = data.split("\n");
                for (var _i = 0, games_1 = games; _i < games_1.length; _i++) {
                    var game = games_1[_i];
                    var _a = game.split(" "), opponentChoice = _a[0], playerChoice = _a[1];
                    var scoreForRound = riggedRockPaperScissors(opponentChoice, playerChoice);
                    totalScore += scoreForRound;
                }
                console.log("Final Score is %d", totalScore);
            });
            return [2 /*return*/];
        });
    });
}
function riggedRockPaperScissors(opponentChoice, playerChoice) {
    if (playerChoice === "Z") {
        // We want to win the game. Find the weakness
        var opponentWeakness = opponentWeaknesToPointValue.get(opponentChoice);
        return WIN + opponentWeakness;
    }
    else if (playerChoice === "Y") {
        // We want to draw Find the equivalent sign and add the point value
        var equivalentSignForPlayer = opponentToPlayerSigns.get(opponentChoice);
        return DRAW + opponentToPointValue.get(opponentChoice);
    }
    else {
        return LOSS + playerWeaknesses.get(opponentChoice);
    }
}
doTheThing("sample_input.txt");
