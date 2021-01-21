import fs from "fs";
import readline from "readline";
import pgnParser from "pgn-parser";

class Game {
  pgn: string = "";
  event: string = "";
  site: string = "";
  date: string = "";
  round: string = "";
  white: string = "";
  black: string = "";
  result: string = "";

  // optional:
  eco?: string;
  whiteElo?: number;
  blackElo?: number;
  annotator?: string;
  plyCount?: string;
  timeControl?: string;
  time?: string;
  termination?: string;
  mode?: string;
  fen?: string;

  // custom:
  whiteMoves: string[] = [];
  blackMoves: string[] = [];

  getSeperatedMoves = () => {
    try {
      let parsed: any = pgnParser.parse(this.pgn)[0];
      if (parsed.moves == undefined) {
        return;
      }
      if (parsed.moves.length == undefined || parsed.moves == undefined) {
        return;
      }
      for (let i = 0; i < parsed.moves.length; i++) {
        if (i % 2 === 0) {
          this.whiteMoves.push(parsed.moves[i].move);
        } else {
          this.blackMoves.push(parsed.moves[i].move);
        }
      }
      return [this.whiteMoves, this.blackMoves];
    } catch (error) {}
  };
}

const getReadLine = (filePath: string) => {
  return readline.createInterface({
    input: fs.createReadStream(filePath),
    // output: process.stdout,
  });
};

const parsePGN = async (
  filePath: string,
  func?: (game: Game) => void
): Promise<Game[]> => {
  const tagReg = new RegExp(/\[.+\]/);
  let lines = getReadLine(filePath);
  let games: Game[] = [];
  let currentGame: Game = new Game();
  let currentStatus: "tag" | "game" = "tag";
  // lines.on("line", (line) => {
  for await (const line of lines) {
    if (tagReg.test(line)) {
      // line is a tag
      if (currentStatus == "game") {
        games.push(currentGame);
        currentGame = new Game();
        currentStatus = "tag";
      }
      // if (/Event\s/.test(line)) {
      //   try {
      //     currentGame.event = line.match(/"(.*?")/)[0].replace('"', "");
      //   } catch {}
      // }
      // if (/Site\s/.test(line)) {
      //   try {
      //     currentGame.site = line.match(/"(.*?")/)[0].replace('"', "");
      //   } catch {}
      // }
      // if (/Date\s/.test(line)) {
      //   try {
      //     currentGame.date = line.match(/"(.*?")/)[0].replace('"', "");
      //   } catch {}
      // }
      // if (/Round\s/.test(line)) {
      //   try {
      //     currentGame.round = line.match(/"(.*?")/)[0].replace('"', "");
      //   } catch {}
      // }
      // if (/White\s/.test(line)) {
      //   try {
      //     currentGame.white = line.match(/"(.*?")/)[0].replace('"', "");
      //   } catch {}
      // }
      // if (/Black\s/.test(line)) {
      //   try {
      //     currentGame.black = line.match(/"(.*?")/)[0].replace('"', "");
      //   } catch {}
      // }
      // if (/Result\s/.test(line)) {
      //   try {
      //     currentGame.result = line.match(/"(.*?")/)[0].replace('"', "");
      //   } catch {}
      // }
      // if (/WhiteElo\s/.test(line)) {
      //   try {
      //     currentGame.whiteElo = parseInt(
      //       line.match(/"(.*?")/)[0].replace('"', "")
      //     );
      //   } catch {}
      // }
      // if (/BlackElo\s/.test(line)) {
      //   try {
      //     currentGame.blackElo = parseInt(
      //       line.match(/"(.*?")/)[0].replace('"', "")
      //     );
      //   } catch {}
      // }
      // if (/ECO\s/.test(line)) {
      //   try {
      //     currentGame.eco = line.match(/"(.*?")/)[0].replace('"', "");
      //   } catch {}
      // }
    } else if (line === "") {
    } else {
      // current line is a game line
      currentStatus = "game";
    }
    currentGame.pgn += line;
    // });
  }

  // lines.on("close", () => {
  //   games.push(currentGame);
  //   return games;
  // });
  if (func) {
    func(currentGame);
  }
  games.push(currentGame);
  return games;
};

export { parsePGN, Game };
