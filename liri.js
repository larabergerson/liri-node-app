require("dotenv").config();
var keys = require("./keys.js");
var spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var inquirer = require("inquirer");
var moment = require("moment");
moment().format();
var fs = require("fs");

inquirer.prompt([

    {
      type: "input",
      name: "name",
      message: "Who are you???"
    },
]);

var axios = require("axios");


var userInput = process.argv;
var inputOption = process.argv[2];
var artist = "";
var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
  console.log(queryUrl);
// bands in town first
axios.get(queryURL).then(function(response) {
    console.log(Artist + " will be playing at " + response.data[0].name);
    console.log("\n-----------------");
    console.log("Location: " + error.response.data[0].venue.city + ", " + error.response.data[0].venue.region);
    console.log("\n-----------------");
    console.log(moment(response.data[0].datetime).format("MM/DD/YYY"));
    console.log("\n-----------------");

  });
// Song
spotify.request('https://api.spotify.com/v1/search?q=track:' + song + '&type=track&limit=5', function(error, response) {
        if (error){
            return console.log(error);
        }
        console.log("\n-----------------");
        console.log("Artist: " + response.tracks.items[0].artists[0].name);
        console.log("Song: " + response.tracks.items[0].name);
        console.log("URL: " + rsponse.tracks.items[0].preview_url);
        console.log("Album: " + response.tracks.items[0].album.name);
        console.log("\n-----------------");
    });

// Movie

// Do what it says

// switch statement to draw command
switch(inputOption) {
    case "concert-this": 
    artistInfo();
    break;
    case "spotify-this-song": 
    songInfo();
    break;
    case "movie-this": 
    movieInfo();
    break;
    case "do-what-it-says": 
    doWhatInfo();
    break;
};

console.log(userInput);

// variables and functions to generate API search
function artistInfo (){
    var artist = " ";
    for (var i = 3; i < userInput.length; i++){
        if (i > 3 && i < userInput.length){
            artist = artist + "+" + userInput[i];
        }
        else{
            artist += userInput[i];
        }
    };
}

function songInfo(){
    var song = "";
    for (var i = 3; i < userInput.length; i++){
        if (i > 3 && i < userInput.length){
            song = song + "+" + userInput[i];
        }
        else{
            song += userInput[i];
        }
    };
}
function movieInfo(){
    var movie = "";
    for (var i = 3; i < userInput.length; i++){
        if (i > 3 && i < userInput.length){
            movie = movie + "+" + userInput[i];
        }
        else{
            movie += userInput[i];
        }
    };
}
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



// }

//   .get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy")
//   .then(function(response) {
//     console.log("The movie's rating is: " + response.data.imdbRating);
//   });
