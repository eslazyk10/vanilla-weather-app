function formatDate(timestamp){
    let date = new Date(timestamp);
    
    let days= ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day= days[date.getDay()];
    return `${day}, ${formatHours(timestamp)}`;
}

function formatHours(timestamp){
    let date = new Date(timestamp);
    let hour = date.getHours();
        if (hour < 10) {
    hour = `0${hour}`;
  }
        if (hour > 12) {
            hour=`${hour}` - 12;
        }
    let minute= date.getMinutes();
        if (minute < 10) {
    minute = `0${minute}`;
  }
    
    return `${hour}:${minute}`;
}

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
    let forecastElement=document.querySelector("#forecast");
    let forecast= null;
    forecastElement.innerHTML=null;
    console.log(forecast);

    for (let index = 0; index <=5; index++) {
        let forecast=(response.data.list[index]);
        forecastElement.innerHTML += `
    <div class="col-2">
            <li class="first">
                <strong><span id="first-day">${formatHours(forecast.dt * 1000)}</span><span class="am-pm"></span>
                    <br>
                <img class="weather-forecast-icon" id="weather-icon-first" src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="" width="50px">                    <br>
                <span id="first-day-temp">${Math.round(forecast.main.temp)}°</span>
                </strong>
                <div class="units">
                    <a href="#" class="units" id="future-temp-fahrenheit">°F/</a>
                    <a href="#" class="units" id="future-temp-celcius">°C</a>
                </div>
            </li>
        </div>`;
        
    }
}

function search(city){
    let apiKey= "5b8bfd096caf5847f3506db76bfb75ad";
let url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
axios.get(url).then(displayWeather); 

    let forecastUrl= `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;
axios.get(forecastUrl).then(displayForecast);
}

function handleSubmit(event){
    event.preventDefault();
    let cityInput=document.querySelector("#search-text-input");
    search(cityInput.value);
    let h1=document.querySelector("h1");
    h1.innerHTML=`${cityInput.value}`;
}

search("Nashville");

let form=document.querySelector("form");
form.addEventListener("submit", handleSubmit);

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
    let dateElement=document.querySelector("#day-time-input");
    let iconElement=document.querySelector(".condition-icon");
    fahrenheitTemp=Math.round(response.data.main.temp);
    celciusTemp=Math.round(`(${fahrenheitTemp}−32)×5/9`);
    
    document.querySelector("#temp-input").innerHTML=`${temperatureElement}`;
    document.querySelector("h1").innerHTML=`${locationElement}`;
    document.querySelector("#current-condition-input").innerHTML=`${conditionElement}`;
    document.querySelector("#wind-speed-input").innerHTML=`${windSpeedElement}`;
    document.querySelector("#humidity-input").innerHTML=`${humidityElement}`;
    document.querySelector("#real-feel-input").innerHTML=`${feelslikeElement}`;
    dateElement.innerHTML= formatDate(response.data.dt * 1000);
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
}

function getCurrentPosition(event){
    navigator.geolocation.getCurrentPosition(showPosition);
}    

let locationButton=document.querySelector(".btn-current-city");
locationButton.addEventListener("click", getCurrentPosition);