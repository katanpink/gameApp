const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const games = require("./data/data.json");

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.json())
app.use(express.static("./public"))

app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/sort", (req, res) => {
    res.render('sort');
})

app.post("/sort/display", (req, res) => {
    const tags = req.body.tags.split(" ");

    const ids = games.filter(x => contansTag(x, tags));
    console.log(ids);

    res.render("display", {games: ids});
});

app.listen(3000);

function contansTag(element, tags){
    let includes = false;
   
    tags.forEach(x => {
        if(element.genre.includes(x)){
            includes = true
        }
    })

    return includes;
}