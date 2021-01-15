import { Game } from "./entities/Game";
import { Player } from "./entities/Player";
import { __prod__ } from "./constants";
import { MikroORM } from "@mikro-orm/core";
import path from "path";

const config: Parameters<typeof MikroORM.init>[0] = {
  entities: [Game, Player],
  dbName: "ChessDB",
  type: "postgresql", // one of `mongo` | `mysql` | `mariadb` | `postgresql` | `sqlite`
  debug: !__prod__,
  user: "ChessDB",
  password: "ChessDBQL",
  migrations: {
    path: path.join(__dirname, "./migrations"),
    pattern: /^[\w-]+\d+\.[jt]s$/,
  },
};
export default config;
