const weather = {
    API_KEY: '550f2bc9f0aa46b5945111518231412',
    fetchWeather: function(city) {
        fetch(
            'http://api.weatherapi.com/v1/'
            + 'current.json'
            + '?key=550f2bc9f0aa46b5945111518231412'
            + '&q='
            + city
    )
        .then(response => response.json())
        .then(data => this.displayWeather(data));  // data is sent to function displayWeather
    },
    displayWeather: function(data) { // value of const {} will be taken from objects and stored in a variable
        const {name} = data.location;
        const {text, icon} = data.current.condition;
        const {temp_c, humidity} = data.current;
        const {wind_kph} = data.current;
        console.log(name, text, icon, temp_c, humidity, wind_kph)

        document.querySelector('.city').textContent = 'Weather in ' + name;
        document.querySelector('.degrees').textContent = Math.floor(temp_c) + '°C';
        document.querySelector('.forecast-icon').src = 'http:' + icon;
        document.querySelector('.forecast').innerHTML = text;
        document.querySelector('.humidity').textContent = 'Humidity: ' + humidity + '%';
        document.querySelector('.wind-speed').textContent = 'Wind speed: ' + wind_kph + 'km/h';
    }
    }

const inputValue = document.getElementById('search-bar')
const searchBox = document.querySelector('.search-box')
const searchButton = document.querySelector('button')


