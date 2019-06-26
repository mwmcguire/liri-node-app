# liri-node-app
Language Interpretation Recognition Interface

LIRI is a command line nope app that takes in parameters and gives you back data.

NPM Packages to Install:
- Node-Spotify-API (https://www.npmjs.com/package/node-spotify-api)
- Axios (https://www.npmjs.com/package/axios)
- Moment (https://www.npmjs.com/package/moment)
- DotEnv (https://www.npmjs.com/package/dotenv)

Available Commands:
- concert-this <band name> : Retrieves data from the Bands in Town API to list venue names, locations, and event dates.
  
  ![concert-this](https://github.com/mwmcguire/liri-node-app/tree/master/images/concert-this.png)
  
- spotify-this-song <song name> : Retrieves data from the Spotify API to list artist names, song name, a preview link of the song from Spotify and the album that the song is from.
  
  ![spotify-this-song](https://github.com/mwmcguire/liri-node-app/tree/master/images/spotify-this-song.png)
  
- movie-this <movie name> : Retrieves data from the OMDB API to list movie title, year the movie came out, IMDB rating of the movie, Rotten Tomatoes rating of the movie, Country where the movie was produced, language of the movie, plot of the movie, and actors in the movie.
  
  ![movie-this](https://github.com/mwmcguire/liri-node-app/tree/master/images/movie-this.png)
  
- do-what-it-says : Uses the 'fs' Node package to take the text inside of random.txt and use it to call on of LIRI's commands.

  ![do-what-it-says](https://github.com/mwmcguire/liri-node-app/tree/master/images/do-what-it-says.png)
