const axios = require("axios");
const moment = require('moment');

const bandsIntown = function bandsintown(term) {

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

module.exports = bandsIntown;


// bandsintown(term);