// store api key from OpenWeatherMap 
const APIKey = "&0a85def07157d9d6ca1994063d06cb9e";

//store the value of the input
let city = $("#search-input").val().trim();
let date = new Date();

$("#search-input").keypress(function(e){
  //keyCode 13 is the "Enter" key
  if(e.keyCode === "Enter"){
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
})
.then(function(response){
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
  //get the temperature and convert from Kalvin to celcius
  let tempInCelcius = parseFloat(response.main.temp) - 273.15; //parseFloat() method parses a value as a string and returns the first number
  tempInCelcius = Math.floor(tempInCelcius); //Math.floor() method rounds a number DOWN to the nearest integer

  $("#currentCity").empty();

  //addClass to the forcast content
  const card = $("<div>").addClass("card");
  const cardBody = $("<div>").addClass("card-body");
  const city = $("<h4>").addClass("card-title").text(response.name);
  const cityDate = $("<h4>").addClass("card-title").text(date.toLocaleDateString("en-gb"));
  const temperature = $("<p>").addClass("card-text current-temp").text("Temparature: " + tempInCelcius + " °C");
  const humidity = $("<p>").addClass("card-text current-humidity").text("Humidity: " + response.main.humidity + "%");
  const wind = $("<p>").addClass("card-text current-wind").text("Wind Speed: " + response.wind.speed + " MPH");
  const image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png");

  //add elements to page
  city.append(cityDate, image);
  cardBody.append(city, temperature, humidity, wind);
  card.append(cardBody);
  $("#currentCity").append(card);
}

//currentForecast function
function currentForecast(){

  $.ajax({
    url: queryURL,
    method: "GET"
  })
  .then(function(response){
    console.log(response);
    console.log(response.dt);

    $("#forecast").empty();

    let results = response.list;
    console.log(results);

    for(let i =0; i < results.length; i++){
      let day = Number(re)
    }
  })
}