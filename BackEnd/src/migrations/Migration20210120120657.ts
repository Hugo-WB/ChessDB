import { Migration } from '@mikro-orm/migrations';

export class Migration20210120120657 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "game" rename column "winer" to "winner";');
  }

}
