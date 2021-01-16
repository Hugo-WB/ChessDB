import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";

import mikroConfig from "./mikro-orm.config";

import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

// Resolvers:
import { GameResovler } from "./resolvers/GameResolver";
import { PlayerResovler } from "./resolvers/PlayerResolver";
import { UserResolver } from "./resolvers/UserResolver";

// Session:
import session from "express-session";
import pgSession from "connect-pg-simple";

const main = async () => {
  // MikroORM:
  const orm = await MikroORM.init(mikroConfig);
  await orm.getMigrator().up();

  // Express:
  const app = express();

  // Postgress session:
    const conObject = {
      user: 'ChessDB',
      password: 'ChessDBQL',
      host: 'localhost',
      port: 5432,
      database: 'ChessDB'
    };
  app.use(
    session({
      name: "ch",
      store: new (pgSession(session))({conObject:conObject}),
      secret: "session_pkey",
      resave: false,
      cookie: {
        // 30 days cookies
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        // protect csrf???
        sameSite: "lax",
        // only allow https:
        // secure:__prod__
      },
      saveUninitialized:false
    })
  );

  // Apollo Server:
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [GameResovler, PlayerResovler, UserResolver],
    }),
    context: ({ req, res }) => ({ em: orm.em, req: req, res: res }),
  });

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("Server started on localhost:4000");
  });
};

main().catch((e) => console.log(e));
