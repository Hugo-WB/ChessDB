// import {getPlayers} from "./Scraper/PgnMentor";
import { downloadZip, extractZip } from "./Zips";
import {} from "./Sql";
import { Game, parsePGN, parseFolderPGNS } from "./PgnParser/PgnParser";
import cliProgress from "cli-progress";
import fs from "fs";
import ApolloClient from "apollo-boost";

const main = async () => {
  const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
  });

  // let games = await parseFolderPGNS("./assets/PgnMentor/players/");
  // let games = await parsePGN("./assets/PgnMentor/players/Adams.pgn");
  // console.log(games);
};

main();
