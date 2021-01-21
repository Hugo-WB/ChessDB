import fs from "fs";
import pgnParser from "pgn-parser";
import { Game, parsePGN } from "./PgnParser/PgnParser";
import cliProgress from "cli-progress";
import { Pool } from "pg";



const pgnQuery = "INSERT INTO"
let uploadPGN = async (pgn: Game,pool:Pool) => {

};

export { uploadPGN };
