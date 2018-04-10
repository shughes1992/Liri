require("dotenv").config();
var keys = require("./keys")
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var programToRun = process.argv[2];
var programChoice = process.argv[3];

if (programToRun == "spotify-this-song") {
    spotifyThisSong();
} else if (programToRun == "my-tweets") {
    myTweets();
} else if (programToRun == "movie-this") {
    movieThis();
} else if (programToRun = "do-what-it-says") {
    doWhatItSays();
}

//------------------------------------------------------------------------------------

function spotifyThisSong() {
    spotify.search({ type: 'track', query: programChoice }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        //  Artist(s)
        //  The song's name
        //  A preview link of the song from Spotify
        //  The album that the song is from

        // console.log(data.tracks.items[0])
        console.log(data.tracks.items[0].artists[0].name);
        console.log(data.tracks.items[0].name);
        console.log(data.tracks.items[0].preview_url)
        console.log(data.tracks.items[0].album.name);
    });
}

//-------------------------------------------------------------------------------------

function myTweets() {

    //time & tweet
    var params = { screen_name: 'shug29' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {

            for (var i = 0; i < 10; i++) {
                console.log(tweets[i].text)
                console.log(tweets[i].created_at)
            }


        }
    });
}

//------------------------------------------------------------------------------------------


function movieThis() {
    var movieName = programChoice.split(" ").join("+");
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    // This line is just to help us debug against the actual URL.

    
    request(queryUrl, function (error, response, body) {

        // If the request is successful
        if (!error && response.statusCode === 200) {

            // Parse the body of the site and recover just the imdbRating
            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
            console.log(JSON.parse(body).Title);
            console.log(JSON.parse(body).Year);
            console.log(JSON.parse(body).imdbRating);
            console.log(JSON.parse(body).Ratings[1].Value);
            console.log(JSON.parse(body).Country);
            console.log(JSON.parse(body).Language);
            console.log(JSON.parse(body).Plot);
            console.log(JSON.parse(body).Actors);
        }
    });
}

// * Title of the movie.
// * Year the movie came out.
// * IMDB Rating of the movie.
// * Rotten Tomatoes Rating of the movie.
// * Country where the movie was produced.
// * Language of the movie.
// * Plot of the movie.
// * Actors in the movie.
//---------------------------------------------------------------------------------------------


function doWhatItSays() {
    console.log("Doing what it says")
}