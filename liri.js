

var myTweets = process.argv[2] === "my-tweets";
var mySpotify = process.argv[2] === "spotify-this-song";
var myMovies = process.argv[2] === "movie-this";
var doWhatItSays = process.argv[2] === "do-what-it-says";

// all requires here
var Twitter = require('twitter');
var request = require('request');
var Spotify = require('node-spotify-api');
var fs = require('fs');
var keys = require("./keys.js");

var twitterClient = new Twitter(keys);

// used Erykah Badu's twitter - she follows me since 2010!
// my keys are .gitignored
if (myTweets) {
    var twitterParams = {screen_name: 'fatbellybella', count: 20};
    twitterClient.get('statuses/user_timeline', twitterParams, function (error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                var tweet = tweets[i];
                console.log(tweet.text);
                console.log(tweet.created_at);
            }
        }
    });
}

var spotifyClient = new Spotify({
    id: "3d226de009fd475d869c32dec5838b35",
    secret: "f43c7773aa8a4d419a4108b8decc7381",
});
// #4 - add funtion for getting spotify to work on random.txt - Final step
if (mySpotify) {
    spotifyThisSong(process.argv[3]);
}

function spotifyThisSong(mySong) {
    var spotifyParams = {type: 'track', query: mySong};
    spotifyClient.search(spotifyParams, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        for (var i = 0; i < data.tracks.items.length; i++) {
            var item = data.tracks.items[i];
            console.log("Artist: ", item.artists[0].name);
            console.log("Song: ", item.name);
            console.log("Preview: ", item.preview_url);
            console.log("Album: ", item.album.name);
            // add extra line break for space between songs
            console.log("===========================")
        }
    });
}

var movieName = process.argv[3];
var queryURL = "https://www.omdbapi.com/?plot=short&apikey=trilogy&t=" + movieName;

if (myMovies) {
    request(queryURL, function (err, response, bodyString) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        // was a string not object like I originally though. 
        var body = JSON.parse(bodyString);
        console.log("Movie: ", body.Title);
        console.log("Release Date: ", body.Year);
        console.log("Rating: ", body.Rated);
        for (var i = 0; i < body.Ratings.length; i++) {
            var rating = body.Ratings[i];
            if (rating.Source === "Internet Movie Database") {
                console.log("IMDB Rating: ", rating.Value);
            }
            if (rating.Source === "Rotten Tomatoes") {
                console.log("Rotten Tomatoes: ", rating.Value);
            }
        }
        console.log("Movie Production Location: ", body.Country);
        console.log("Language: ", body.Language);
        console.log("Plot: ", body.Plot);
        console.log("Actors: ", body.Actors);
    });

}

if (doWhatItSays) {
    fs.readFile('random.txt', 'utf8', function (err, data) {
        if (err) {
            console.log(err);
            return;
        }
        spotifyThisSong(data);
    });
}




