const apiKey = '6fa18b230ecc5e9727bec16cbe3e1b2d'; 
const searchInput = document.querySelector('.search input');
const searchButton = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');
const tempElement = document.querySelector('.temp');
const cityElement = document.querySelector('.city');
const humidityElement = document.querySelector('.humidity');
const windElement = document.querySelector('.wind');

function getWeatherIcon(condition) {
    const icons = {
        Thunderstorm: 'fas fa-bolt',
        Drizzle: 'fas fa-cloud-rain',
        Rain: 'fas fa-cloud-showers-heavy',
        Snow: 'fas fa-snowflake',
        Clear: 'fas fa-sun',
        Clouds: 'fas fa-cloud',
        Mist: 'fas fa-smog',
        Smoke: 'fas fa-smog',
        Haze: 'fas fa-smog',
        Dust: 'fas fa-wind',
        Fog: 'fas fa-smog',
        Sand: 'fas fa-wind',
        Ash: 'fas fa-smog',
        Squall: 'fas fa-wind',
        Tornado: 'fas fa-wind',
    };
    return icons[condition] || 'fas fa-cloud'; 
}

// Function to fetch weather data
async function fetchWeather(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );
        if (!response.ok) throw new Error('City not found');
        const data = await response.json();

        // Update the weather details
        const condition = data.weather[0].main;
        weatherIcon.className = `weather-icon ${getWeatherIcon(condition)}`;
        tempElement.textContent = `${Math.round(data.main.temp)}°c`;
        cityElement.textContent = data.name;
        humidityElement.textContent = `${data.main.humidity}%`;
        windElement.textContent = `${data.wind.speed} km/h`;
    } catch (error) {
        alert(error.message);
    }
}

// Event listeners for search button and input field
searchButton.addEventListener('click', () => {
    const city = searchInput.value.trim();
    if (city) {
        fetchWeather(city);
    } else {
        alert('Please enter a city name');
    }
});

searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const city = searchInput.value.trim();
        if (city) {
            fetchWeather(city);
        } else {
            alert('Please enter a city name');
        }
    }
});
