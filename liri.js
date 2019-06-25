require('dotenv').config();
const Spotify = require('node-spotify-api');
const request = require('request');
const axios = require('axios');
const moment = require('moment');

// Import API keys from keys.js file
const keys = require('./keys.js');
const spotify = new Spotify(keys.spotify);


// User input
let command = process.argv[2];
let nodeArgs = process.argv;
let searchQuery = '';

for (let i = 3; i < nodeArgs.length; i++) {
  if (i > 3 && i < nodeArgs.length) {
    searchQuery = searchQuery + '+' + nodeArgs[i];
  } else {
    searchQuery += nodeArgs[i];
  }
}



// CONCERT-THIS
// --------------------------------------------------------------
const concertThis = () => {
 const bitURL = `https://rest.bandsintown.com/artists/${searchQuery}/events?app_id=codingbootcamp`;

 console.log(`
      =========================
          CALLING BIT API...  
      =========================`)

 request(bitURL, (err, data, body) => {
  if (!err && data.statusCode === 200) {
    const concerts = JSON.parse(body);
      
    for (let i = 0; i < concerts.length; i++) {
      eventDate = concerts[i].datetime;
      convertTime = moment(eventDate)
      console.log(`
      Venue Name: ${concerts[i].venue.name}
      Venue Location: ${concerts[i].venue.city}
      Event Date: ${convertTime.format('L')}
      `);
    }
  }
 });
}


// SPOTIFY-THIS-SONG : Search Spotify API by song name
// display: artist, song name, preview link, album
// --------------------------------------------------------------
const spotifyThisSong = () => {

  console.log(`
    =========================
      CALLING SPOTIFY API... 
    =========================`)
  const getSongInfo = () => {
    spotify.search({ type:'track', query:searchQuery, limit: 2 }, (err, data) => {
      if (err) {
        return console.log ('Error occurred: ' + err);
      }
    

      // Get artist names...
      let artists = [];
      for (let i = 0; i < data.tracks.items.length; i++) {
          artists.push(data.tracks.items[i].artists);
      }

      if (artists){
        artists.forEach((element) => {
          if (artists.includes(element[0].name)) {
            return false;
          } else {
          console.log(`Artist: ${element[0].name}`);
          }
        });
      }


      // Get song name...
      let songs = [];
      for (let i = 0; i < data.tracks.items.length; i++) {
        songs.push(data.tracks.items[i].name);
    }

      for (let i = 0; i < songs.length; i++) {
        console.log(`Song: ${songs[i]}`);
      }


      // Get album names...
      let albums = [];
      for (let i = 0; i < data.tracks.items.length; i++) {
        albums.push(data.tracks.items[i].album);
      }

      for (let i = 0; i < albums.length; i++) {
        console.log(`Album: ${albums[i].name}`);
      }


      // Get preview URL
      let preview = [];
      for (let i = 0; i < data.tracks.items.length; i++) {
        preview.push(data.tracks.items[i].external_urls.spotify);
      }

      for (let i = 0; i < preview.length; i++) {
        console.log(`Album: ${preview[i]}`);
      }
    
      console.log("----------------------------------------");
    });
  }

  // If no user input is defined, search for the song: "The Sign" by Ace of Base
  if (searchQuery === "") {
    searchQuery = "The Sign";
    getSongInfo()
  } else {
    getSongInfo()
  }
}



// MOVIE-THIS : Search OMDB API by movie name
// display: title, year, IMDB rating, Rotten Tomatoes rating, country, language, plot, actors
// --------------------------------------------------------------
const movieThis = () => {
  const getMovieInfo = () => {
    const omdbURL = `http://www.omdbapi.com/?t=${searchQuery}&y=&plot=short&apikey=trilogy`;
    axios.get(omdbURL).then(function(response) {
    
      console.log(`
      Title: ${response.data.Title}\n
      Release Year: ${response.data.Year}\n
      IMDB Rating: ${response.data.imdbRating}\n
      Rotten Tomatoes Rating: ${response.data.Ratings[1].Value}\n
      Country: ${response.data.Country}\n
      Language: ${response.data.Language}\n
      Plot: ${response.data.Plot}\n
      Actors: ${response.data.Actors}`);
      console.log(`
      ----------------------------------------
      `);
    })

    .catch(function(error) {
      if (error.response) {
        console.log(`
        Data: ${error.response.data}
        Status: ${error.response.stauts}
        Headers: ${error.response.headers}`)
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);
    })
  }

  console.log(`
    =========================
        CALLING OMDB API...  
    =========================`)
  
  // If no user input is defined, search for movie: "Mr. Nobody"
  if (searchQuery === "") {
    searchQuery = "Mr. Nobody";
    console.log('If you haven\'t watched Mr. Nobody, then you should: <http://www.imdb.com/title/tt0485947/>');
    console.log('It\'s on Netflix!');
    getMovieInfo();
  } else {
    getMovieInfo();
  }
}



// DO-WHAT-IT-SAYS : Using the fs Node package, LIRI will call commands from random.txt
// --------------------------------------------------------------
const doWhatItSays = () => {
  const fs = require('fs');
  fs.readFile('random.txt', 'utf8', (err, data) => {
    if (err) {
      return console.log(err);
    }

    let dataArr = data.split(',');
    console.log(dataArr[0] + " " + dataArr[1]);
    command = dataArr[0];
    searchQuery = dataArr[1];
    commands();
  });
}


// COMMANDS:
// --------------------------------------------------------------

// concert-this
// spotify-this-song
// movie-this
// do-what-it-says


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