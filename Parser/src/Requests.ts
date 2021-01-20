import fetch from "node-fetch";
import cheerio from "cheerio";

const getLinkCheerio = async (url: string) => {
  let response = await fetch(url);
  return cheerio.load(await response.text())
};


export {getLinkCheerio}
