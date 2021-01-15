import { Migration } from '@mikro-orm/migrations';

export class Migration20210115222324 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "player" ("id" serial primary key, "name" text not null, "rating" int4 not null);');

    this.addSql('create table "game" ("id" serial primary key, "pgn" text not null);');
  }

}
