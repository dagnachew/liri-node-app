require("dotenv").config();

const keys = require("./keys.js");
const axios = require("axios");
const Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify);
const moment = require('moment');
const fs =  require('fs');

// Grab task command line argument
const task = process.argv[2];
const term = process.argv[3]

//=================================================================moviethis function========================================================================================

function moviethis(term) {

  if(!term){
    term = "Mr. Nobody";
  } 
    const URL = "https://www.omdbapi.com/?t=" + term + "&y=&plot=short&apikey=c678e609";
    axios.get(URL).then(
        function(response) {
          console.log(`
          Title: ${response.data.Title}
          Release Date: ${response.data.Year}
          Rating: ${response.data.imdbRating}
          Rotten Tomatoes Rating: ${response.data.Ratings[1].Value}
          Country Produced: ${response.data.Country}
          Language: ${response.data.Language}
          Plot: ${response.data.Plot}
          Actors: ${response.data.Actors}
          `);
        })
        .catch(function(error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log("---------------Data---------------");
            console.log(error.response.data);
            console.log("---------------Status---------------");
            console.log(error.response.status);
            console.log("---------------Status---------------");
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an object that comes back with details pertaining to the error that occurred.
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
}

moviethis(term);

//===============================================================spotify-this-song==========================================================================================

function spotifythissong(term) {
  if(!term){
    term = "The Sign";
  } 
spotify
  .search({ type: 'track', query: term })
  .then(function(response) {
    // console.log(response);
    for(let i = 0; i < response.tracks.items.length; i++) {
      console.log(`
        Artist: ${response.tracks.items[i].artists[0].name}
        Song's Name: ${response.tracks.items[i].name}
        Album: ${response.tracks.items[i].album.name}
        Preview: ${response.tracks.items[i].preview_url}
      `)
    }
  })
  .catch(function(err) {
    console.log(err);
  });

}
spotifythissong(term);


// Usage with Promises
// This package also optionally works with promises. Just omit the callback parameter and the search method returns a promise object containing the response:

// var Spotify = require('node-spotify-api');
 
// var spotify = new Spotify({
//   id: <your spotify client id>,
//   secret: <your spotify client secret>
// });
 
// spotify
//   .search({ type: 'track', query: 'All the Small Things' })
//   .then(function(response) {
//     console.log(response);
//   })
//   .catch(function(err) {
//     console.log(err);
//   });












// if(task === 'movie-this'){
//         // Then run a request with axios to the OMDB API with the movie specified
//     const URL = "https://www.omdbapi.com/?t=" + term + "&y=&plot=short&apikey=c678e609";
//     axios.get(URL).then(
//         function(response) {
//           console.log(`
//           Title: ${response.data.Title}
//           Release Date: ${response.data.Year}
//           Rating: ${response.data.imdbRating}
//           Rotten Tomatoes Rating: ${response.data.Ratings[1].Value}
//           Country Produced: ${response.data.Country}
//           Language: ${response.data.Language}
//           Plot: ${response.data.Plot}
//           Actors: ${response.data.Actors}
//           `);
//         })
//         .catch(function(error) {
//           if (error.response) {
//             // The request was made and the server responded with a status code
//             // that falls out of the range of 2xx
//             console.log("---------------Data---------------");
//             console.log(error.response.data);
//             console.log("---------------Status---------------");
//             console.log(error.response.status);
//             console.log("---------------Status---------------");
//             console.log(error.response.headers);
//           } else if (error.request) {
//             // The request was made but no response was received
//             // `error.request` is an object that comes back with details pertaining to the error that occurred.
//             console.log(error.request);
//           } else {
//             // Something happened in setting up the request that triggered an Error
//             console.log("Error", error.message);
//           }
//           console.log(error.config);
//         });  

// } 