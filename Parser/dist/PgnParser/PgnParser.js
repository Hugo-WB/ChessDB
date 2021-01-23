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
exports.parseFolderPGNS = exports.parsePGN = void 0;
const fs_1 = __importDefault(require("fs"));
const readline_1 = __importDefault(require("readline"));
const pgn_parser_1 = __importDefault(require("pgn-parser"));
const cli_progress_1 = __importDefault(require("cli-progress"));
let parseFolderPGNS = (folderPath, func) => __awaiter(void 0, void 0, void 0, function* () {
    let games = [];
    let files = [];
    fs_1.default.readdirSync(folderPath).forEach((file) => {
        if (/.+\.pgn/.test(file)) {
            files.push(file);
        }
    });
    const bar = new cli_progress_1.default.SingleBar({}, cli_progress_1.default.Presets.shades_grey);
    bar.start(files.length, 0);
    for (let i = 0; i < files.length; i++) {
        games = games.concat(yield parsePGN(folderPath + files[i]));
        bar.update(i);
    }
    bar.stop();
    return games;
});
exports.parseFolderPGNS = parseFolderPGNS;
const getReadLine = (filePath) => {
    return readline_1.default.createInterface({
        input: fs_1.default.createReadStream(filePath),
    });
};
const parseSinglePGN = (pgn) => {
    try {
        let parsed = pgn_parser_1.default.parse(pgn)[0];
        let game = {
            pgn: pgn,
            blackMoves: [],
            whiteMoves: [],
            black: "",
            blackElo: 0,
            date: "",
            eco: "",
            result: "",
            white: "",
            whiteElo: 0,
        };
        game.pgn = pgn;
        for (let i = 0; i < parsed.moves.length; i++) {
            if (i % 2 === 0) {
                game.whiteMoves.push(parsed.moves[i].move);
            }
            else {
                game.blackMoves.push(parsed.moves[i].move);
            }
        }
        parsed.headers.forEach((header) => {
            switch (header.name) {
                case "Date":
                    game.date = header.value;
                    break;
                case "White":
                    game.white = header.value;
                    break;
                case "Black":
                    game.black = header.value;
                    break;
                case "Result":
                    game.result = header.value;
                    break;
                case "WhiteElo":
                    game.whiteElo = parseInt(header.value);
                    break;
                case "BlackElo":
                    game.blackElo = parseInt(header.value);
                    break;
                default:
                    break;
            }
        });
        return game;
    }
    catch (error) {
        return undefined;
    }
    return undefined;
};
const parsePGN = (filePath) => __awaiter(void 0, void 0, void 0, function* () {
    var e_1, _a;
    let games = [];
    const tagReg = new RegExp(/\[.+\]/);
    let lines = getReadLine(filePath);
    let currentGame = "";
    let currentStatus = "tag";
    try {
        for (var lines_1 = __asyncValues(lines), lines_1_1; lines_1_1 = yield lines_1.next(), !lines_1_1.done;) {
            const line = lines_1_1.value;
            if (tagReg.test(line)) {
                if (currentStatus == "game") {
                    let parsedGame = parseSinglePGN(currentGame);
                    if (parsedGame != undefined) {
                        games.push(parsedGame);
                    }
                    currentGame = "";
                    currentStatus = "tag";
                }
            }
            else if (line === "") {
            }
            else {
                currentStatus = "game";
            }
            currentGame += line;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (lines_1_1 && !lines_1_1.done && (_a = lines_1.return)) yield _a.call(lines_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    let parsedGame = parseSinglePGN(currentGame);
    if (parsedGame != null) {
        games.push(parsedGame);
    }
    return games;
});
exports.parsePGN = parsePGN;
//# sourceMappingURL=PgnParser.js.map