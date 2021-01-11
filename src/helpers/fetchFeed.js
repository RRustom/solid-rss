import Parser from 'rss-parser'

const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

export const fetchFeed = async (url) => {
  let parser = new Parser();
  let feed = await parser.parseURL(CORS_PROXY + url);
  return feed.items;
}
