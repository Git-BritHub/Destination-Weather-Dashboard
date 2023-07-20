var key = "aab85c305da960a0909bc03c76c938a2";
var searchInfo = document.querySelector(".searchInfo")
var currentIcon = document.querySelector(".currentIcon")
var currentTemp = document.querySelector(".currentTemp")
var currentHumidity = document.querySelector(".currentHumidity")
var currentWind = document.querySelector(".currentWind")

function getData() {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=austin&appid=${key}&units=imperial`)
        .then(function (res) {
            return res.json()
        })
        .then(function (data) {
            console.log(data)
            var date = new Date()
            var day = date.getDate()
            var month = date.getMonth() + 1
            var year = date.getFullYear()
            var buildDate = month + "/" + day + "/" + year
            searchInfo.innerHTML = data.name + " - " + buildDate;
            // Math.round() rounds  nearest whole number 104.9 => 105
            currentTemp.innerHTML = "Temperature: " + Math.round(data.main.temp) + "&#176F";
            currentHumidity.innerHTML = "Humidity: " + Math.round(data.main.humidity) + "%";
            currentWind.innerHTML = "Wind speed: " + Math.round(data.wind.speed) + "mph";
            currentIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png")
            currentIcon.setAttribute("alt", data.weather[0].description)
        })
        .catch(function (err) {
            console.log(err)
        })
}

getData()