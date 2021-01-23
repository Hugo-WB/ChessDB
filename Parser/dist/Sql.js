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
exports.uploadPGN = void 0;
const graphql_request_1 = require("graphql-request");
const pgnQuery = "INSERT INTO";
let uploadPGN = (pgn, client) => __awaiter(void 0, void 0, void 0, function* () {
    const createGame = graphql_request_1.gql `
    mutation CreateGame(
      $blackId: Int
      $whiteId: Int
      $pgn: String
      $opening: String
      $length: Int
      $playDate: String
      $winner: String
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
        winner: $winner
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
    let result = yield client.request(createGame, { id: 2 });
});
exports.uploadPGN = uploadPGN;
//# sourceMappingURL=Sql.js.map