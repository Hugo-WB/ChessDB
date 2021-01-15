"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Game_1 = require("./entities/Game");
const Player_1 = require("./entities/Player");
const constants_1 = require("./constants");
const path_1 = __importDefault(require("path"));
const config = {
    entities: [Game_1.Game, Player_1.Player],
    dbName: "ChessDB",
    type: "postgresql",
    debug: !constants_1.__prod__,
    user: "ChessDB",
    password: "ChessDBQL",
    migrations: {
        path: path_1.default.join(__dirname, "./migrations"),
        pattern: /^[\w-]+\d+\.[jt]s$/,
    },
};
exports.default = config;
//# sourceMappingURL=mikro-orm.config.js.map