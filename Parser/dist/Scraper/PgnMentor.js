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
exports.getPlayers = void 0;
const Zips_1 = require("../Zips");
const Requests_1 = require("../Requests");
const cli_progress_1 = __importDefault(require("cli-progress"));
let getPlayers = () => __awaiter(void 0, void 0, void 0, function* () {
    let playerZipsSet = new Set();
    let $ = yield Requests_1.getLinkCheerio("https://www.pgnmentor.com/files.html");
    let links = $("body > div:nth-child(1) > table:nth-child(9)").find("a");
    links.each((_, link) => {
        let href = $(link).attr("href");
        if (href === null || href === void 0 ? void 0 : href.includes(".zip")) {
            playerZipsSet.add(href);
        }
    });
    let playerZips = Array.from(playerZipsSet);
    console.log(playerZips);
    const bar = new cli_progress_1.default.SingleBar({ clearOnComplete: true, hideCursor: true }, cli_progress_1.default.Presets.shades_grey);
    bar.start(playerZips.length, 0);
    playerZips.forEach((playerZip) => __awaiter(void 0, void 0, void 0, function* () {
        let path = yield Zips_1.downloadZip("http://www.pgnmentor.com/" + playerZip, "./assets/PgnMentor/" + playerZip);
        yield Zips_1.extractZip(path, "./assets/PgnMentor/Players");
        bar.increment();
    }));
    console.log("DONE");
});
exports.getPlayers = getPlayers;
//# sourceMappingURL=PgnMentor.js.map