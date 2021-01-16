import { Migration } from '@mikro-orm/migrations';

export class Migration20210116130948 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "player" add column "games" text[] null;');
  }

}
