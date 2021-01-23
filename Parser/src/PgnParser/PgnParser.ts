import fs from "fs";
import readline from "readline";
import pgnParser from "pgn-parser";
import cliProgress from "cli-progress";
import lineReader from "line-reader";
import { callbackify } from "util";

interface Game {
  // "REQUIRED"
  pgn: string;
  // event: string = "";
  // site: string = "";
  date: string;
  // round: string = "";
  white: string;
  black: string;
  result: string;
  // optional:
  eco: string;
  whiteElo: number;
  blackElo: number;
  // annotator?: string;
  // plyCount?: string;
  // timeControl?: string;
  // time?: string;
  // termination?: string;
  // mode?: string;
  // fen?: string;

  // custom:
  whiteMoves: string[];
  blackMoves: string[];
}
let parseFolderPGNS = async (
  folderPath: string,
  func?: (game: Game) => void
) => {
  let games: Game[] = [];
  let files: string[] = [];
  fs.readdirSync(folderPath).forEach((file) => {
    if (/.+\.pgn/.test(file)) {
      files.push(file);
    }
  });
  const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_grey);
  bar.start(files.length, 0);

  for (let i = 0; i < files.length; i++) {
    games = games.concat(await parsePGN(folderPath + files[i]));
    bar.update(i);
  }
  bar.stop();
  return games;
};

interface header {
  name: string;
  value: string;
}
interface move {
  move_number?: number;
  move: string;
  comments?: string[];
}

interface ParsedGame {
  headers: header[];
  comments: string;
  moves: move[];
  result: string;
}

const getReadLine = (filePath: string) => {
  return readline.createInterface({
    input: fs.createReadStream(filePath),
    // output: process.stdout,
  });
};

const parseSinglePGN = (pgn: string): Game | undefined => {
  try {
    let parsed: ParsedGame = pgnParser.parse(pgn)[0];
    let game: Game = {
      pgn: pgn,
      blackMoves: [],
      whiteMoves: [],
      black: "",
      blackElo: 0,
      date: "",
      eco: "",
      result: "",
      white: "",
      whiteElo: 0,
    };
    game.pgn = pgn;
    for (let i = 0; i < parsed.moves.length; i++) {
      if (i % 2 === 0) {
        game.whiteMoves.push(parsed.moves[i].move);
      } else {
        game.blackMoves.push(parsed.moves[i].move);
      }
    }
    // handle headers:
    parsed.headers.forEach((header) => {
      switch (header.name) {
        case "Date":
          game.date = header.value;
          break;
        case "White":
          game.white = header.value;
          break;
        case "Black":
          game.black = header.value;
          break;
        case "Result":
          game.result = header.value;
          break;
        case "WhiteElo":
          game.whiteElo = parseInt(header.value);
          break;
        case "BlackElo":
          game.blackElo = parseInt(header.value);
          break;
        default:
          break;
      }
    });
    return game;
  } catch (error) {
    // console.log(error);
    return undefined;
  }
  return undefined;
};

const parsePGN = async (filePath: string): Promise<Game[]> => {
  let games: Game[] = [];
  const tagReg = new RegExp(/\[.+\]/);
  let lines = getReadLine(filePath);
  let currentGame: string = "";
  let currentStatus: "tag" | "game" = "tag";

  // lineReader.eachLine(filePath, (line, last) => {
  for await (const line of lines) {
    if (tagReg.test(line)) {
      // line is a tag
      if (currentStatus == "game") {
        let parsedGame = parseSinglePGN(currentGame);
        if (parsedGame != undefined) {
          games.push(parsedGame);
        }
        currentGame = "";
        currentStatus = "tag";
      }
    } else if (line === "") {
    } else {
      // current line is a game line
      currentStatus = "game";
    }
    currentGame += line;
  }
  let parsedGame = parseSinglePGN(currentGame);
  if (parsedGame != null) {
    games.push(parsedGame);
  }

  return games;
};

export { parsePGN, Game, parseFolderPGNS };
