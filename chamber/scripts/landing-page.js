document.addEventListener('DOMContentLoaded', ()=>{
    const menuContainer = document.querySelector('.menu-container');
    const burgerButton = document.querySelector('#burger-button');

    burgerButton.addEventListener('click', ()=>{
        menuContainer.classList.toggle('open');

        if (menuContainer.classList.contains('open')) {
            burgerButton.textContent = '✖';
        }
        else {
            burgerButton.textContent = '☰';
        }
    });
});

// footer
const currentYear = new Date().getFullYear();
const copyrightYear = document.getElementById('copyrightYear');
copyrightYear.textContent = `©${currentYear} Ormoc Chamber of Commerce`

const lastModifiedDate = new Date(document.lastModified);
const lastModified = document.getElementById('lastModified');
lastModified.textContent = `Last Modification: ${lastModifiedDate.toLocaleDateString()}`;


const currentTemp = document.querySelector('.current-temp');
const weatherIcon = document.querySelector('.weather-icon');
const description = document.querySelector('.description');
const currentWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=11.04&lon=124.62&units=metric&appid=8f0bb1567b4f6339862a8faaca4ea818';
const forecastWeatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=11.04&lon=124.62&units=metric&appid=8f0bb1567b4f6339862a8faaca4ea818';


// current weather
async function currentWeatherApiFetch() {
    try {
        const response = await fetch(currentWeatherUrl);
        if (response.ok) {
            const data = await response.json();
            // console.log(data);
            displayResults(data);
        } else {
            throw Error('error fetching man bai');
        }
    } catch(error) {
        console.error(error);
    }
}

currentWeatherApiFetch()

function displayResults(data) {
    const desc = data.weather[0].description;
    const temp = data.main.temp;
    const iconSrc = `https://api.openweathermap.org/img/w/${data.weather[0].icon}.png`;

    currentTemp.innerHTML = `<p>${temp}&deg;C</p>`;
    weatherIcon.setAttribute('src', iconSrc);
    weatherIcon.setAttribute('alt', desc);
    description.innerHTML = `<p>desc</p>`;
}

// weather forecast

async function forecastWeatherApiFetch() {
    try {
        const response = await fetch(forecastWeatherUrl);
        if (response.ok) {
            const data = await response.json();
            console.log(data)
            const threeDayForecast = processForecastData(data); 
            displayForecastResults(threeDayForecast);           
        } else {
            throw Error('Error fetching forecast data');
        }
    } catch (error) {
        console.error(error);
    }
}

forecastWeatherApiFetch();



function processForecastData(data) {
    const forecastList = data.list;
    const dailyForecast = [];

    forecastList.forEach((entry) => {
        const time = entry.dt_txt.split(' ')[1];
        if (time === "12:00:00") {
            dailyForecast.push({
                date: entry.dt_txt.split(' ')[0], 
                temp: entry.main.temp,          
                desc: entry.weather[0].description
            });
        }
    });

    return dailyForecast.slice(0, 3);
}

function displayForecastResults(threeDayForecast) {
    const forecastContainer = document.querySelector('.forecast-container');
    forecastContainer.innerHTML = '';

    threeDayForecast.forEach((forecast) => {
        const forecastElement = document.createElement('div');
        forecastElement.classList.add('forecast-day');
        forecastElement.innerHTML = `
            <p><strong>${forecast.date}</strong><p>
            <p>Temperature: ${forecast.temp}°C</p>
            <p>Condition: ${forecast.desc}</p>
        `;
        forecastContainer.appendChild(forecastElement);
    });
}

// spotlight

async function fetchMemberData() {
    try {
        const response = await fetch('data/members.json');
        if (response.ok) {
            const data = await response.json();
            displaySpotlights(data);
        } else {
            throw Error('Error fetching members data');
        }
    } catch (error) {
        console.error(error);
    }
}


function getSpotlights(members, count = 2) {
    const filteredMembers = members.filter(member => 
        member.membership_level === 2 || member.membership_level === 3
    );
    const shuffled = filteredMembers.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}


function displaySpotlights(members) {
    const spotlightContainer = document.querySelector(".spotlights");
    const spotlights = getSpotlights(members, Math.floor(Math.random() * 2) +2);
    spotlightContainer.innerHTML = "";

    spotlights.forEach(member => {
        const spotlight = document.createElement("div");
        spotlight.classList.add("spotlight");
        spotlight.innerHTML = `
            <h3>${member.name}</h3>
            <img src="${member.image}" alt="${member.name} Logo">
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
            <p><strong>Membership Level:</strong> ${member.membership_level === 2 ? 'Silver' : 'Gold'}</p>
        `;
        spotlightContainer.appendChild(spotlight);
    });
}

document.addEventListener("DOMContentLoaded", fetchMemberData);


