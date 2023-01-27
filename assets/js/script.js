// store api key from OpenWeatherMap 
const APIKey = "&0a85def07157d9d6ca1994063d06cb9e";

//store the value of the input
let city = $("#search-input").val().trim();
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
  city = $("#search-input").val().trim();

  //clear input box
  //$("#search-input").val("");

//full URL to call API
const queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + APIKey;

$.ajax({
 url: queryURL,
 method: "GET"
}).then(function(response){
  console.log(response);

  console.log(response.name);
  console.log(response.weather[0].icon);

  let tempInCelcius = parseFloat(response.main.temp) - 273.15;
  console.log(Math.floor(tempInCelcius));

  console.log(response.main.humidity);
  console.log(response.wind.speed);

  currentConditions(response);
  currentForecast(response);
  makeList();

  });
});

//makeList function 
function makeList(){
  let listItem = $("<li>").addClass("list-group-item").text(city);
  $(".list").append(listItem);
}

//currentConditions function
function currentConditions(response){
  //get the temperature and convert to celcius
  let tempInCelcius = parseFloat(response.main.temp) - 273.15;
  tempInCelcius = Math.floor(tempInCelcius);

  $("#currentCity").empty();

  //get and set the forcast content
}