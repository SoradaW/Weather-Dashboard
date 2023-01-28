// store api key from OpenWeatherMap 
const APIKey = "&0a85def07157d9d6ca1994063d06cb9e";

//store the value of the input
let city = $("#search-input").val();
let date = new Date();
let searchHistoryList = [];

//currentConditions function
function currentConditions(city){
  let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`;

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response){
      console.log(response);

    $("#weather-content").css("display", "block");
    $("#current-city").empty();

    let iconImg = response.weather[0].icon;
    let iconURL = `https://openweathermap.org/img/w/${iconImg}.png`;
    
    let currentCity = $(`
      <h2 id="current-city">
        ${response.name} ${today} <img src="${iconURL}" alt="${response.weather[0].description}" /> </h2>
      <p>Temperature: ${response.main.temp} °C</p>
      <p>Humidity: ${response.main.humidity} %</p>
      <p>Wind Speed: ${response.wind.speed} MPH</p>
    `);

    $("#city-detail").append(currentCity);
  });
}