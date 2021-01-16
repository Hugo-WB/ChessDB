import { Migration } from '@mikro-orm/migrations';

export class Migration20210116224709 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" add constraint "user_username_unique" unique ("username");');

    this.addSql('drop table if exists "session" cascade;');
  }

}
