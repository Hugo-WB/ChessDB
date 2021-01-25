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
exports.Migration20210125120347 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20210125120347 extends migrations_1.Migration {
    up() {
        return __awaiter(this, void 0, void 0, function* () {
            this.addSql('create table "user" ("id" serial primary key, "username" text not null, "password" text not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
            this.addSql('alter table "user" add constraint "user_username_unique" unique ("username");');
            this.addSql('create table "player" ("id" serial primary key, "name" text not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "rating" int4 null, "profile" text null, "links" text[] null);');
            this.addSql('alter table "player" add constraint "player_name_unique" unique ("name");');
            this.addSql('create table "game" ("id" serial primary key, "played_at" timestamptz(0) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "pgn" text not null, "white_id" int4 not null, "black_id" int4 not null, "result" varchar(255) not null, "length" int4 not null, "opening" text not null, "white_moves" text[] not null, "black_moves" text[] not null, "average_rating" int4 not null);');
            this.addSql('alter table "game" add constraint "game_pgn_unique" unique ("pgn");');
            this.addSql('alter table "game" add constraint "game_white_id_foreign" foreign key ("white_id") references "player" ("id") on update cascade;');
            this.addSql('alter table "game" add constraint "game_black_id_foreign" foreign key ("black_id") references "player" ("id") on update cascade;');
        });
    }
}
exports.Migration20210125120347 = Migration20210125120347;
//# sourceMappingURL=Migration20210125120347.js.map