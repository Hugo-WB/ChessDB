import fs from "fs";
import readline from "readline";
import pgnParser from "pgn-parser";
import cliProgress from "cli-progress";
import lineReader from "line-reader";
import { callbackify } from "util";

interface Game {
  // "REQUIRED"
  pgn?: string;
  // event: string = "";
  // site: string = "";
  date?: string;
  // round: string = "";
  white?: string;
  black?: string;
  result?: string;
  // optional:
  eco?: string;
  whiteElo?: number;
  blackElo?: number;
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

  // getSeperatedMoves = () => {
  //   try {
  //     let parsed: any = pgnParser.parse(this.pgn)[0];
  //     if (parsed.moves == undefined) {
  //       return;
  //     }
  //     if (parsed.moves.length == undefined || parsed.moves == undefined) {
  //       return;
  //     }
  //     for (let i = 0; i < parsed.moves.length; i++) {
  //       if (i % 2 === 0) {
  //         this.whiteMoves.push(parsed.moves[i].move);
  //       } else {
  //         this.blackMoves.push(parsed.moves[i].move);
  //       }
  //     }
  //     return [this.whiteMoves, this.blackMoves];
  //   } catch (error) {
  //     return [];
  //   }
  // };
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
    // console.log(files[i]);
    // games = games.concat(parsePGN(folderPath + files[i], func));
    // games = games.concat(parsePGN(folderPath + files[i], func));
    // testParse(folderPath + files[i]);
    // games.concat(await parsePGN(folderPath + files[i]));
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

// const testParse = (filePath: string) => {
//   let parsedGames: ParsedGame[] = [];
//   let games: Game[] = [];
//   try {
//     let file = fs.readFileSync(filePath, "utf-8");
//     parsedGames = pgnParser.parse(file);
//   } catch {
//     return [];
//   }
//   parsedGames.forEach((parsed: ParsedGame) => {
//     let game: Game = new Game();
//     for (let i = 0; i < parsed.moves.length; i++) {
//       if (i % 2 === 0) {
//         game.whiteMoves.push(parsed.moves[i].move);
//       } else {
//         game.blackMoves.push(parsed.moves[i].move);
//       }
//     }
//   });
//   return parsedGames;
// };

const getReadLine = (filePath: string) => {
  return readline.createInterface({
    input: fs.createReadStream(filePath),
    // output: process.stdout,
  });
};

const parseSinglePGN = (pgn: string): Game | undefined => {
  try {
    let parsed: ParsedGame = pgnParser.parse(pgn)[0];
    let game: Game = { pgn: pgn, blackMoves: [], whiteMoves: [] };
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
