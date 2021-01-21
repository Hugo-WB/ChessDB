import { Pool } from "pg";
// import {getPlayers} from "./Scraper/PgnMentor";
import { downloadZip, extractZip } from "./Zips";
import { parseFolderPGNS } from "./Sql";
import { Game, parsePGN } from "./PgnParser/PgnParser";
import cliProgress from "cli-progress";

const main = async () => {
  // const pool = new Pool({
  //   user: "ChessDB",
  //   host: "localhost",
  //   database: "ChessDB",
  //   password: "ChessDBQL",
  //   port: 5432,
  // });
  let games = await parseFolderPGNS("./assets/PgnMentor/players/");
  // let games = parsePGN("./assets/PgnMentor/players/Adams.pgn");
  // console.log(games[0]);
  // const bar = new cliProgress.SingleBar({}, cliProgress.Presets.legacy);
  // bar.start(games.length, 0);
  console.log(games[0].getSeperatedMoves());
  // games.forEach((game) => {
  //   game.getSeperatedMoves();
  //   bar.increment();
  // });
};

main();
