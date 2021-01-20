import { Pool } from "pg";
// import {getPlayers} from "./Scraper/PgnMentor";
import { downloadZip, extractZip } from "./Zips";
import { parseFolderPGNS } from "./Sql";
import { Game, parsePGN } from "./PgnParser/PgnParser";

const main = async () => {
  // const pool = new Pool({
  //   user: "ChessDB",
  //   host: "localhost",
  //   database: "ChessDB",
  //   password: "ChessDBQL",
  //   port: 5432,
  // });
  let games = await parseFolderPGNS("./assets/PgnMentor/players/")
  // console.log(games.length)
  // let games:Game[] = await parsePGN("./assets/PgnMentor/players/Zvjaginsev.pgn")
  console.log(games)
};

main();
