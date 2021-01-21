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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadPGN = exports.parseFolderPGNS = void 0;
const fs_1 = __importDefault(require("fs"));
const PgnParser_1 = require("./PgnParser/PgnParser");
const cli_progress_1 = __importDefault(require("cli-progress"));
let parseFolderPGNS = (folderPath, func) => __awaiter(void 0, void 0, void 0, function* () {
    let games = [];
    let files = [];
    fs_1.default.readdirSync(folderPath).forEach((file) => {
        files.push(file);
    });
    const bar = new cli_progress_1.default.SingleBar({}, cli_progress_1.default.Presets.shades_grey);
    bar.start(files.length, 0);
    for (let i = 0; i < files.length; i++) {
        games = games.concat(yield PgnParser_1.parsePGN(folderPath + files[i], func));
        bar.update(i);
    }
    bar.stop();
    return games;
});
exports.parseFolderPGNS = parseFolderPGNS;
let uploadPGN = (pgn) => __awaiter(void 0, void 0, void 0, function* () { });
exports.uploadPGN = uploadPGN;
//# sourceMappingURL=Sql.js.map