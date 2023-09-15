const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const games = require("./data/data.json");

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.json())
app.use(express.static("./public"))

app.set("view engine", "ejs");
app.set("views", "./views");
app.get("/", (req, res) => res.render("game", {games}));
app.post("/", (req, res) => {
    const tags =  req.body.tags != null ? req.body.tags.split(" ") : "";
    const found = games.filter(x => contansTag(x, tags));
    
    res.render('game', {games: found});
}).listen(3000);

function contansTag(element, tags){
    for(let tag of tags){
        if(element.genre.includes(formatInput(tag)))
            return true;
    }
    return false;
}

const formatInput = (string) => string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
