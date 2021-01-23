import fs from "fs";
import extract from "extract-zip";
import { resolve } from "path";
import fetch from "node-fetch";



let downloadZip = async (url: string, path: string) => {
  try {
    let fileStream = fs.createWriteStream(path);
    // const request = http.get(url, (response) => response.pipe(file));
    const request = await fetch(url);
    request.body.pipe(fileStream);
    return new Promise<string>((resolve) => {
      fileStream.on("finish", () => {
        fileStream.close();
        resolve(path);
      });
    });
  } catch (error) {
    console.log(error);
    return "";
  }
};

let extractZip = async (zipPath: string, outDir: string) => {
  try {
    await extract(zipPath, { dir: resolve(outDir) });
    await fs.unlinkSync(zipPath);
  } catch (error) {
    console.log(error);
  }
};

export { downloadZip, extractZip };
