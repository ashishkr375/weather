const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');

const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');
const loadingSpinner = document.getElementById('loadingSpinner');

async function checkWeather(city){
    showLoadingSpinner();

    const api_key = "94978dafad02672046620496f81cc592";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    try {
        const weather_data = await fetch(url).then(response => response.json());

        if(weather_data.cod === `404`){
            displayError();
            return;
        }

        displayWeather(weather_data);
    } catch (error) {
        console.error(error);
        displayError();
    } finally {
        hideLoadingSpinner();
    }
}

function showLoadingSpinner() {
    loadingSpinner.style.display = 'block';
}

function hideLoadingSpinner() {
    loadingSpinner.style.display = 'none';
}

function displayError() {
    location_not_found.style.display = "flex";
    weather_body.style.display = "none";
}

function displayWeather(weather_data) {
    location_not_found.style.display = "none";
    weather_body.style.display = "flex";
    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
    description.innerHTML = `${weather_data.weather[0].description}`;
    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;

    switch(weather_data.weather[0].main){
        case 'Clouds':
            weather_img.src = 'assets/cloud.png';
            break;
        case 'Clear':
            weather_img.src = 'assets/clear.png';
            break;
        case 'Rain':
            weather_img.src = 'assets/rain.png';
            break;
        case 'Mist':
            weather_img.src = 'assets/mist.png';
            break;
        case 'Snow':
            weather_img.src = 'assets/snow.png';
            break;
    }
}

searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value);
});
