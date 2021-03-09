function changeDay(event){

    let h3 =document.querySelector("#day-time-input");
    h3.innerHTML=`${day}, ${hour}:${minute}`;
}

let now= new Date();
console.log(new Date);
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
console.log(`${day}, ${hour}:${minute}`);

let currentTime=document.querySelector("form");
currentTime.addEventListener("submit", changeDay);


function switchCelcius(event){
    event.preventDefault();
    document.querySelector("#temp-input").innerHTML="17";
}

let celcius=document.querySelector("#current-temp-celcius");
celcius.addEventListener("click", switchCelcius);

function switchFerenheit(event){
    event.preventDefault();
    document.querySelector("#temp-input").innerHTML="66";
}

let ferenheit=document.querySelector("#current-temp-ferenheit");
ferenheit.addEventListener("click", switchFerenheit);

function changeCity(event){
    event.preventDefault();
    let cityInput=document.querySelector("#search-text-input");
    let h1=document.querySelector("h1");
    h1.innerHTML=`${cityInput.value}`;


let apiKey= "5b8bfd096caf5847f3506db76bfb75ad";
let url=`https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=imperial`;
axios.get(url).then(displayWeather); 
}
let city=document.querySelector("form");
city.addEventListener("submit", changeCity);

function showPosition(position){
    console.log(position);
    let latitude=(position.coords.latitude);
    let longitude=(position.coords.longitude);

    let apiKey= "5b8bfd096caf5847f3506db76bfb75ad";
    let geoUrl= `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;
    axios.get(geoUrl).then(displayWeather);
}

function displayWeather(response){
    console.log(response);
    let temperatureElement=Math.round(response.data.main.temp);
    console.log(temperatureElement);
    document.querySelector("#temp-input").innerHTML=`${temperatureElement}`;
    let locationElement= (response.data.name);
    console.log(locationElement);
    document.querySelector("h1").innerHTML=`${locationElement}`;
    let conditionElement=(response.data.weather[0].main);
    console.log(conditionElement);
    document.querySelector("#current-condition-input").innerHTML=`${conditionElement}`;
    let windSpeedElement=Math.round(response.data.wind.speed);
    document.querySelector("#wind-speed-input").innerHTML=`${windSpeedElement}`;
    let humidityElement=Math.round(response.data.main.humidity);
    document.querySelector("#humidity-input").innerHTML=`${humidityElement}`;
    let feelslikeElement=Math.round(response.data.main.feels_like);
    document.querySelector("#real-feel-input").innerHTML=`${feelslikeElement}`;
}

function getCurrentPosition(event){
    navigator.geolocation.getCurrentPosition(showPosition);
}    


let locationButton=document.querySelector(".btn-current-city");
locationButton.addEventListener("click", getCurrentPosition);




