"use strict";
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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
exports.__esModule = true;
var promises_1 = require("fs").promises;
console.log(process.version); // 'v10.16.3'
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
var opponentWeaknesses = new Map();
// Rock (A) is weak to Paper (Y)
opponentWeaknesses.set("A", "Y");
// Paper (B) is weak to Scissors (Z)
opponentWeaknesses.set("B", "Z");
// Scissors (C) is weak to Rock (X)
opponentWeaknesses.set("C", "X");
var playerWeaknesses = new Map();
// Rock (A) beats Scissors (Z)
playerWeaknesses.set("A", "Z");
// Paper (B) beats Rock (X)
playerWeaknesses.set("B", "X");
// Scissors (C) beats Paper (Y)
playerWeaknesses.set("C", "Y");
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
function doTheThing(fileName) {
    var _a, e_1, _b, _c;
    return __awaiter(this, void 0, void 0, function () {
        var filehandle, totalScore, _d, _e, _f, game, _g, opponentChoice, playerChoice, scoreForRound, e_1_1;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    totalScore = 0;
                    _h.label = 1;
                case 1:
                    _h.trys.push([1, , 15, 17]);
                    return [4 /*yield*/, (0, promises_1.open)(fileName, 'r')];
                case 2:
                    filehandle = _h.sent();
                    _h.label = 3;
                case 3:
                    _h.trys.push([3, 8, 9, 14]);
                    _d = true, _e = __asyncValues(filehandle.readLines());
                    _h.label = 4;
                case 4: return [4 /*yield*/, _e.next()];
                case 5:
                    if (!(_f = _h.sent(), _a = _f.done, !_a)) return [3 /*break*/, 7];
                    _c = _f.value;
                    _d = false;
                    try {
                        game = _c;
                        _g = game.split(" "), opponentChoice = _g[0], playerChoice = _g[1];
                        scoreForRound = riggedRockPaperScissors(opponentChoice, playerChoice);
                        totalScore += scoreForRound;
                    }
                    finally {
                        _d = true;
                    }
                    _h.label = 6;
                case 6: return [3 /*break*/, 4];
                case 7: return [3 /*break*/, 14];
                case 8:
                    e_1_1 = _h.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 14];
                case 9:
                    _h.trys.push([9, , 12, 13]);
                    if (!(!_d && !_a && (_b = _e["return"]))) return [3 /*break*/, 11];
                    return [4 /*yield*/, _b.call(_e)];
                case 10:
                    _h.sent();
                    _h.label = 11;
                case 11: return [3 /*break*/, 13];
                case 12:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 13: return [7 /*endfinally*/];
                case 14:
                    console.log("Final Score ".concat(totalScore));
                    return [3 /*break*/, 17];
                case 15: return [4 /*yield*/, (filehandle === null || filehandle === void 0 ? void 0 : filehandle.close())];
                case 16:
                    _h.sent();
                    return [7 /*endfinally*/];
                case 17: return [2 /*return*/];
            }
        });
    });
}
function riggedRockPaperScissors(opponentChoice, playerChoice) {
    if (playerChoice === "X") {
        // We want to win the game. Find the weakness
        var opponentWeakness = opponentWeaknesses.get(opponentChoice);
        return WIN + choiceToPointValue.get(opponentWeakness);
    }
    else if (playerChoice === "Y") {
        // We want to draw Find the equivalent sign and add the point value
        var equivalentSignForPlayer = opponentToPlayerSigns.get(opponentChoice);
        return DRAW + choiceToPointValue.get(equivalentSignForPlayer);
    }
    else {
        return LOSS;
    }
}
doTheThing("sample_input.txt");
