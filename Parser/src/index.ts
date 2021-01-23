// import {getPlayers} from "./Scraper/PgnMentor";
import {} from "./Sql";
import { parseFolderPGNS } from "./PgnParser/PgnParser";

import { gql, GraphQLClient } from "graphql-request";

const main = async () => {
  try {
    const client = new GraphQLClient("http://localhost:4000/graphql");


    // let games = await parseFolderPGNS("./assets/PgnMentor/players/");
    // let games = await parsePGN("./assets/PgnMentor/players/Adams.pgn");
    // console.log(games);
  } catch (error) {
    console.log(error);
  }
};

main();
