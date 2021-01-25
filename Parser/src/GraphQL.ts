import { Game } from "./PgnParser/PgnParser";
import { request, gql, GraphQLClient } from "graphql-request";
const createPlayer = gql`
  mutation CreatePlayer($rating: Int, $name: String!) {
    createPlayer(rating: $rating, name: $name) {
      error
      players {
        id
        name
        createdAt
      }
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
      games {
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
): Promise<any> => {
  try {
    let { players } = await client.request(findPlayer, { name: name });
    if (rating == undefined || isNaN(rating)) {
      rating = 0;
    }
    if (players.length == 1) {
      return players[0].id;
    }
    let player = await client.request(createPlayer, {
      name: name,
      rating: rating,
    });
    if (player.createPlayer?.error?.includes("already exists in")) {
      return await getPlayerIdOrCreate(client, name, rating);
    }
    return player.createPlayer.players[0].id;
  } catch (error) {
    console.log(error)
    return error;
  }
};

const uploadPGNs = async (games: Game[], client: GraphQLClient) => {
  let uploadPromises: Promise<any>[] = [];
  games.forEach((game) => {
    uploadPromises.push(uploadPGN(game, client));
  });
  // console.log("Upload PGNs promises sent")
  let results = await Promise.all(uploadPromises);
  return results;
};

const uploadPGN = async (game: Game, client: GraphQLClient) => {
  try {
    let length = Math.floor(game.blackMoves.length + game.whiteMoves.length);
    // let blackId = await getPlayerIdOrCreate(client, game.black, game.blackElo);
    // let whiteId = await getPlayerIdOrCreate(client, game.white, game.whiteElo);
    let [blackId, whiteId] = await Promise.all([
      getPlayerIdOrCreate(client, game.black, game.blackElo),
      getPlayerIdOrCreate(client, game.white, game.whiteElo),
    ]);
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

    let result = await client.request(createGame, createGameOptions);
    return result.createGame;
  } catch (error) {
    return { error: error };
  }
};

export { uploadPGN, getPlayerIdOrCreate, uploadPGNs };
