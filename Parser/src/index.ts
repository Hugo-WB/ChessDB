import { Pool } from "pg";
import { getPlayers } from "./Scraper/PgnMentor";
import { downloadZip, extractZip } from "./Zips";

const main = async () => {
  const pool = new Pool({
    user: "ChessDB",
    host: "localhost",
    database: "ChessDB",
    password: "ChessDBQL",
    port: 5432,
  });
  getPlayers()
};

main();
