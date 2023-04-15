const API_ENDPOINT_MAIN = "http://api.openweathermap.org/data/2.5/weather?q=";
const API_ENDPOINT_END = "&units=metric&APPID=5d066958a60d315387d9492393935c19";

const form = document.querySelector(".top-banner form");

form.addEventListener("submit", e => {
    e.preventDefault();
    const input = document.querySelector(".top-banner input");
    const msg = document.querySelector(".top-banner .msg");
    let inputVal = input.value;

    //ajax here
    const url = `${API_ENDPOINT_MAIN}${inputVal}${API_ENDPOINT_END}`

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const { main, name, sys, weather, wind } = data;
            const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;

            const cityWeather = document.querySelector(".cityWeather");
            cityWeather.classList.add("city");
            cityWeather.innerHTML = `
                <h2 class="city-name" data-name="${name},${sys.country}">
                    <span>${name}</span>
                    <sup>${sys.country}</sup>
                </h2>
                <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
                <div class="city-pressure">${main.pressure} hPa</div>              
                <div class="city-wind">Humidity: ${main.humidity} %</div>
                <div class="city-wind">Wind: ${wind.deg}<sup>°</sup> ${Math.round(wind.speed)} m/s,</br> gust: ${Math.round(wind.gust)} m/s</div>
                <figure>
                    <img class="city-icon" src="${icon}" alt="${weather[0]["description"]}">
                    <figcaption>${weather[0]["description"]}</figcaption>
                </figure> 
            `;
            
        })
        .catch(() => {
            msg.textContent = "Please search for a valid city 😩";
        });

    msg.textContent = "";
    form.reset();
    input.focus();
});