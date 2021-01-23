import { Migration } from '@mikro-orm/migrations';

export class Migration20210123151937 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "player" drop constraint if exists "player_rating_check";');
    this.addSql('alter table "player" alter column "rating" type int4 using ("rating"::int4);');
    this.addSql('alter table "player" alter column "rating" drop not null;');

    this.addSql('alter table "player" drop constraint "player_name_unique";');
  }

}
