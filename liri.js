require('dotenv').config();
const Spotify = require('node-spotify-api');

// Import API keys from keys.js file
const keys = require('./keys.js');
const spotify = new Spotify(keys.spotify);



// COMMANDS:
// concert-this
// spotify-this-song
// movie-this
// do-what-it-says



const command = process.argv[2];
let query = '';
for (let i = 3; i < process.argv.length; i++) {
  query = query + " " + process.argv[i];
};


// --------------------------------------------------------------
// concert-this
// var queryURL = `https://rest.bandsintown.com/artists/${query}/events?app_id=codingbootcamp`;



// spotify-this-song : Search Spotify API by song name
// display: artist, song name, preview link, album
const spotifyThisSong = () => {
  spotify.search({ type: 'track', query: "love shack"}, (err, data) => {
    if (err) {
      return console.log ('Error occurred: ' + err);
    }
  
    const artists = [];
    for (let i = 0; i < data.tracks.items.length; i++) {
      artists.push(data.tracks.items[i].artists);
    }

    console.log(artists);
    if (artists){
      artists.forEach(function (element) {
        console.log(`Artists: ${element[0].name}`);
      });
    }

    const songs = (data.tracks.items[0]);
    console.log("album name: " + songs.album.name);
    //console.log("artist(s): " + songs[i].artists.names);
    console.log("song name: " + songs.name);
    console.log("preview song: " + songs.external_urls.spotify);

    console.log("----------------------------------------");
  });
}


// --------------------------------------------------------------
// movie-this : Search OMDB API by movie name
// display: title, year, IMDB rating, Rotten Tomatoes rating, country, language, plot, actors
const movieThis = () => {
  const request = require("request");
  const omdbURL = `http://www.omdbapi.com/?t=${query}&y=&plot=short&apikey=trilogy`;

  console.log(`
              =========================
                  CALLING OMDB API...  
              =========================
              `)

  request(omdbURL, function(err, data, body) {
        if (!err && data.statusCode === 200) {
            const info = JSON.parse(body);
            console.log(`
            Title: ${info.Title}\n
            Release Year: ${info.YeTiar}\n
            IMDB Rating: ${info.imdbRating}\n
            
            Country: ${info.Country}\n
            Language: ${info.Language}\n
            Plot: ${info.Plot}\n
            Actors: ${info.Actors}`);
        }

        console.log(`
          ----------------------------------------
        `);
    });
}


// --------------------------------------------------------------
// do-what-it-says : Using the fs Node package, LIRI will call commands from random.txt
const doWhatItSays = () => {
  const fs = require('fs');
  fs.readFile('random.txt', 'utf8', (err, data) => {
    if (err) {
      return console.log(err);
    }

    const dataArr = data.split(',');
    console.log(dataArr[0] + " " + dataArr[1]);
    command = dataArr[0];
    query = dataArr[1];
    commands();
  });
}


// --------------------------------------------------------------
const commands = () => {
  switch(command) {
    case 'concert-this':
      concertThis();
      break;
    case 'spotify-this-song':
      spotifyThisSong();
      break;
    case 'movie-this':
      movieThis();
      break;
    case 'do-what-it-says':
      doWhatItSays();
      break;
  }
}

commands();