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
const core_1 = require("@mikro-orm/core");
const Game_1 = require("./entities/Game");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const orm = yield core_1.MikroORM.init({
        entities: [Game_1.Game],
        dbName: "ChessDB",
        user: "ChessDB",
        password: "ChessDBQL",
        type: "postgresql",
        debug: true,
    });
    const game = orm.em.create(Game_1.Game, { id: 1, pgn: "waguan" });
    yield orm.em.persistAndFlush(game);
});
main().catch((e) => console.log(e));
//# sourceMappingURL=index.js.map