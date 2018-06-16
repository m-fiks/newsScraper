const express = require("express");
const hbrs = require("express-handlebars");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cheerio = require("cheerio");
const request = require("request");

const PORT = 8080;

app = express();

request("https://www.npr.org/sections/technology/", (err, res, html) => {
    if (err) console.log(err);

    const $ = cheerio.load(html);
    //console.log($);

    const titles = [];
    const urls = [];
    const sums = [];

    $("h2.title").each((i, elem) => {
        let title = $(elem).text();
        let url = $(elem).children().attr("href")
        titles.push(title);
        urls.push(url);
    })

    $("p.teaser").each((i, elem) => {
        let summary = $(elem).text();
        //console.log(summary);
        sums.push(summary);
    })

})

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})