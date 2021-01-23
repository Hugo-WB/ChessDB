import { Game } from "./PgnParser/PgnParser";
import { request, gql, GraphQLClient } from "graphql-request";
const createPlayer = gql`
  mutation CreatePlayer($rating: Int, $name: String!) {
    createPlayer(rating: $rating, name: $name) {
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
interface CreateGameOptions {
  blackID: number;
  whiteID: number;
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
    $blackID: Int!
    $whiteID: Int!
    $pgn: String!
    $opening: String!
    $length: Int!
    $playDate: String!
    $result: String!
    $averageRating: Int!
    $whiteMoves: [String!]!
    $blackMoves: [String!]!
  ) {
    createGame(
      blackID: $blackID
      whiteID: $whiteID
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

const getPlayerIdOrCreate = async (
  client: GraphQLClient,
  name: string,
  rating?: number
) => {
  let { players } = await client.request(findPlayer, { name: name });
  if (rating == undefined || isNaN(rating)) {
    rating = 0;
  }
  if (players.length == 1) {
    return players[0].id;
  }
  let { player } = await client.request(createPlayer, {
    name: name,
    rating: rating,
  });
  return player.id;
};

const uploadPGN = async (game: Game, client: GraphQLClient) => {
  let length = Math.floor(game.blackMoves.length + game.whiteMoves.length);
  // let blackId = await getPlayerIdOrCreate(client, game.black, game.blackElo);
  // let whiteId = await getPlayerIdOrCreate(client, game.white, game.whiteElo);
  let [blackId, whiteId] = await Promise.all([
    getPlayerIdOrCreate(client, game.black, game.blackElo),
    getPlayerIdOrCreate(client, game.white, game.whiteElo),
  ]);
  console.log(blackId, whiteId);
  let averageRating = Math.round((game.blackElo + game.whiteElo) / 2);
  if (isNaN(averageRating)) {
    averageRating = 1;
  }

  let createGameOptions: CreateGameOptions = {
    pgn: game.pgn,
    averageRating: averageRating,
    blackMoves: game.blackMoves,
    whiteMoves: game.whiteMoves,
    opening: game.eco,
    result: game.result,
    playDate: game.date,
    blackID: blackId,
    whiteID: whiteId,
    length: length,
  };
  console.log(createGameOptions);

  let result = await client.request(createGame, createGameOptions);
  console.log(result);
};

export { uploadPGN, getPlayerIdOrCreate };
