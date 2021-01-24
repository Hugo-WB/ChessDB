"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.GameResovler = void 0;
const Game_1 = require("../entities/Game");
const type_graphql_1 = require("type-graphql");
const Player_1 = require("../entities/Player");
let GameResponse = class GameResponse {
};
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], GameResponse.prototype, "error", void 0);
__decorate([
    type_graphql_1.Field(() => [Game_1.Game], { nullable: true }),
    __metadata("design:type", Array)
], GameResponse.prototype, "games", void 0);
GameResponse = __decorate([
    type_graphql_1.ObjectType()
], GameResponse);
let GameResovler = class GameResovler {
    games(gameId, playerId, maxLength, minLength, opening, limit, offset, result, { em }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let results = yield em
                    .createQueryBuilder(Game_1.Game)
                    .getKnexQuery()
                    .orderBy("average_rating", "desc")
                    .where(Object.assign({}, gameId === undefined ? null : { id: gameId }, opening === undefined ? null : { opening: opening }, result === undefined ? null : { result: result }))
                    .andWhere((builder) => {
                    if (playerId) {
                        builder
                            .where({ white_id: playerId })
                            .orWhere({ black_id: playerId });
                    }
                    if (maxLength) {
                        builder.where("length", "<=", maxLength);
                    }
                    if (minLength) {
                        builder.where("length", ">=", minLength);
                    }
                })
                    .offset(offset !== null && offset !== void 0 ? offset : 0)
                    .limit(Math.min(limit, 50));
                let games = yield Promise.all(results.map((result) => __awaiter(this, void 0, void 0, function* () {
                    let game = em.map(Game_1.Game, result);
                    game.white = yield em.findOneOrFail(Player_1.Player, { id: game.white.id });
                    game.black = yield em.findOneOrFail(Player_1.Player, { id: game.black.id });
                    return game;
                })));
                console.log(games);
                return { games: games };
            }
            catch (error) {
                console.log(error);
                return { error: error };
            }
        });
    }
    createGame(pgn, whiteID, blackID, blackMoves, whiteMoves, opening, length, playDate, result, averageRating, { em }) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                averageRating = averageRating !== null && averageRating !== void 0 ? averageRating : 1;
                const whiteRef = em.getReference(Player_1.Player, whiteID);
                const blackRef = em.getReference(Player_1.Player, blackID);
                const game = em.create(Game_1.Game, {
                    pgn: pgn,
                    white: whiteRef,
                    black: blackRef,
                    blackMoves: blackMoves,
                    whiteMoves: whiteMoves,
                    opening: opening,
                    length: length,
                    playedAt: playDate,
                    result: result,
                    averageRating: averageRating,
                });
                yield em.persistAndFlush(game);
                return { games: [game] };
            }
            catch (error) {
                if ((_a = error === null || error === void 0 ? void 0 : error.detail) === null || _a === void 0 ? void 0 : _a.includes("already exists")) {
                    return { error: "This game already exists in the database" };
                }
                console.log(error);
                return { error: error };
            }
        });
    }
    updateGame(id, pgn, { em }) {
        return __awaiter(this, void 0, void 0, function* () {
            const game = yield em.findOne(Game_1.Game, { id });
            if (!game) {
                return null;
            }
            if (pgn) {
                game.pgn = pgn;
            }
            yield em.persistAndFlush(game);
            return game;
        });
    }
    deleteGame(id, { em }) {
        return __awaiter(this, void 0, void 0, function* () {
            let game = yield em.findOne(Game_1.Game, { id });
            if (!game) {
                return null;
            }
            yield em.nativeDelete(Game_1.Game, { id });
            return game;
        });
    }
};
__decorate([
    type_graphql_1.Query(() => GameResponse),
    __param(0, type_graphql_1.Arg("id", () => type_graphql_1.Int, { nullable: true })),
    __param(1, type_graphql_1.Arg("playerId", () => type_graphql_1.Int, { nullable: true })),
    __param(2, type_graphql_1.Arg("maxLength", () => type_graphql_1.Int, { nullable: true })),
    __param(3, type_graphql_1.Arg("minLength", () => type_graphql_1.Int, { nullable: true })),
    __param(4, type_graphql_1.Arg("opening", { nullable: true })),
    __param(5, type_graphql_1.Arg("limit", () => type_graphql_1.Int, { nullable: true, defaultValue: 20 })),
    __param(6, type_graphql_1.Arg("offset", () => type_graphql_1.Int, { nullable: true })),
    __param(7, type_graphql_1.Arg("result", () => String, { nullable: true })),
    __param(8, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number, Number, String, Number, Number, String, Object]),
    __metadata("design:returntype", Promise)
], GameResovler.prototype, "games", null);
__decorate([
    type_graphql_1.Mutation(() => GameResponse),
    __param(0, type_graphql_1.Arg("pgn")),
    __param(1, type_graphql_1.Arg("whiteID", () => type_graphql_1.Int)),
    __param(2, type_graphql_1.Arg("blackID", () => type_graphql_1.Int)),
    __param(3, type_graphql_1.Arg("blackMoves", () => [String])),
    __param(4, type_graphql_1.Arg("whiteMoves", () => [String])),
    __param(5, type_graphql_1.Arg("opening", () => String)),
    __param(6, type_graphql_1.Arg("length", () => type_graphql_1.Int)),
    __param(7, type_graphql_1.Arg("playDate", () => String)),
    __param(8, type_graphql_1.Arg("result", () => String)),
    __param(9, type_graphql_1.Arg("averageRating", () => type_graphql_1.Int, { nullable: true })),
    __param(10, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number, Array, Array, String, Number, String, String, Number, Object]),
    __metadata("design:returntype", Promise)
], GameResovler.prototype, "createGame", null);
__decorate([
    type_graphql_1.Mutation(() => Game_1.Game, { nullable: true }),
    __param(0, type_graphql_1.Arg("id")),
    __param(1, type_graphql_1.Arg("pgn", { nullable: true })),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Object]),
    __metadata("design:returntype", Promise)
], GameResovler.prototype, "updateGame", null);
__decorate([
    type_graphql_1.Mutation(() => Game_1.Game, { nullable: true }),
    __param(0, type_graphql_1.Arg("id")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], GameResovler.prototype, "deleteGame", null);
GameResovler = __decorate([
    type_graphql_1.Resolver(Game_1.Game)
], GameResovler);
exports.GameResovler = GameResovler;
//# sourceMappingURL=GameResolver.js.map