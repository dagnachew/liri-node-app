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
    term = "Mr Nobody";
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

//=========================================================================================================================================================


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