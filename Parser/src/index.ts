// import {getPlayers} from "./Scraper/PgnMentor";
import { getPlayerIdOrCreate, uploadPGN, uploadPGNs } from "./GraphQL";
import { Game, parseFolderPGNS, parsePGN } from "./PgnParser/PgnParser";

import { gql, GraphQLClient } from "graphql-request";
import { stringify } from "querystring";
import { parseAndUploadFolder } from "./ParseAndUpload";

const main = async () => {
  try {
    const client = new GraphQLClient("http://localhost:4000/graphql");

    // let games = await parseFolderPGNS("./assets/PgnMentor/players/");
    // let games = await parsePGN("./assets/PgnMentor/players/Alburt.pgn");
    // console.log(games);
    // uploadPGN(games[0],client)

    // console.log("loaded " + games.length.toString() + " games");

    // let results = await uploadPGNs(games, client);
    // console.log(results);

    await parseAndUploadFolder("./assets/PgnMentor/players/", client);
  } catch (error) {
    console.log(error);
  }
};

main();
