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
exports.parseAndUploadFolder = void 0;
const PgnParser_1 = require("./PgnParser/PgnParser");
const cli_progress_1 = __importDefault(require("cli-progress"));
const fs_1 = __importDefault(require("fs"));
const GraphQL_1 = require("./GraphQL");
let parseAndUploadFolder = (folderPath, client) => __awaiter(void 0, void 0, void 0, function* () {
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
        games = yield PgnParser_1.parsePGN(folderPath + files[i]);
        let x, j, temparray, chunk = 100;
        for (x = 0, j = games.length; x < j; x += chunk) {
            temparray = games.slice(x, x + chunk);
            yield GraphQL_1.uploadPGNs(temparray, client);
        }
        console.log("\nFinished uploading " +
            games.length.toString() +
            " games from file:" +
            files[i] + "\n");
        bar.update(i);
    }
    bar.stop();
    return games;
});
exports.parseAndUploadFolder = parseAndUploadFolder;
//# sourceMappingURL=ParseAndUpload.js.map