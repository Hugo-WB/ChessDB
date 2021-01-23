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
exports.extractZip = exports.downloadZip = void 0;
const fs_1 = __importDefault(require("fs"));
const extract_zip_1 = __importDefault(require("extract-zip"));
const path_1 = require("path");
const node_fetch_1 = __importDefault(require("node-fetch"));
let downloadZip = (url, path) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let fileStream = fs_1.default.createWriteStream(path);
        const request = yield node_fetch_1.default(url);
        request.body.pipe(fileStream);
        return new Promise((resolve) => {
            fileStream.on("finish", () => {
                fileStream.close();
                resolve(path);
            });
        });
    }
    catch (error) {
        console.log(error);
        return "";
    }
});
exports.downloadZip = downloadZip;
let extractZip = (zipPath, outDir) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield extract_zip_1.default(zipPath, { dir: path_1.resolve(outDir) });
        yield fs_1.default.unlinkSync(zipPath);
    }
    catch (error) {
        console.log(error);
    }
});
exports.extractZip = extractZip;
//# sourceMappingURL=Zips.js.map