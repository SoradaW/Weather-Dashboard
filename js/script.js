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

