import { Migration } from '@mikro-orm/migrations';

export class Migration20210116204511 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" add column "username" text not null;');
  }

}
