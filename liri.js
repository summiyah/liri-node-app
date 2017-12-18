// write the code you need to grab the data from keys.js. Then store the keys in a variable.
// make liri.js have one of the following commands my-tweets - spotify-this-song - movie-this -
//do-what-it-says
// 3d226de009fd475d869c32dec5838b35
// f43c7773aa8a4d419a4108b8decc7381 secret spotify key

//node liri.js movie-this '<Creed>'

//var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

var myTweets = process.argv[2] === "my-tweets";
var mySpotify = process.argv[2] === "spotify-this-song";
var myMovies = process.argv[2] === "movie-this";


var Twitter = require('twitter');

var keys = require("./keys.js");
var client = new Twitter(keys);

if (myTweets) {
    var params = {screen_name: 'fatbellybella', count: 20};
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length ; i++) {
                var tweet = tweets[i];
                console.log(tweet.text);
            }
        }
    });
}


// if (operand === "add") {
//     outputNum = parseFloat(num1) + parseFloat(num2);
// }
//
// else if (operand === "subtract") {
//     outputNum = parseFloat(num1) - parseFloat(num2);
// }


// var Spotify = require('spotify');
//
// var keys = require("./keys.js");



