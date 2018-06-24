const express=require("express");
const router = express.Router();
const hbrs = require("express-handlebars");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cheerio = require("cheerio");
const request = require("request");
const db = require("../models")

router.get("/", (req, res) => {
    res.render("index")
})
//connect to mongo db
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scrappy";
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

router.get("/scrape", (req, res) => {

    request("https://thehardtimes.net/music/", (err, res, html) => {
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
            link: link,
            saved: false
        })
        //console.log(results)
        db.Article.create(results)
        .then((dbArticle) => {
           console.log(dbArticle)
        })
    })
})
    res.redirect('/all');
})

//get all articles
router.get("/all", (req,res) => {
    db.Article.find({})
    //.populate("notes")
    .then((dbArticle) => {
        console.log(dbArticle)
        // res.json(dbArticle)
        res.render("index", {dbArticle})
    })
    .catch((err) => {
        res.json(err)
    })
})

//show notes for article
router.get("/allnotes/:id", (req,res) => {
    console.log("HERE" + req.params.id)
    db.Article.findOne({_id: req.params.id})
    .populate("note")
    .then(function(dbArticle) {
        res.json(dbArticle)
    })
    .catch(function(err){
        res.json(err);
    })
})


//add a note
router.post("/notes/:id", (req, res) => {
    console.log(req.body)
    db.Note.create(req.body)
    .then(function(dbNote) {
        return  db.Article.findOneAndUpdate({ "_id": req.params.id},
        { note: dbNote._id},
        { new: true}
        );
    }).then(function(dbArticle) {
        res.json(dbArticle)
    })
    .catch(function(err) {
        res.json(err);
    })
})

module.exports = router;