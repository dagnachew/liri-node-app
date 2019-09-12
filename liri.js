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

if (task === 'movie-this') {
  moviethis(term);
  
} else if (task === 'spotify-this-song') {
  spotifythissong(term);

} else if (task === 'concert-this') {
  bandsintown(term);

} else if (task === 'do-what-it-says') {
  dowhat(term);
}
  

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

// moviethis(term);

//===============================================================spotify-this-song==========================================================================================

function spotifythissong(term) {
  if(!term){
    term = "Ace of Base";
  } 
spotify
  .search({ type: 'track', query: term })
  .then(function(response) {
    // console.log(response);
    for(let i = 0; i < 3; i++) {
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
// spotifythissong(term);


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



//===============================================================concert-this==============================================================================================


function bandsintown(term) {

    const URL = "https://rest.bandsintown.com/artists/" + term + "/events?app_id=codingbootcamp";
    axios.get(URL).then(
        function(response) {
          for(let i = 0; i < response.data.length; i++){
            console.log(`
            Venue: ${response.data[i].venue.name}
            Location: ${response.data[i].venue.city}
            Date of Event: ${response.data[i].datetime}
          `);
          }

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

// bandsintown(term);


//===============================================================do-what-it-says==============================================================================================


function dowhat(term) {

// This block of code will read from the "random.txt" file.
// It's important to include the "utf8" parameter or the code will provide stream data (garbage)
// The code will store the contents of the reading inside the variable "data"
fs.readFile("random.txt", "utf8", function(error, data) {

  // If the code experiences any errors it will log the error to the console.
  if (error) {
    return console.log(error);
  }

  // We will then print the contents of data
  console.log(data.split(","));

});

}






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