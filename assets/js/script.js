// var key needed for generated weather api key
var APIKey = "aab85c305da960a0909bc03c76c938a2";
var searchHeader = document.querySelector(".searchHeader")
var currentIcon = document.querySelector(".currentIcon")
var currentTemp = document.querySelector(".currentTemp")
var currentHumidity = document.querySelector(".currentHumidity")
var currentWind = document.querySelector(".currentWind")
var searchInfo = document.querySelector("#search")
var searchInput = document.querySelector("#city")

var forecast1 = document.querySelector(".forecast")
var forecastIcon = document.querySelector(".forecastIcon")
var forecastTemp = document.querySelector(".forecastTemp")
var forecastHumidity = document.querySelector(".forecastHumidity")
var forecastWind = document.querySelector(".forecastWind")

function getData(event) {
    // fetch api call on weather api
    event.preventDefault()
    var city = searchInput.value.trim()
    console.log(city);

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
        .then(function (list) {
            console.log(list)
            var date = new Date()
            // added +1 to getDate() so that it will do the next day
            var day = date.getDate() + 1
            var month = date.getMonth() + 1
            var year = date.getFullYear()
            var buildDate = month + "/" + day + "/" + year
            // called forecast1.innerHTML so that data for next day will be put in forecast area, will need to create for Loop for the next day until day 5 once I get first 'next day' working
            // replaced data with 'list' since forecast section in weather api website labels it as list?
            // put .list[5] and list.array(5) because I noticed that the next day forecast started at 00:00am on array 5 in list but it is still pulling up all 40 array lists in console
            forecast1.innerHTML = list.name + " - " + buildDate

            forecastTemp.innerHTML = "Temperature: " + Math.round(list.main.temp) + "&#176F";
            forecastHumidity.innerHTML = "Humidity: " + Math.round(list.main.humidity) + "%";
            forecastWind.innerHTML = "Wind Speed: " + Math.round(list.wind.speed) + "mph";
            forecastIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + list.weather[0].icon + "@2x.png");
            forecastIcon.setAttribute("alt", list.weather[0].description);
        })
        .catch(function (err) {
            console.log(err)
        })
}

// used submit as opposed to click to save lines of code by changing search section to form in html
searchInfo.addEventListener("submit", getData);