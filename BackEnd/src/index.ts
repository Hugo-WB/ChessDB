import { MikroORM } from "@mikro-orm/core";

import mikroConfig from "./mikro-orm.config";

import { Game } from "./entities/Game";

const main = async () => {
  const orm = await MikroORM.init(mikroConfig);
  await orm.getMigrator().up();
  const game = orm.em.create(Game, { pgn: "waguan slimes" });
  await orm.em.persistAndFlush(game);
};

main().catch((e) => console.log(e));
