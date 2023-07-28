// var key needed for generated weather api key
var APIKey = "aab85c305da960a0909bc03c76c938a2";
var searchHeader = document.querySelector(".searchHeader")
var currentIcon = document.querySelector(".currentIcon")
var currentTemp = document.querySelector(".currentTemp")
var currentHumidity = document.querySelector(".currentHumidity")
var currentWind = document.querySelector(".currentWind")
var searchInfo = document.querySelector("#search")
var searchInput = document.querySelector("#city")
function getData(event) {
    // fetch api call on weather api
    event.preventDefault()
    var units = "imperial"
    var city = searchInput.value.trim()
    // searchInput.value = ""
    console.log(city);
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=${units}`)
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
            searchHeader.innerHTML = data.name + " - " + buildDate;
            // Math.round() rounds  nearest whole number 104.9 => 105 and math.floor rounds down to the nearest whole number.
            currentTemp.innerHTML = "Temperature: " + Math.round(data.main.temp) + "&#176F";
            currentHumidity.innerHTML = "Humidity: " + Math.round(data.main.humidity) + "%";
            currentWind.innerHTML = "Wind Speed: " + Math.round(data.wind.speed) + "mph";
            currentIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png");
            currentIcon.setAttribute("alt", data.weather[0].description);
        })
        .catch(function (err) {
            console.log(err)
        })
}


searchInfo.addEventListener("submit", getData);