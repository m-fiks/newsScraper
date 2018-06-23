const express = require("express");
const hbrs = require("express-handlebars");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cheerio = require("cheerio");
const request = require("request");
const db = require("./models")
const PORT = 8080;

const routes = require("./routes/routes")

app = express();

app.engine('handlebars', hbrs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

app.use('/', routes)

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})