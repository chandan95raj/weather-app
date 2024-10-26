const apiKey = 'bd5e378503939ddaee76f12ad7a97608';
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const weatherResult = document.getElementById('weatherResult');


if (localStorage.getItem('lastCity')) {
    fetchWeather(localStorage.getItem('lastCity'));
}

searchBtn.addEventListener('click', () => {
    const cityName = cityInput.value;
    if (cityName) {
        fetchWeather(cityName);
    }
});

async function fetchWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        displayWeather(data);
        localStorage.setItem('lastCity', city);
    } catch (error) {
        weatherResult.innerHTML = `<div class="alert alert-danger" role="alert">${error.message}</div>`;
    }
}

function displayWeather(data) {
    const cityName = data.name;
    const temperature = data.main.temp;
    const weatherCondition = data.weather[0].description;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const icon = data.weather[0].icon;

    weatherResult.innerHTML = `
        <h5>${cityName}</h5>
        <p>Temperature: ${temperature} °C</p>
        <p>Conditions: ${weatherCondition}</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
        <img src="https://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">
    `;
}
