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
exports.Migration20210123151937 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20210123151937 extends migrations_1.Migration {
    up() {
        return __awaiter(this, void 0, void 0, function* () {
            this.addSql('alter table "player" drop constraint if exists "player_rating_check";');
            this.addSql('alter table "player" alter column "rating" type int4 using ("rating"::int4);');
            this.addSql('alter table "player" alter column "rating" drop not null;');
            this.addSql('alter table "player" drop constraint "player_name_unique";');
        });
    }
}
exports.Migration20210123151937 = Migration20210123151937;
//# sourceMappingURL=Migration20210123151937.js.map