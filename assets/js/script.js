// store api key from OpenWeatherMap 
const APIKey = "0a85def07157d9d6ca1994063d06cb9e";

//store the value of the input
let today = moment().format("L"); //L=Month numeral, day of month, year
let searchHistoryList = [];

//currentConditions function
function currentConditions(city){

  let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(currentResponse){
    console.log(currentResponse);
        
    $("#weather-content").css("display", "block");
    $("#city-detail").empty(); //remove all child nodes of the set of matched elements from the DOM
        
    let iconImg = currentResponse.weather[0].icon;
    let iconURL = `https://openweathermap.org/img/w/${iconImg}.png`;

    //displays info below in main card
    let currentCity = $(`
      <h2 id="current-city">
        ${currentResponse.name} ${today} <img src="${iconURL}" alt="${currentResponse.weather[0].description}" /> </h2>
      <p>Temperature: ${currentResponse.main.temp} °C</p>
      <p>Humidity: ${currentResponse.main.humidity}%</p>
      <p>Wind Speed: ${currentResponse.wind.speed} MPH</p>
   `);
    let lat = currentResponse.coord.lat;
    let lon = currentResponse.coord.lon;

    $("#city-detail").append(currentCity);
    futureConditions(lat, lon);
  });
}

//function for future condition
function futureConditions(lat, lon){

  //5 days forecast
  let futureURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=current,minutely,hourly,alerts&appid=${APIKey}`;

  $.ajax({
    url: futureURL,
    method: "GET"
  }).then(function(futureResponse){
    console.log(futureResponse);

    $("#five-day").empty();
        
    for(let i = 1; i < 6; i++){
      let cityDetail = {
        date: futureResponse.daily[i].dt,
        icon: futureResponse.daily[i].weather[0].icon,
        temp: futureResponse.daily[i].temp.day,
        humidity: futureResponse.daily[i].humidity
      };

    //The moment().unix() function is used to get the number of seconds since the Unix Epoch
      let currentDate = moment.unix(cityDetail.date).format("MM/DD/YYYY");
      let iconURL = `<img src="https://openweathermap.org/img/w/${cityDetail.icon}.png" alt="${futureResponse.daily[i].weather[0].main}" />`;

    //displays info below in future card
      let futureCard = $(`
        <div class="pl-3">
          <div class="card pl-3 pt-3 mb-3 bg-primary text-light" style="width: 12rem;>
            <div class="card-body">
              <h5>${currentDate}</h5>
              <p>${iconURL}</p>
              <p>Temp: ${cityDetail.temp} °C</p>
              <p>Humidity: ${cityDetail.humidity}%</p>                           
            </div>
          </div>
        </div>
      `);

      $("#five-day").append(futureCard);
    }
  }); 
}

//add event listener
$("#search-button").on("click", function(e){
  e.preventDefault();

  let city = $("#enter-city").val().trim();
  currentConditions(city);
  if (!searchHistoryList.includes(city)){
    searchHistoryList.push(city);
    let searchCity = $(`
      <li class="list-group-item">${city}</li>
      `);
    $("#search-history").append(searchCity);
  };
  
  localStorage.setItem("city", JSON.stringify(searchHistoryList));
  console.log(searchHistoryList);
});

//presented with current and future conditions for new entry city
$(document).on("click", ".list-group-item", function(){
  let listCity = $(this).text();
  currentConditions(listCity);
});

//displays previous searched when reload page .ready
$(document).ready(function(){
  let searchHistoryArr = JSON.parse(localStorage.getItem("city"));

  if (searchHistoryArr !== null) {
    let previousIndex = searchHistoryArr.length - 1;
    let previousCity = searchHistoryArr[previousIndex];
    currentConditions(previousCity);
    console.log(`Previous searched city: ${previousCity}`);
  }
});
