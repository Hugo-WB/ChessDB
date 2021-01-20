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
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const PgnMentor_1 = require("./Scraper/PgnMentor");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const pool = new pg_1.Pool({
        user: "ChessDB",
        host: "localhost",
        database: "ChessDB",
        password: "ChessDBQL",
        port: 5432,
    });
    PgnMentor_1.getPlayers();
});
main();
//# sourceMappingURL=index.js.map