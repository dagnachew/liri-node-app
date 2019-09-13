const bandsIntown = require("./concertthis.js");
const spotifyThis = require("./spotifythis.js");
const dowhat = require("./dothis.js");
const moviethis = require("./moviethis.js");

// Grab task command line argument
const task = process.argv[2];
const term = process.argv[3];

if (task === 'movie-this') {
  moviethis(term);
  
} else if (task === 'spotify-this-song') {
  spotifyThis(term);

} else if (task === 'concert-this') {
  bandsIntown(term);

} else if (task === 'do-what-it-says') {
  dowhat(term);
}