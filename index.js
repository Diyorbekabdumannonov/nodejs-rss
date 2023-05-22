const Parser = require('rss-parser');
const parser = new Parser();
const fs = require('fs');
const xml = require("xml");
const cheerio = require("cheerio");
const data = require('./data.json')

const kunUz = 'https://kun.uz/en/news/rss'
const aniqUz = 'https://aniq.uz/uz/yangiliklar/rss';
const feedItems = [];

(async () => {
    const arr = []

    let kunUzFeed = await parser.parseURL(kunUz);
    let aniqUzFeed = await parser.parseURL(aniqUz);
    kunUzFeed.items.map(item => {
        arr.push(item)
    })
    aniqUzFeed.items.map(item => {
        arr.push(item)
    })
    fs.writeFileSync('data.json', JSON.stringify(arr))
})();

(async function createRssFeed() {
    console.log("creating feed");
    const feedObject = {
        rss: [
            {
                _attr: {
                    version: "2.0",
                    "xmlns:atom": "http://www.w3.org/2005/Atom",
                },
            },
            {
                ...buildFeed(data),
            },
        ],
    };

    const feed = '<?xml version="1.0" encoding="UTF-8"?>' + xml(feedObject);

    fs.writeFileSync("feed.rss", feed);
})();

function buildFeed() {
    const feedItems = [];

    feedItems.push(
        data.map(function (item) {
            const feedItem = {
                item: [
                    { title: item.title },
                    { link: item.link },
                    { pubDate: item.pubDate },
                    { content: item.content },
                    { guid: item.guid },
                    { categories: item.categories },
                    { isoDate: item.isoDate }
                ],
            };
            return feedItem;
        })
    );

    return feedItems;
}