// import {getPlayers} from "./Scraper/PgnMentor";
import { getPlayerIdOrCreate } from "./Sql";
import { parseFolderPGNS, parsePGN } from "./PgnParser/PgnParser";

import { gql, GraphQLClient } from "graphql-request";

const main = async () => {
  try {
    const client = new GraphQLClient("http://localhost:4000/graphql");


    // let games = await parseFolderPGNS("./assets/PgnMentor/players/");
    // let games = await parsePGN("./assets/PgnMentor/players/Adams.pgn");
    // console.log(games);
    getPlayerIdOrCreate(client,"Gotham")
  } catch (error) {
    console.log(error);
  }
};

main();
