import { Migration } from '@mikro-orm/migrations';

export class Migration20210115224511 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "game" add column "white_id" int4 not null, add column "black_id" int4 not null;');

    this.addSql('alter table "game" add constraint "game_white_id_foreign" foreign key ("white_id") references "player" ("id") on update cascade;');
    this.addSql('alter table "game" add constraint "game_black_id_foreign" foreign key ("black_id") references "player" ("id") on update cascade;');
  }

}
