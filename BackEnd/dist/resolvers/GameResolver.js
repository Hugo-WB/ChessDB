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
let GameResovler = class GameResovler {
    games({ em }) {
        return em.find(Game_1.Game, {});
    }
    game(id, { em }) {
        return em.findOne(Game_1.Game, { id });
    }
    createGame(pgn, { em }) {
        return __awaiter(this, void 0, void 0, function* () {
            const game = em.create(Game_1.Game, { pgn: pgn });
            yield em.persistAndFlush(game);
            return game;
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
    type_graphql_1.Query(() => [Game_1.Game]),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GameResovler.prototype, "games", null);
__decorate([
    type_graphql_1.Query(() => Game_1.Game, { nullable: true }),
    __param(0, type_graphql_1.Arg("id")), __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], GameResovler.prototype, "game", null);
__decorate([
    type_graphql_1.Mutation(() => Game_1.Game),
    __param(0, type_graphql_1.Arg("pgn")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
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