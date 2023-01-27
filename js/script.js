// store api key from OpenWeatherMap 
const apiKey = "&0a85def07157d9d6ca1994063d06cb9e";

//store the value of the input
let currentCity = $("#search-input").val().trim();
let date = new Date();

$("#search-input").keypress(function(e){
  if(e.keyCode === 13){
    e.preventDefault();
    $("#search-button").click();
  }
});

$("#search-button").on("click", function(){

  $("#forecast-heading").addClass("show");

  //get the value from user input
  currentCity = $("#search-input").val().trim();

  //clear input box
  $("#search-input").val("");
});

//full URL to call API
const queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + currentCity + apiKey;