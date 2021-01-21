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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = exports.parsePGN = void 0;
const fs_1 = __importDefault(require("fs"));
const readline_1 = __importDefault(require("readline"));
const pgn_parser_1 = __importDefault(require("pgn-parser"));
class Game {
    constructor() {
        this.pgn = "";
        this.event = "";
        this.site = "";
        this.date = "";
        this.round = "";
        this.white = "";
        this.black = "";
        this.result = "";
        this.whiteMoves = [];
        this.blackMoves = [];
        this.getSeperatedMoves = () => {
            try {
                let parsed = pgn_parser_1.default.parse(this.pgn)[0];
                if (parsed.moves == undefined) {
                    return;
                }
                if (parsed.moves.length == undefined || parsed.moves == undefined) {
                    return;
                }
                for (let i = 0; i < parsed.moves.length; i++) {
                    if (i % 2 === 0) {
                        this.whiteMoves.push(parsed.moves[i].move);
                    }
                    else {
                        this.blackMoves.push(parsed.moves[i].move);
                    }
                }
                return [this.whiteMoves, this.blackMoves];
            }
            catch (error) { }
        };
    }
}
exports.Game = Game;
const getReadLine = (filePath) => {
    return readline_1.default.createInterface({
        input: fs_1.default.createReadStream(filePath),
    });
};
const parsePGN = (filePath, func) => __awaiter(void 0, void 0, void 0, function* () {
    var e_1, _a;
    const tagReg = new RegExp(/\[.+\]/);
    let lines = getReadLine(filePath);
    let games = [];
    let currentGame = new Game();
    let currentStatus = "tag";
    try {
        for (var lines_1 = __asyncValues(lines), lines_1_1; lines_1_1 = yield lines_1.next(), !lines_1_1.done;) {
            const line = lines_1_1.value;
            if (tagReg.test(line)) {
                if (currentStatus == "game") {
                    games.push(currentGame);
                    currentGame = new Game();
                    currentStatus = "tag";
                }
            }
            else if (line === "") {
            }
            else {
                currentStatus = "game";
            }
            currentGame.pgn += line;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (lines_1_1 && !lines_1_1.done && (_a = lines_1.return)) yield _a.call(lines_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    if (func) {
        func(currentGame);
    }
    games.push(currentGame);
    return games;
});
exports.parsePGN = parsePGN;
//# sourceMappingURL=PgnParser.js.map