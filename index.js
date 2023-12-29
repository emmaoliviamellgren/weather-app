const searchBar = document.getElementById('search-bar')
const searchButton = document.querySelector('button')
const body = document.querySelector('body')

const weather = {
    fetchWeather: function(city) {
        fetch(
            'http://api.weatherapi.com/v1/'
            + 'current.json'
            + '?key=550f2bc9f0aa46b5945111518231412'
            + '&q='
            + city
    )
        .then(response => response.json())
        .then(data => {
            
            // Changing body background img depending on forecast
            switch (data.current.condition.text) {
                default: // Clear conditions
                    body.style.backgroundImage = "url('https://images.unsplash.com/photo-1540308990836-5a7b1df6dc00?q=80&w=4912&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
                break;
                case 'Cloudy':
                case 'Partly cloudy':
                case 'Overcast':
                    body.style.backgroundImage = "url('https://images.unsplash.com/photo-1524555259-3e4f9092f97b?q=80&w=2057&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
                break;
                case 'Light rain':
                case 'Light drizzle':
                case 'Rain':
                    body.style.backgroundImage = "url('https://images.unsplash.com/photo-1559047838-d2ceb47b6ce9?q=80&w=3135&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
                break;
                case 'Thunder':
                    body.style.backgroundImage = "url('THUNDER IMG')"
                break;
                case 'Sunny':
                    body.style.backgroundImage = "url('SUNNY IMG')"
                break;
                case 'Mist':
                    body.style.backgroundImage = "url('MIST IMG')"
                break;
                case 'Snowy':
                    body.style.backgroundImage = "url('SNOW IMG')"
                break;
            }
            this.displayWeather(data) // data is sent to function displayWeather
            }); 
    },

    displayWeather: function(data) { // value of const {} will be taken from objects and stored in a variable
        const {name} = data.location;
        const {text, icon} = data.current.condition;
        const {temp_c, humidity} = data.current;
        const {wind_kph} = data.current;
        console.log(name, text, icon, temp_c, humidity, wind_kph)

        document.querySelector('.city-name').textContent = name;
        document.querySelector('.degrees').textContent = Math.floor(temp_c) + '°C';
        document.querySelector('.forecast-icon').src = 'http:' + icon;
        document.querySelector('.forecast').innerHTML = text;
        document.querySelector('.humidity').textContent = 'Humidity: ' + humidity + '%';
        document.querySelector('.wind-speed').textContent = 'Wind speed: ' + wind_kph + 'km/h';
    },

    search: function() {
        this.fetchWeather(searchBar.value);
    }
    }

    searchButton.addEventListener('click', function() {
    weather.search();
    if(searchBar.value === '') {
        return
    }
    // else {
    //     prompt('Please input a valid location')
    // }
})