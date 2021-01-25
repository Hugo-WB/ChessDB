import { Game, parsePGN } from "./PgnParser/PgnParser";
import cliProgress from "cli-progress";
import fs from "fs";
import { uploadPGN, uploadPGNs } from "./GraphQL";
import { GraphQLClient } from "graphql-request";

let parseAndUploadFolder = async (
  folderPath: string,
  client: GraphQLClient
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
    games = await parsePGN(folderPath + files[i]);

    let x,
      j,
      temparray,
      chunk = 100;
    for (x = 0, j = games.length; x < j; x += chunk) {
      temparray = games.slice(x, x + chunk);
      await uploadPGNs(temparray, client);
    }
    // await uploadPGNs(games,client)
    console.log(
      "\nFinished uploading " +
        games.length.toString() +
        " games from file:" +
        files[i] + "\n"
    );
    bar.update(i);
  }
  bar.stop();
  return games;
};
export { parseAndUploadFolder };
