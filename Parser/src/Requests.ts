import fetch from "node-fetch";
import cheerio from "cheerio";
import fs from "fs"

const getLinkCheerio = async (url: string) => {
  let response = await fetch(url);
  return cheerio.load(await response.text())
};


export {getLinkCheerio}
