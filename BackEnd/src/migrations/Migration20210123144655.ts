import { Migration } from '@mikro-orm/migrations';

export class Migration20210123144655 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "player" drop constraint if exists "player_rating_check";');
    this.addSql('alter table "player" alter column "rating" type int4 using ("rating"::int4);');
    this.addSql('alter table "player" alter column "rating" drop not null;');

    this.addSql('alter table "game" add column "result" varchar(255) not null;');
    this.addSql('alter table "game" drop column "winner";');

    this.addSql('alter table "player" drop constraint "player_name_unique";');
  }

}
