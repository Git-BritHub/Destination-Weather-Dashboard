// var key needed for generated weather api key
var APIKey = "aab85c305da960a0909bc03c76c938a2";
var searchHeader = document.querySelector(".searchHeader")
var currentIcon = document.querySelector(".currentIcon")
var currentTemp = document.querySelector(".currentTemp")
var currentHumidity = document.querySelector(".currentHumidity")
var currentWind = document.querySelector(".currentWind")
var searchInfo = document.querySelector("#search")
var searchInput = document.querySelector("#city")
var historyList = document.querySelector(".history")

var forecastCard = document.querySelectorAll(".card-forecast")

var searchHistory = JSON.parse(localStorage.getItem("history")) || []

function fetchSearchHistory() {
    var data = JSON.parse(localStorage.getItem("history"))
    historyList.innerHTML = ""
    if (data) {
        for (let i = 0; i < data.length; i++) {
            var btn = document.createElement("button")
            btn.innerHTML = data[i]
            btn.addEventListener("click", function(event) {
                getData(event, event.target.innerHTML)
            })
            historyList.append(btn)
        }
    } else {
        return;
    }
}

fetchSearchHistory()

function getData(event, city) {
    // fetch api call on weather api
    event.preventDefault()
    
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=imperial`)
        .then(function (res) {
            // if we forget to response.json it, it wont allow us to pull all the api's info when we call the function getData()
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
            // added url below so that weather icons show up
            currentIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png");
            // add setAttribute for current icon alt. in weather info in console, it shows that their description is the first option so we but zero in the []
            currentIcon.setAttribute("alt", data.weather[0].description);
        })
        // the .catch is what's calling it to catch an error, we could name err -- error, dog etc.
        .catch(function (err) {
            console.log(err)
        })
        
        fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}&units=imperial`)
        .then(function (res) {
            return res.json()
        })
        .then(function (data) {
            console.log(data)
            for (let i = 0; i < forecastCard.length; i++) {
                forecastCard[i].innerHTML = ""
                var listIndex = i * 8 + 4;
                var date = new Date(data.list[listIndex].dt * 1000)
                var day = date.getDate()
                var month = date.getMonth() + 1
                var year = date.getFullYear()
                var dateEl = document.createElement("h5")
                dateEl.innerHTML = month + "/" + day + "/" + year
                forecastCard[i].append(dateEl)
                var icon = document.createElement("img")
                icon.setAttribute("src", "https://openweathermap.org/img/wn/" + data.list[listIndex].weather[0].icon + "@2x.png")
                icon.setAttribute("alt", data.list[listIndex].weather[0].description)
                forecastCard[i].append(icon)
                var tempEl = document.createElement("p")
                tempEl.innerHTML = "Temp: " + Math.round(data.list[listIndex].main.temp) + "&#176F"
                forecastCard[i].append(tempEl)
                var humidityEl = document.createElement("p")
                humidityEl.innerHTML = "Hum: " + Math.round(data.list[listIndex].main.humidity) + "%"
                forecastCard[i].append(humidityEl)
                var windEl = document.createElement("p")
                windEl.innerHTML = "Wind: " + Math.round(data.list[listIndex].wind.speed) + "mph"
                forecastCard[i].append(windEl)
                
            }
        })
        .catch(function (err) {
            console.log(err)
        })
    }
    
// used submit as opposed to click to save lines of code by changing search section to form in html
searchInfo.addEventListener("submit", function (event) {
    var city = searchInput.value.trim()
    searchHistory.push(city)
    localStorage.setItem("history", JSON.stringify(searchHistory))
    getData(event, city)
    fetchSearchHistory()
})