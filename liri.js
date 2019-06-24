require('dotenv').config();
const Spotify = require('node-spotify-api');
const request = require('request');
const moment = require('moment');


// Import API keys from keys.js file
const keys = require('./keys.js');
const spotify = new Spotify(keys.spotify);



// COMMANDS:
// concert-this
// spotify-this-song
// movie-this
// do-what-it-says



const command = process.argv[2];
const query = process.argv[3];


// --------------------------------------------------------------
// concert-this
const concertThis = () => {
 const bitURL = `https://rest.bandsintown.com/artists/${query}/events?app_id=codingbootcamp`;

 console.log(`
        =========================
            CALLING BIT API...  
        =========================
        `)

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
    
    
    if (artists){
      artists.forEach((element) => {
        if (artists.includes(element[0].name)) {
          return false;
        } else {
        console.log(`Artists: ${element[0].name}`);
        }
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
  const omdbURL = `http://www.omdbapi.com/?t=${query}&y=&plot=short&apikey=trilogy`;

  console.log(`
    =========================
        CALLING OMDB API...  
    =========================
    `)

  request(omdbURL, (err, data, body) => {
    if (!err && data.statusCode === 200) {
      const info = JSON.parse(body);
      console.log(`
      Title: ${info.Title}\n
      Release Year: ${info.YeTiar}\n
      IMDB Rating: ${info.imdbRating}\n
      Rotten Tomatoes Rating: ${info.Ratings[1].Value}\n
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