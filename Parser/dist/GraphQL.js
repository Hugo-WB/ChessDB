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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlayerIdOrCreate = exports.uploadPGN = void 0;
const graphql_request_1 = require("graphql-request");
const createPlayer = graphql_request_1.gql `
  mutation CreatePlayer($rating:Int,$name:String!){
    createPlayer(rating:$rating,name:$name){
      id
      name
      createdAt
    }
  }
  `;
const findPlayer = graphql_request_1.gql `
  query getPlayer($name: String) {
    players(name: $name) {
      id
    }
  }
`;
const createGame = graphql_request_1.gql `
  mutation CreateGame(
    $blackId: Int
    $whiteId: Int
    $pgn: String
    $opening: String
    $length: Int
    $playDate: String
    $result: String
    $averageRating: Int
    $whiteMoves: [String]
    $blackMoves: [String]
  ) {
    createGame(
      blackID: $blackId
      whiteID: $whiteId
      pgn: $pgn
      opening: $opening
      length: $length
      playDate: $playDate
      result: $result
      averageRating: $averageRating
      whiteMoves: $whiteMoves
      blackMoves: $blackMoves
    ) {
      error
      game {
        id
        pgn
      }
    }
  }
`;
const getPlayerIdOrCreate = (client, name, rating) => __awaiter(void 0, void 0, void 0, function* () {
    let { players } = yield client.request(findPlayer, { name: name });
    if (players.length == 1) {
        return players[0].id;
    }
    let { player } = yield client.request(createPlayer, {
        name: name,
        rating: rating,
    });
    return player.id;
});
exports.getPlayerIdOrCreate = getPlayerIdOrCreate;
const uploadPGN = (game, client) => __awaiter(void 0, void 0, void 0, function* () {
    let length = Math.floor(game.blackMoves.length + game.whiteMoves.length);
    let [blackId, whiteId] = yield Promise.all([
        getPlayerIdOrCreate(client, game.black, game.blackElo),
        getPlayerIdOrCreate(client, game.white, game.whiteElo),
    ]);
    let createGameOptions = {
        pgn: game.pgn,
        averageRating: Math.round((game.blackElo + game.whiteElo) / 2),
        blackMoves: game.blackMoves,
        whiteMoves: game.whiteMoves,
        opening: game.eco,
        result: game.result,
        playDate: game.date,
        blackId: blackId,
        whiteId: whiteId,
        length: length,
    };
    let result = yield client.request(createGame);
    console.log(result);
});
exports.uploadPGN = uploadPGN;
//# sourceMappingURL=GraphQL.js.map