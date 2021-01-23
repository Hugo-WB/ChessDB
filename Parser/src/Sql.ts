import { Game } from "./PgnParser/PgnParser";
import { request, gql, GraphQLClient } from "graphql-request";

let getPlayerIdOrCreate = async (
  client: GraphQLClient,
  name: string,
  rating?: number
) => {
  const createPlayer = gql`
  mutation CreatePlayer($rating:Int,$name:String,client:GraphQLClient){
    createPlayer(rating:$rating,name:$name){
      id
      name
      createdAt
    }
  }
  `;
  const findPlayer = gql`
    query getPlayer($name: String) {
      players(name: $name) {
        id
      }
    }
  `;
  let { players } = await client.request(findPlayer, { name: name });
  if (players.length == 1) {
    return players[0].id;
  }
  let { player } = await client.request(createPlayer, {
    name: name,
    rating: rating,
  });
  return player.id;
};

let uploadPGN = async (game: Game, client: GraphQLClient) => {
  interface CreateGameOptions {
    blackId: number;
    whiteId: number;
    pgn: string;
    opening?: string;
    length: number;
    playDate: string;
    result: string;
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

  let length = Math.floor(game.blackMoves.length + game.whiteMoves.length);
  let blackId = await getPlayerIdOrCreate(client, game.black, game.blackElo);
  let whiteId = await getPlayerIdOrCreate(client, game.white, game.whiteElo);

  let createGameOptions: CreateGameOptions = {
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

  let result = await client.request(createGame);
};

export { uploadPGN, getPlayerIdOrCreate };
