const express = require("express");
const hbrs = require("express-handlebars");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cheerio = require("cheerio");
const request = require("request");
const db = require("./models")
const PORT = 8080;

app = express();

app.engine('handlebars', hbrs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

//connect to mongo db
mongoose.connect("mongodb://localhost/scraper");
app.get("/scrape", (req, res) => {

    request("https://thehardtimes.net/", (err, res, html) => {
    if (err) console.log(err);

    const results = [];
    const $ = cheerio.load(html);
    //console.log($);

    $("h2.post-title").each((i, elem) => {
        let title = $(elem).text().trim();
        let link = $(elem).children().attr("href");
       
        // let summary;
        // $("div.post-content").each((i, elem) => {
        //     summary = $(elem).text().trim();
        //     //console.log(summary)
        //     return summary
        // });
        // // //push to results save as object
        results.push({
            title: title,
            link: link
        })

        //console.log(results)
        db.Article.create(results)
        .then((dbArticle) => {
           console.log(dbArticle)
        })
        .catch((err) => {
            console.log(err)
        })
    })
})
    res.send('scrape complete');
})

//get ALL of the articles
app.get("/all", (req,res) => {
    db.Article.find({})
    .then((dbArticle) => {
        res.render("index", {dbArticle})
    })
    .catch((err) => {
        res.json(err)
    })
})

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})