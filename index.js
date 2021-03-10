function changeDay(event){

    let h3 =document.querySelector("#day-time-input");
    h3.innerHTML=`${day}, ${hour}:${minute}`;
}

let now= new Date();
let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
let days= ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day= days[now.getDay()];

let currentTime=document.querySelector("form");
currentTime.addEventListener("submit", changeDay);


function switchCelcius(event){
    event.preventDefault();
    let celciusTemp1= `${fahrenheitTemp}`-32;
    let celciusTemp= `${celciusTemp1}` * 5 / 9;
    document.querySelector("#temp-input").innerHTML=Math.round(`${celciusTemp}`);
}

let celcius=document.querySelector("#current-temp-celcius");
celcius.addEventListener("click", switchCelcius);

function switchFahrenheit(event){
    event.preventDefault();
    document.querySelector("#temp-input").innerHTML=`${fahrenheitTemp}`;
}

let fahrenheitTemp= null;

let fahrenheit=document.querySelector("#current-temp-fahrenheit");
fahrenheit.addEventListener("click", switchFahrenheit);

function displayForecast(response){
    console.log(response.data);
}

function changeCity(event){
    event.preventDefault();
    let cityInput=document.querySelector("#search-text-input");
    let h1=document.querySelector("h1");
    h1.innerHTML=`${cityInput.value}`;


let apiKey= "5b8bfd096caf5847f3506db76bfb75ad";
let url=`https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=imperial`;
axios.get(url).then(displayWeather); 

let forecastUrl= `https://api.openweathermap.org/data/2.5/forecast?q=${cityInput.value}&appid=${apiKey}&units=imperial`;
axios.get(forecastUrl).then(displayForecast);
}
let city=document.querySelector("form");
city.addEventListener("submit", changeCity);

function showPosition(position){
    let latitude=(position.coords.latitude);
    let longitude=(position.coords.longitude);

    let apiKey= "5b8bfd096caf5847f3506db76bfb75ad";
    let geoUrl= `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;
    axios.get(geoUrl).then(displayWeather);

    let forecastUrl= `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;
    axios.get(forecastUrl).then(displayForecast);
}

function displayWeather(response){
    console.log(response);
    let temperatureElement=Math.round(response.data.main.temp);
    let locationElement= (response.data.name);
    let conditionElement=(response.data.weather[0].description);
    let windSpeedElement=Math.round(response.data.wind.speed);
    let humidityElement=Math.round(response.data.main.humidity);
    let feelslikeElement=Math.round(response.data.main.feels_like);
    let iconElement=document.querySelector(".condition-icon");
    fahrenheitTemp=Math.round(response.data.main.temp);
    celciusTemp=Math.round(`(${fahrenheitTemp}−32)×5/9`);
    
    document.querySelector("#temp-input").innerHTML=`${temperatureElement}`;
    document.querySelector("h1").innerHTML=`${locationElement}`;
    document.querySelector("#current-condition-input").innerHTML=`${conditionElement}`;
    document.querySelector("#wind-speed-input").innerHTML=`${windSpeedElement}`;
    document.querySelector("#humidity-input").innerHTML=`${humidityElement}`;
    document.querySelector("#real-feel-input").innerHTML=`${feelslikeElement}`;
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
}

function getCurrentPosition(event){
    navigator.geolocation.getCurrentPosition(showPosition);
}    


let locationButton=document.querySelector(".btn-current-city");
locationButton.addEventListener("click", getCurrentPosition);




