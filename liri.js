require('dotenv').config();

// Import API keys from keys.js file
var keys = require('./keys.js');
var spotify = new Spotify(keys.spotify);


// COMMANDS:
// concert-this
// spotify-this-song
// movie-this
// do-what-it-says

var command = process.argv[2];


// concert-this
// var queryURL = `https://rest.bandsintown.com/artists/${query}/events?app_id=codingbootcamp`;



// spotify-this-song : Search Spotify API by song name
// display: artist, song name, preview link, album
var spotifyThisSong = (query) => {
  var spotify = require('node-spotify-api');
  var query = process.argv[3];

  spotify.search({ type: 'track', query: query}, function(err, data) {
    if (err) {
      return console.log ('Error occurred: ' + err);
    }

    console.log(JSON.stringify(data));
  });
}


// movie-this : Search OMDB API by movie name
// display: title, year, IMDB rating, Rotten Tomatoes rating, country, language, plot, actors
var movieThis = (query) => {
  var query = process.argv[3];
  var request = require('request');
  var omdbURL = `http://www.omdbapi.com/?t=${query}&y=&plot=short&apikey=trilogy`;
  
  request(omdbURL, function(err, data) {
    console.log(`
      Title: ${data.title}\n
      Release Year: ${data.year}\n
      IMDB Rating: ${data.imdbRating}\n
      Rotten Tomatoes Rating: ${data.ratings[1].value}\n
      Country: ${data.country}\n
      Language: ${data.language}\n
      Plot: ${data.plot}\n
      Actors: ${data.actors}`);
  });
}



switch(command) {
  case 'spotify-this-song':
    spotifyThisSong();
    break;
  case 'movie-this':
    movieThis();
    break;
}