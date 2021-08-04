const cityNameText = document.getElementById("cityNameText")
const getWeatherButton = document.getElementById("getWeatherButton")
const weatherUL = document.getElementById("weatherUL")
const currentLocationButton = document.getElementById("currentLocationButton")

// declare variable with API key value
const apiKey = "7854a55d120c660937735dcc91b9ec67"

function getWeatherByCity(showWeather) {
    // declare variable with the API URL
    const GetWeatherURL = `http://api.openweathermap.org/data/2.5/weather?q=${cityNameText.value}&appid=${apiKey}&units=imperial`
    fetch(GetWeatherURL)
        .then(response => {
            return response.json()
        }).then(loadedWeather => {
            console.log(loadedWeather)
            showWeather(loadedWeather)
        })
}

// create function to displayWeather in HTML format
function displayWeather(weather) {
    const weatherItem = `<li>
    <h2>${weather.name}</h2>
    <label><b>Current Temp: </b>${weather.main.temp}F</label>
    <label><b>Humidity: </b>${weather.main.humidity}%</label>
    <label><b>Min Temp: </b>${weather.main.temp_min}F</label>
    <label><b>Max Temp: </b>${weather.main.temp_max}F</label>
    <label><b>Pressure: </b>${weather.main.pressure}Pa</label>
    </li>`

    weatherUL.innerHTML = weatherItem
}

// addEventListener for getWeatherButton to call the getWeatherByCity function and displayWeather funcion
getWeatherButton.addEventListener('click', function () {
    getWeatherByCity(weather => {
        displayWeather(weather)
    })
})

function getWeatherByLocation(showWeather) {
    navigator.geolocation.getCurrentPosition(position => {
        let lat = position.coords.latitude
        let lon = position.coords.longitude
        const WeatherByLocationURL = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
        fetch(WeatherByLocationURL)
            .then(response => {
                return response.json()
            }).then(loadedWeather => {
                console.log(loadedWeather)
                showWeather(loadedWeather)
            })
    })

}

currentLocationButton.addEventListener('click', function () {
    getWeatherByLocation(weather => {
        displayWeather(weather)
    })
})