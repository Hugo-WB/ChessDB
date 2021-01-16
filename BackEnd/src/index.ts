import { MikroORM } from "@mikro-orm/core";

import mikroConfig from "./mikro-orm.config";

import { Game } from "./entities/Game";
import { Player } from "./entities/Player";

const main = async () => {
  const orm = await MikroORM.init(mikroConfig);
  await orm.getMigrator().up();

  const magnus = orm.em.getReference(Player, 1);
  const hikaru = orm.em.getReference(Player, 2);

  const game = orm.em.create(Game, { pgn: "waguan drillas" ,black:hikaru,white:magnus});

  await orm.em.persistAndFlush(game);
  // const player = orm.em.create(Player, { name: "magnus carlsen",rating:6969 });
  // const player2 = orm.em.create(Player,{name:"Hikaru",rating:6968})
  // await orm.em.persistAndFlush(player);
  // await orm.em.persistAndFlush(player2)
  // const playerWhite = orm.em.getReference(Player,)
};

main().catch((e) => console.log(e));
