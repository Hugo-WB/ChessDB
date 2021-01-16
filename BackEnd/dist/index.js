"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const core_1 = require("@mikro-orm/core");
const mikro_orm_config_1 = __importDefault(require("./mikro-orm.config"));
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const GameResolver_1 = require("./resolvers/GameResolver");
const PlayerResolver_1 = require("./resolvers/PlayerResolver");
const UserResolver_1 = require("./resolvers/UserResolver");
const express_session_1 = __importDefault(require("express-session"));
const connect_pg_simple_1 = __importDefault(require("connect-pg-simple"));
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const orm = yield core_1.MikroORM.init(mikro_orm_config_1.default);
    yield orm.getMigrator().up();
    const app = express_1.default();
    const conObject = {
        user: 'ChessDB',
        password: 'ChessDBQL',
        host: 'localhost',
        port: 5432,
        database: 'ChessDB'
    };
    app.use(express_session_1.default({
        name: "ch",
        store: new (connect_pg_simple_1.default(express_session_1.default))({ conObject: conObject }),
        secret: "session_pkey",
        resave: false,
        cookie: {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "lax",
        },
        saveUninitialized: false
    }));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: yield type_graphql_1.buildSchema({
            resolvers: [GameResolver_1.GameResovler, PlayerResolver_1.PlayerResovler, UserResolver_1.UserResolver],
        }),
        context: ({ req, res }) => ({ em: orm.em, req: req, res: res }),
    });
    apolloServer.applyMiddleware({ app });
    app.listen(4000, () => {
        console.log("Server started on localhost:4000");
    });
});
main().catch((e) => console.log(e));
//# sourceMappingURL=index.js.map