const express=require("express");
const router = express.Router();
const cheerio = require("cheerio");
const request = require("request");
const db = require("../models")

router.get("/", (req, res) => {
    res.render("index")
})

router.get("/scrape", (req, res) => {

    request("https://thehardtimes.net/", (err, res, html) => {
    if (err) console.log(err);

    const results = [];
    const $ = cheerio.load(html);

    $("article").each((i, elem) => {
        console.log($(elem).children(".featured-image").children().attr("href"));
        // let title = $(elem).children(".post-header").text();
        // let summary = $(elem).children(".post-content").text();
        // let image = $(elem).children(".featured-image").text();
        // let url = 
    
        // results.push({
        //     title: title,
        //     link: link,
        //     saved: false
        // })

        // db.Article.create(results)
        // .then((dbArticle) => {
        // console.log(dbArticle)
        // })
    })
})
    res.redirect('/all');
})

//get all articles
router.get("/all", (req,res) => {
    db.Article.find({})
    //.populate("notes")
    .then((dbArticle) => {
        //console.log(dbArticle)
        // res.json(dbArticle)
        res.render("index", {dbArticle})
    })
    .catch((err) => {
        res.json(err)
    })
})

//show notes for article
router.get("/allnotes/:id", (req,res) => {
    //console.log("HERE" + req.params.id)
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
    //console.log(req.body)
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