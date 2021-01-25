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
exports.PlayerResovler = void 0;
const Player_1 = require("../entities/Player");
const type_graphql_1 = require("type-graphql");
let PlayerResponse = class PlayerResponse {
};
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], PlayerResponse.prototype, "error", void 0);
__decorate([
    type_graphql_1.Field(() => [Player_1.Player], { nullable: true }),
    __metadata("design:type", Array)
], PlayerResponse.prototype, "players", void 0);
PlayerResponse = __decorate([
    type_graphql_1.ObjectType()
], PlayerResponse);
let PlayerResovler = class PlayerResovler {
    players(id, name, limit, offset, { em }) {
        return __awaiter(this, void 0, void 0, function* () {
            let results = yield em
                .createQueryBuilder(Player_1.Player)
                .getKnexQuery()
                .where(Object.assign({}, id === undefined ? null : { id }, name === undefined ? null : { name }))
                .orderBy("rating", "desc")
                .offset(offset !== null && offset !== void 0 ? offset : 0)
                .limit(Math.min(limit, 30));
            let players = results.map((player) => em.map(Player_1.Player, player));
            console.log;
            return players;
        });
    }
    createPlayer(name, rating, { em }) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const player = em.create(Player_1.Player, {
                    name: name,
                    rating: rating,
                });
                yield em.persistAndFlush(player);
                return { players: [player] };
            }
            catch (error) {
                if ((_a = error === null || error === void 0 ? void 0 : error.detail) === null || _a === void 0 ? void 0 : _a.includes("already exists")) {
                    return { error: "This player already exists in the database" };
                }
                console.log(error);
                return { error: error };
            }
        });
    }
    updatePlayer(id, name, rating, { em }) {
        return __awaiter(this, void 0, void 0, function* () {
            const player = yield em.findOne(Player_1.Player, { id });
            if (!player) {
                return null;
            }
            player.name = name;
            player.rating = rating;
            yield em.persistAndFlush(player);
            return player;
        });
    }
    deletePlayer(id, { em }) {
        return __awaiter(this, void 0, void 0, function* () {
            let player = yield em.findOne(Player_1.Player, { id });
            if (!player) {
                return null;
            }
            yield em.nativeDelete(Player_1.Player, { id });
            return player;
        });
    }
};
__decorate([
    type_graphql_1.Query(() => [Player_1.Player]),
    __param(0, type_graphql_1.Arg("id", () => type_graphql_1.Int, { nullable: true })),
    __param(1, type_graphql_1.Arg("name", { nullable: true })),
    __param(2, type_graphql_1.Arg("limit", () => type_graphql_1.Int, { nullable: true, defaultValue: 20 })),
    __param(3, type_graphql_1.Arg("offset", () => type_graphql_1.Int, { nullable: true })),
    __param(4, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Number, Number, Object]),
    __metadata("design:returntype", Promise)
], PlayerResovler.prototype, "players", null);
__decorate([
    type_graphql_1.Mutation(() => PlayerResponse, { nullable: true }),
    __param(0, type_graphql_1.Arg("name")),
    __param(1, type_graphql_1.Arg("rating", () => type_graphql_1.Int, { nullable: true, defaultValue: 0 })),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Object]),
    __metadata("design:returntype", Promise)
], PlayerResovler.prototype, "createPlayer", null);
__decorate([
    type_graphql_1.Mutation(() => Player_1.Player, { nullable: true }),
    __param(0, type_graphql_1.Arg("id", () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Arg("name")),
    __param(2, type_graphql_1.Arg("rating", () => type_graphql_1.Int)),
    __param(3, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Number, Object]),
    __metadata("design:returntype", Promise)
], PlayerResovler.prototype, "updatePlayer", null);
__decorate([
    type_graphql_1.Mutation(() => Player_1.Player, { nullable: true }),
    __param(0, type_graphql_1.Arg("id", () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], PlayerResovler.prototype, "deletePlayer", null);
PlayerResovler = __decorate([
    type_graphql_1.Resolver()
], PlayerResovler);
exports.PlayerResovler = PlayerResovler;
//# sourceMappingURL=PlayerResolver.js.map