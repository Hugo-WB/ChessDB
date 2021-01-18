import { Migration } from '@mikro-orm/migrations';

export class Migration20210118212246 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "player" drop column "games";');
  }

}
