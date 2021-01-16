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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const core_1 = require("@mikro-orm/core");
const Game_1 = require("./Game");
let Player = class Player {
    constructor() {
        this.whiteGames = new core_1.Collection(this);
        this.blackGames = new core_1.Collection(this);
    }
};
__decorate([
    core_1.PrimaryKey(),
    __metadata("design:type", Number)
], Player.prototype, "id", void 0);
__decorate([
    core_1.Property({ type: "text" }),
    __metadata("design:type", String)
], Player.prototype, "name", void 0);
__decorate([
    core_1.OneToMany(() => Game_1.Game, game => game.white),
    __metadata("design:type", Object)
], Player.prototype, "whiteGames", void 0);
__decorate([
    core_1.OneToMany(() => Game_1.Game, game => game.black),
    __metadata("design:type", Object)
], Player.prototype, "blackGames", void 0);
__decorate([
    core_1.Property({ nullable: true }),
    __metadata("design:type", Number)
], Player.prototype, "rating", void 0);
__decorate([
    core_1.Property({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Player.prototype, "profile", void 0);
__decorate([
    core_1.Property({ nullable: true }),
    __metadata("design:type", Array)
], Player.prototype, "links", void 0);
Player = __decorate([
    core_1.Entity()
], Player);
exports.Player = Player;
//# sourceMappingURL=Player.js.map