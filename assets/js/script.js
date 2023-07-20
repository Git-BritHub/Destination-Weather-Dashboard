var key = "aab85c305da960a0909bc03c76c938a2";
`http://api.openweathermap.org/data/2.5/forecast?q=austin&appid=${key}&units=imperial`


function getData() {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=austin&appid=${key}&units=imperial`)
        .then(function (res) {
            return res.json()
        })
        .then(function (data) {
            console.log(data)
        })
        .catch(function (err) {
            console.log(err)
        })
}

getData()