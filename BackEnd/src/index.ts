import { MikroORM } from "@mikro-orm/core";

import { Game } from "./entities/Game";

const main = async () => {
  const orm = await MikroORM.init({
    entities: [Game],
    dbName: "ChessDB",
    user: "ChessDB",
    password: "ChessDBQL",
    type: "postgresql",
    debug: true,
  });
  const game = orm.em.create(Game, { id: 1, pgn: "waguan" });
  await orm.em.persistAndFlush(game);
  // await orm.em.nativeInsert(Game,{id:1,pgn:"waguan"})
};

main().catch((e) => console.log(e));
