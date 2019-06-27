require("dotenv").config();
var keys = require("./keys.js");
var spotify = require("node-spotify-api");
var spotify = new spotify (keys.spotify);
var inquirer = require("inquirer");
var moment = require("moment");
moment().format();
var fs = require("fs");
var axios = require("axios");


var userInput = process.argv;
var inputOption = process.argv[2];

// switch statement to draw command
switch(inputOption) {
    case "concert-this": 
    artistInfo();
    break;

    case "spotify-this-song": 
    songInfo();
    // default: "The Sign";
    break;

    case "movie-this": 
    movieInfo();
    // default: "Mr. Nobody";
    break;
    
    case "do-what-it-says": 
    doWhatInfo();
    break;
};

console.log(userInput);
// Function for concert info
// * Name of the venue
// * Venue location
// * Date of the Event (use moment to format this as "MM/DD/YYYY")
function artistInfo (){
    var artist = "";
    for (var i = 3; i < userInput.length; i++){
        if (i > 3 && i < userInput.length){
            artist = artist + "+" + userInput[i];
        }
        else{
            artist += userInput[i];
        }
    };

var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
  console.log(queryUrl);
// bands in town first
axios.get(queryUrl).then(function(response)
 {
    // console.log(response);
    console.log("\n-----------------");
    console.log(artist + " will be playing at " + response.data[0].venue.name);
    console.log("Location: " + response.data[0].venue.city + ", " + response.data[0].venue.region);
    console.log(moment(response.data[0].datetime).format("MM/DD/YYYY"));
    console.log("\n-----------------");

  });
}

// function and call for spotify:
 // * Artist(s)
        // * The song's name
        // * A preview link of the song from Spotify
        // * The album that the song is from  
function songInfo(){
    var song = "";
    for (var i = 5; i < userInput.length; i++){
        if (i > 5 && i < userInput.length){
            song = song + "+" + userInput[i];
        }
        else{
            song += userInput[i];
        }

    };
    spotify.request("https://api.spotify.com/v1/search?q=" + song + "&type=track%2Cartist&market=US&limit=10&offset=5", function(error, response) {
        // console.log(response);
            if (error){
                return console.log(error);
            }
            console.log("\n-----------------");
            console.log("Artist: " + response.tracks.items[0].artists[0].name);
            console.log("Song: " + response.tracks.items[0].name);
            console.log("URL: " + response.tracks.items[0].preview_url);
            console.log("Album: " + response.tracks.items[0].album.name);
            console.log("\n-----------------");
        });
       
};
function movieInfo(){
    var movie = "";
    for (var i = 3; i < userInput.length; i++){
        if (i > 3 && i < userInput.length){
            movie = movie + userInput[i];
        }
        else{
            movie += userInput[i];
        }
    };
    axios
    .get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy")
    .then(function(response) {
              console.log("\n-----------------------------")  
              console.log("Title: " + response.data.Title);
              console.log("Year: " + response.data.Year);
              console.log("Rated: " + response.data.imdbRating);
              console.log("Rotten Tomatoes: " + response.data.Ratings[1].Value);
              console.log("Country: " + response.data.Country);
              console.log("Language: " + response.data.Language);
              console.log("Plot: " + response.data.Plot);
              console.log("Actors: " + response.data.Actors);
              console.log("\n-----------------------------")  
              
          });
  };
// Console Data:
// Title of the movie.
// * Year the movie came out.
// * IMDB Rating of the movie.
// * Rotten Tomatoes Rating of the movie.
// * Country where the movie was produced.
// * Language of the movie.
// * Plot of the movie.
// * Actors in the movie.
  

function doWhatInfo(){

fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }
      var output = data.split(",");
      for (var i = 0; i < output.length; i++) {
          console.log(output[i]);
      }
    });
}
