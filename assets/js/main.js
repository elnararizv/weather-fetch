let input = document.querySelector('.inp');
const API_KEY = 'f487e1ed706e0b8aae40600baef2bf17';
const dayDisplay = document.querySelector('.toDay');
const weatherSection = document.querySelector('.weatherSec');

input.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        let cityName = input.value;
        console.log(cityName);
        toDayWeather(cityName);
        dailyWeatherFetched(cityName);
    }
});

function toDayWeather(cityName) {
    const dayWeath = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;
    console.log(dayWeath);
    fetch(dayWeath)
        .then(res => res.json())
        .then(data => {
            let temp = Math.floor(data.main.temp)
            dayDisplay.innerHTML = `
                <div>
                    <p class="h3 mb-2">${data.name}</p>
                    <p class="h4">${temp} °C</p>  
                    <p style="font-style: italic;">${data.weather[0].main}</p>
                    <p>${data.wind.speed} km/h</p>
                    <p>${data.main.humidity} %</p>
                  
                </div>`;
        })
        .catch(err => {
            console.log(err);
        });
}

function dailyWeatherFetched(cityName) {
    const dailyWeath = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`;
    console.log(dailyWeath);
    fetch(dailyWeath)
        .then(res => res.json())
        .then(data => {
            weatherSection.innerHTML = "";
            dailyWeather(data);
        })
        .catch(err => {
            console.log(err);
        });
}


function dailyWeather(data) {
    let days = {};
    data.list.forEach(item => {
        let date = item.dt_txt.split(' ')[0];
        console.log(date)
        if (!days[date]) {
            days[date] = [];
            console.log(days)
        }
        days[date].push(item);

    });

    for (const date in days) {
        let temp = Math.floor(days[date][0].main.temp);
        let nightTemp = Math.floor(days[date][0].main.temp_min);
        let weatherData = days[date][0];

        weatherSection.innerHTML += `
            <div class="card col-xl-3 col-lg-3 col-md-4 mx-1 my-2 weatherCard" style="color: #4B515D; border-radius: 20px;background-color:#68a3de; opacity:.9;">
                <div class="card-body py-2">
                    <div class="d-flex">
                        <h6 class="flex-grow-1">${date}</h6>
                    </div>
                    <div class="d-flex flex-column text-center my-2">
                        <h6 class="display-4 mb-0 font-weight-bold" style="color: #1C2331;">${temp}°C</h6>
                        <h5 class="small" style="color: #4e5157">${weatherData.weather[0].main}</h5>
                    </div>
                    <div class="d-flex align-items-center">
                        <div class="flex-grow-1" style="font-size: 1rem;">
                            <div><i class="fas fa-wind fa-fw" style="color: #4e5157;"></i> <span class="ms-1">${weatherData.wind.speed} km/h</span></div>
                            <div><i class="fas fa-tint fa-fw" style="color: #4e5157;"></i> <span class="ms-1">${weatherData.main.humidity}%</span></div>
                            <div><i class="fas fa-moon fa-fw" style="color: #4e5157;"></i> <span class="ms-1">${nightTemp}°C</span></div>
                        </div>
                        <div>
                            <img src="https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png" width="95px" id="weatherimg">
                        </div>
                    </div>
                </div>
            </div>`;
    }
}


input.addEventListener('input', function () {
    if (input.value === "") {
        dayDisplay.innerHTML = " ";
        weatherSection.innerHTML = " ";
    }
});



