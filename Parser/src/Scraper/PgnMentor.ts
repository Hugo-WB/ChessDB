import { downloadZip, extractZip } from "../Zips";
import { getLinkCheerio } from "../Requests";
import cliProgress from "cli-progress";

let getPlayers = async () => {
  let playerZipsSet: Set<string> = new Set();
  let $ = await getLinkCheerio("https://www.pgnmentor.com/files.html");
  let links = $("body > div:nth-child(1) > table:nth-child(9)").find("a");
  links.each((_, link) => {
    let href = $(link).attr("href");
    if (href?.includes(".zip")) {
      playerZipsSet.add(href);
    }
  });

  let playerZips = Array.from(playerZipsSet);
  console.log(playerZips);
  const bar = new cliProgress.SingleBar(
    { clearOnComplete: true, hideCursor: true },
    cliProgress.Presets.shades_grey
  );
  bar.start(playerZips.length, 0);

  playerZips.forEach(async (playerZip) => {
    let path = await downloadZip(
      "http://www.pgnmentor.com/" + playerZip,
      "./assets/PgnMentor/" + playerZip
    );
    await extractZip(path, "./assets/PgnMentor/Players");
    bar.increment();
  });
  console.log("DONE");
};


export { getPlayers };
