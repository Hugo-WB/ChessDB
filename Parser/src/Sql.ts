import { Game } from "./PgnParser/PgnParser";
import { request, gql, GraphQLClient } from "graphql-request";

const pgnQuery = "INSERT INTO";
let uploadPGN = async (pgn: Game, client: GraphQLClient) => {
  interface CreateGameOptions {
    blackId: number;
    whiteId: number;
    pgn: string;
    opening: string;
    length: number;
    playDate: string;
    winner: number;
    averageRating: number;
    whiteMoves: string[];
    blackMoves: string[];
  }
  const createGame = gql`
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

  let result = await client.request(createGame, { id: 2 });
};

export { uploadPGN };
