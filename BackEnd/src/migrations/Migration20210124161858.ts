import { Migration } from '@mikro-orm/migrations';

export class Migration20210124161858 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "game" add constraint "game_pgn_unique" unique ("pgn");');
  }

}
