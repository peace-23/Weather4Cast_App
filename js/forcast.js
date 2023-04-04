
const temp = document.getElementById("temp"),
    date = document.getElementById("date-time"),
    currentLocation = document.getElementById("location"),
    condition = document.getElementById("condition"),
    rain = document.getElementById("rain"),
    mainIcon = document.getElementById("icon"),
    uvIndex = document.querySelector(".uv-index"),
    uvText = document.querySelector(".uv-Text"),
    windSpeed = document.querySelector(".wind-speed"),
    sunRise = document.querySelector(".sun-rise"),
    sunSet = document.querySelector(".sun-set"),
    // humidity = document.querySelector(".humidity"),
    // visibility = document.querySelector(".visibility"),
    // visibilityStatus = document.querySelector(".visibility-status"),
    // humidityStatus = document.querySelector(".humidity-status"),
    // airQuality = document.querySelector(".air-quality"),
    // airQualityStatus = document.querySelector(".air-quality-status"),
    // weatherCards = document.querySelector("#weather-cards"),
    celciusBtn = document.querySelector(".celcius"),
    fahrenheitBtn = document.querySelector(".fahrenheit"),
    hourlyBtn = document.querySelector(".hourly"),
    weekBtn = document.querySelector(".week"),
    tempUnit = document.querySelectorAll(".temp-unit");




let currentCity = "";
let currentUnit = "c";
let hourlyorWeek = "Week";


// update Date Time
function getDateTime() {
    let now = new Date(),
        hour = now.getHours(),
        minute = now.getMinutes();

    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    hour = hour % 12;
    if (hour < 10) {
        hour = "0" + hour;
    }
    if (minute < 10) {
        minute = "0" + minute;
    }

    let dayString = days[now.getDay()];
    return `${dayString}, ${hour}:${minute}`;

}

date.innerText = getDateTime();

// update time every second
setInterval(() => {
    date.innerText = getDateTime();
}, 1000);

// function to get public ip with fetch

function getPublicIp() {
    fetch("https://geolocation-db.com/json/", {
        method: "GET",
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            currentCity = data.city;
            getWeatherData(data.city, currentUnit, hourlyorWeek);

        });
}
getPublicIp();


function getWeatherData(city, unit, hourlyorWeek) {
    const apikey = "ab2bcf35dac0879659072962af909ed0";

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}`,
        {
            method: "GET",
        }
    )
        .then((response) => response.json())
        .then((data) => {
            let today = data.currentConditions;
            if (unit == "C") {
                temp.innerText = today.temp;
            } else {
                temp.innerText = celciusToFahrenheit(today.temp);
            }
            currentLocation.innerText = data.resolveAddress;
            condition.innerText = today.conditions;
            rain.innerText = "Percipitation" + today.percip + "%";
            uvIndex.innerText = today.uvindex;
            windSpeed.innerText = today.windspeed;
            humidity.innerText = today.humidity + "%";
            visibility.innerText = today.visibility;
            airQuality.innerText = today.winddir;
            measureUvIndex(today.uvidex);
            updateHumidityStatus(today.humidity);
            updateVisibilityStatus(today.visibility);
            updateAirQualityStatus(today.winddir);
            sunRise.innerText = convertTimeTo12HourFormat(today.sunrise);
            sunSet.innerText = convertTimeTo12HourFormat(today.sunset);
            mainIcon.src = getIcon(today.icon);
            changeBackground(today.icon);
            if (hourlyorWeek == "hourly") {
                updateForecast(data.days[0].hours, unit, "day");
            } else {
                updateForecast(data.days, unit, "week");
            }
        })
        .catch((err) => {
            alert("City not found");
        });
}

function celciusToFahrenheit(temp) {
    return ((temp * 9) / 5 + 32).toFixed(1);

}

function measureUvIndex(uvIndex) {
    let level = "";
    if (uvIndex <= 2) {
        level = "Low";
    } else if (uvIndex <= 5) {
        level = "Moderate";
    } else if (uvIndex <= 7) {
        level = "High";
    } else if (uvIndex <= 10) {
        level = "Very High";
    } else {
        level = "Extreme";
    }
    return level;

}

function updateHumidityStatus(humidity) {
    let status = "";
    if (humidity <= 30) {
        status = "Dry";
    } else if (humidity <= 60) {
        status = "Comfortable";
    } else {
        status = "Humid";
    }
    return status;
}

function updateVisibilityStatus(visibility) {
    let status = "";
    if (visibility <= 3) {
        status = "Poor";
    } else if (visibility <= 7) {
        status = "Moderate";
    } else {
        status = "Good";
    }
    return status;

}


function updateAirQualityStatus(airQuality) {
    let status = "";
    if (airQuality <= 50) {
        status = "Good";
    } else if (airQuality <= 100) {
        status = "Moderate";
    } else if (airQuality <= 150) {
        status = "Unhealthy for Sensitive Groups";
    } else if (airQuality <= 200) {
        status = "Unhealthy";
    } else if (airQuality <= 300) {
        status = "Very Unhealthy";
    } else {
        status = "Hazardous";
    }
    return status;

}

function convertTimeTo12HourFormat(time) {
    let hours = parseInt(time.substring(0, 2));
    let minutes = time.substring(3, 5);
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    return hours + ":" + minutes + " " + ampm;

}

function getIcon(condition) {
    // if (condition == "Partly-cloudy-day") {
    //     return "icons/sun/27.png";
    // }else if (condition == "partly-cloudy-night") {
    //     return "icons/sun/27.png";
    // }else if (condition == "rain") {
    //     return "icons/sun/27.png";
    // }else if (condition == "clear-day") {
    //     return "icons/sun/27.png";
    // }else if (condition == "clear-night") {
    //     return "icons/sun/27.png";
    // }else {
    //     return "icons/sun/27.png";
    // }

    let icon = "";
    switch (weatherCondition) {
        case "Sunny":
            icon = "☀️";
            break;
        case "Cloudy":
            icon = "☁️";
            break;
        case "Partly Cloudy":
            icon = "⛅";
            break;
        case "Rainy":
            icon = "🌧️";
            break;
        case "Stormy":
            icon = "⛈️";
            break;
        case "Snowy":
            icon = "❄️";
            break;
        case "Windy":
            icon = "💨";
            break;
        default:
            icon = "🌥️";
            break;
    }
    return icon;
}



function getDayName(date) {
    let day = new Date(date);
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    return days[day.getDay()];
}

function getHour(time) {
    let hour = time.split(":")[0];
    let min = time.split(":")[1];
    if (hour > 12) {
        hour = hour - 12;
        return `${hour}:${min} PM`
    } else {
        return `${hour}:${min} AM`;
    }
}

function updateForecast(data, unit, type) {
    weatherCards.innerHTML = "";

    let day = 0;
    let numCards = 0;
    // 24 Cards if hourly weather and 7 for weekly
    if (type = "day") {
        numCards = 24;
    } else {
        numCards = 7;
    }
    for (let i = 0; i < numCards; i++) {
        let card = document.createElement("div");
        card.classList.add("card");

        let dayName = getHour(data[day].datetime);
        if (type == "week") {
            dayName = getDayName(data[day].datetime);
        }
        let dayTemp = data[day].temp;
        if (unit == "f") {
            dayTemp = celciusToFahrenheit(data[day].temp);
        }
        let iconCondition = data[day].icon;
        let iconSrc = getIcon(iconCondition);
        let tempUnit = "°C";
        if (unit = "f") {
            tempUnit = "°F"
        }
        card.innerHTML = `
            <h2 class="day-name">${dayName}</h2>
            ,div class="card-icon">
            <img src="${iconSrc}" alt="" />
            </div>
            <div class="day-temp">
            <h2 class="temp">${dayTemp}</h2>
            <span class="temp-unit">${tempUnit}</span>
            </div>
            `;

        weatherCards.appendChild(card);
        day++;


    }

}

// function changeBackground(condition) {
//     if (condition = "Partly-cloudy-day") {
//         return "icons/sun/27.png";
//     }else if (condition == "partly-cloudy-night") {
//         return "icons/sun/27.png";
//     }else if (condition == "rain") {
//         return "icons/sun/27.png";
//     }else if (condition == "clear-day") {
//         return "icons/sun/27.png";
//     }else if (condition == "clear-night") {
//         return "icons/sun/27.png";
//     }else {
//         return "icons/sun/27.png";
//     }
// }



fahrenheitBtn.addEventListener("click", () => {
    changeUnit("f");
});

celciusBtn.addEventListener("click", () => {
    changeUnit("c");
});


function changeUnit(unit) {
    if (currentUnit != unit) {
        currentUnit = unit; {
            tempUnit.forEach((elem) => {
                elem.innerText = `°${unit.toUpperCase()}`;
            });
            if (unit == "c") {
                celciusBtn.classList.add("active")
                fahrenheitBtn.classList.remove("active")
            } else {
                celciusBtn.classList.remove("active");
                fahrenheitBtn.classList.add("active");
            }

            getWeatherData(currentCity, currentUnit, hourlyorWeek);
        }
    }
}

hourlyBtn.addEventListener("click", () => {
    changeTimeSpan("hourly");
});

weekBtn.addEventListener("click", () => {
    changeTimeSpan("week");
});


function changeTimeSpan(unit) {
    if (hourlyorWeek != unit) {
        hourlyorWeek = unit; {
            if (unit == "hourly") {
                hourlyBtn.classList.add("active")
                weekBtn.classList.remove("active")
            } else {
                hourlyBtn.classList.remove("active");
                weekBtn.classList.add("active");
            }

            getWeatherData(currentCity, currentUnit, hourlyorWeek);
        }
    }
}

