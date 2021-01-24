import "reflect-metadata";
import { MikroORM, RequestContext } from "@mikro-orm/core";

import mikroConfig from "./mikro-orm.config";

import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import cors from "cors";

// Resolvers:
import { GameResovler } from "./resolvers/GameResolver";
import { PlayerResovler } from "./resolvers/PlayerResolver";
import { UserResolver } from "./resolvers/UserResolver";

// Session:
import session from "express-session";
import pgSession from "connect-pg-simple";
import bodyParser from "body-parser";

const main = async () => {
  try {
    // MikroORM:
    const orm = await MikroORM.init(mikroConfig);
    await orm.getMigrator().up();

    // Express:
    const app = express();
    app.use(
      cors({
        origin: "http://localhost:3000",
        credentials: true,
      })
    );

    // Postgress session:
    const conObject = {
      user: "ChessDB",
      password: "ChessDBQL",
      host: "localhost",
      port: 5432,
      database: "ChessDB",
    };

    app.post("/graphql",bodyParser.json(),graphqlhtt)


    app.use(
      session({
        name: "ch",
        store: new (pgSession(session))({ conObject: conObject }),
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
        saveUninitialized: false,
      })
    );

    // Apollo Server:
    const apolloServer = new ApolloServer({
      schema: await buildSchema({
        resolvers: [GameResovler, PlayerResovler, UserResolver],
      }),
      context: ({ req, res }) => ({ em: orm.em, req: req, res: res }),
    });

    apolloServer.applyMiddleware({ app, cors: false });

    app.use((_, __, next) => {
      RequestContext.create(orm.em, next);
    });
    app.listen(4000, () => {
      console.log("Server started on localhost:4000");
    });
  } catch (error) {
    console.log(error);
  }
};

main();
