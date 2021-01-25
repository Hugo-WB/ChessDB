"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Game_1 = require("./entities/Game");
const Player_1 = require("./entities/Player");
const constants_1 = require("./constants");
const path_1 = __importDefault(require("path"));
const User_1 = require("./entities/User");
const config = {
    entities: [Game_1.Game, Player_1.Player, User_1.User],
    dbName: "ChessDB",
    type: "postgresql",
    debug: !constants_1.__prod__,
    user: "chessdb",
    password: "ChessDBQL",
    migrations: {
        path: path_1.default.join(__dirname, "./migrations"),
        pattern: /^[\w-]+\d+\.[jt]s$/,
        dropTables: false,
    },
};
exports.default = config;
//# sourceMappingURL=mikro-orm.config.js.map