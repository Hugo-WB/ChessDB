import fs from "fs";
import pgnParser from "pgn-parser";
import { Game, parsePGN } from "./PgnParser/PgnParser";
import cliProgress from "cli-progress";

let parseFolderPGNS = async (folderPath: string, func?: (game: Game) => void) => {
  let games: Game[] = [];
  let files: string[] = [];
  fs.readdirSync(folderPath).forEach((file) => {
    files.push(file);
  });
  const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_grey);
  bar.start(files.length, 0);

  for (let i = 0; i < files.length; i++) {
    games = games.concat(await parsePGN(folderPath + files[i], func));
    // games = games.concat(parsePGN(folderPath + files[i]));
    // parsePGN(folderPath + files[i]);
    bar.update(i);
  }
  bar.stop();
  return games;
};

let uploadPGN = async (pgn: string) => {};

export { parseFolderPGNS, uploadPGN };
