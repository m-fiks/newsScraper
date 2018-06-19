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
    
    const results = [];

    $("h2.title").each((i, elem) => {
        let title = $(elem).text();
        let url = $(elem).children().attr("href")
        //get summary
        let summary;
        $("p.teaser").each((i, elem) => {
            summary = $(elem).text();
            //console.log(summary);
            return summary;
        })
        //push to results save as object
        results.push({
            title: title,
            url: url,
            summary: summary
        })
    })

    //console.log(results)

})

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})