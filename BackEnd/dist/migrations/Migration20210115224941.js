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
exports.Migration20210115224941 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20210115224941 extends migrations_1.Migration {
    up() {
        return __awaiter(this, void 0, void 0, function* () {
            this.addSql('alter table "player" add column "profile" text not null, add column "links" text[] not null;');
            this.addSql('alter table "game" add column "white_id" int4 not null, add column "black_id" int4 not null;');
            this.addSql('alter table "game" add constraint "game_white_id_foreign" foreign key ("white_id") references "player" ("id") on update cascade;');
            this.addSql('alter table "game" add constraint "game_black_id_foreign" foreign key ("black_id") references "player" ("id") on update cascade;');
        });
    }
}
exports.Migration20210115224941 = Migration20210115224941;
//# sourceMappingURL=Migration20210115224941.js.map