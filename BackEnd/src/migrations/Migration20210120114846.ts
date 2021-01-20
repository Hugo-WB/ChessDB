import { Migration } from '@mikro-orm/migrations';

export class Migration20210120114846 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" serial primary key, "username" text not null, "password" text not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
    this.addSql('alter table "user" add constraint "user_username_unique" unique ("username");');

    this.addSql('create table "player" ("id" serial primary key, "name" text not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "rating" int4 null, "profile" text null, "links" text[] null);');

    this.addSql('create table "game" ("id" serial primary key, "played_at" timestamptz(0) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "pgn" text not null, "white_id" int4 not null, "black_id" int4 not null, "winer" int4 not null, "length" int4 not null, "opening" text not null, "white_moves" text[] not null, "black_moves" text[] not null, "average_rating" int4 not null);');

    this.addSql('alter table "game" add constraint "game_white_id_foreign" foreign key ("white_id") references "player" ("id") on update cascade;');
    this.addSql('alter table "game" add constraint "game_black_id_foreign" foreign key ("black_id") references "player" ("id") on update cascade;');
  }

}
