import { Migration } from '@mikro-orm/migrations';

export class Migration20210116122007 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "player" ("id" serial primary key, "name" text not null, "rating" int4 null, "profile" text null, "links" text[] null);');

    this.addSql('create table "game" ("id" serial primary key, "pgn" text not null, "white_id" int4 null, "black_id" int4 null);');

    this.addSql('alter table "game" add constraint "game_white_id_foreign" foreign key ("white_id") references "player" ("id") on update cascade on delete set null;');
    this.addSql('alter table "game" add constraint "game_black_id_foreign" foreign key ("black_id") references "player" ("id") on update cascade on delete set null;');
  }

}
