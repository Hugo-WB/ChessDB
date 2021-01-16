import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";

import mikroConfig from "./mikro-orm.config";

import { Game } from "./entities/Game";
import { Player } from "./entities/Player";

import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

// Resolvers:
import { GameResovler } from "./resolvers/GameResolver";
import { PlayerResovler } from "./resolvers/PlayerResolver";

const main = async () => {
  // MikroORM:
  const orm = await MikroORM.init(mikroConfig);
  await orm.getMigrator().up();

  // Express:
  const app = express();

  // Apollo Server:
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [GameResovler,PlayerResovler],
    }),
    context: () => ({ em: orm.em }),
  });

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("Server started on localhost:4000");
  });
};

main().catch((e) => console.log(e));
