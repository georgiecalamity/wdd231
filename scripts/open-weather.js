const currentTemp = document.getElementById('current-temp');
const weatherIcon = document.getElementById('weather-icon');
const captionDesc = document.querySelector('.figcaption-1');
const url = 'https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.64&units=metric&appid=8f0bb1567b4f6339862a8faaca4ea818';



async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            // console.log(data);
            displayResult(data);
        } 
        else {
            throw Error('no good')
        }
    }
    catch(error) {
        console.error(error);
    }
}

apiFetch()

function displayResult(data) {
    const srcIcon = `https://api.openweathermap.org/img/w/${data.weather[0].icon}.png`;
    let desc = `${data.weather[0].description}`;
    
    currentTemp.innerHTML = `${data.main.temp}`;
    captionDesc.innerHTML = desc;
    weatherIcon.setAttribute('src',srcIcon);
    weatherIcon.setAttribute('alt',desc);

}