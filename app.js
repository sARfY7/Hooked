var express = require("express");
var request = require("request");
var bodyParser = require("body-parser");
var app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'))

app.get("/", function(req, res) {
    var url = "https://api.themoviedb.org/3/discover/movie?api_key=7e2527157403475bc563990b80915c14&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1";
    var imgURL = "https://api.themoviedb.org/3/configuration?api_key=7e2527157403475bc563990b80915c14";
    var upcomingURL = "https://api.themoviedb.org/3/movie/upcoming?api_key=7e2527157403475bc563990b80915c14&language=en-US&page=1";
    request(url, function(error, response, bodyGeneral) {
        request(imgURL, function(err, response, bodyImg) {
            request(upcomingURL, function (er, response, bodyUpcoming) {
                if(!error && response.statusCode == 200) {
                    var parsedDataGeneral = JSON.parse(bodyGeneral);
                    var parsedDataImg = JSON.parse(bodyImg);
                    var parsedDataUpcoming = JSON.parse(bodyUpcoming);
                    res.render("index", {data: parsedDataGeneral, posters: parsedDataImg, upcoming: parsedDataUpcoming});
                }
            });
        });
    });
});

app.get("/movie/:id", function(req, res) {
    var movieID = req.params.id;
    var url = "https://api.themoviedb.org/3/movie/"+ movieID +"?api_key=7e2527157403475bc563990b80915c14&language=en-US&append_to_response=credits,similar";
    var imgURL = "https://api.themoviedb.org/3/configuration?api_key=7e2527157403475bc563990b80915c14";
    request(url, function(error, response, bodyGeneral) {
        request(imgURL, function(err, response, bodyImg) {
            if(!error && response.statusCode == 200) {
                var parsedDataGeneral = JSON.parse(bodyGeneral);
                var parsedDataImg = JSON.parse(bodyImg);
                res.render("movie", {data: parsedDataGeneral, posters: parsedDataImg});
            }
        });
    });
});

app.get("/result", function(req, res) {
    var searchQuery = req.query["search_box"];
    var url = "https://api.themoviedb.org/3/search/movie?api_key=7e2527157403475bc563990b80915c14&query=" + searchQuery;
    var imgURL = "https://api.themoviedb.org/3/configuration?api_key=7e2527157403475bc563990b80915c14";
    request(url, function(error, response, bodyGeneral) {
        request(imgURL, function(err, response, bodyImg) {
            if(!error && response.statusCode == 200) {
                var parsedDataGeneral = JSON.parse(bodyGeneral);
                var parsedDataImg = JSON.parse(bodyImg);
                res.render("result", {data: parsedDataGeneral, posters: parsedDataImg});
            }
        });
    });
});

// Listen
app.listen(3000, function() {
    console.log("Movie APP Started !!");
});