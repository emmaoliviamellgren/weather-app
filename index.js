const searchBar = document.getElementById('search-bar')
const searchButton = document.querySelector('button')
const body = document.querySelector('body')
const card = document.querySelector('.card')

const weather = {
    fetchWeather: function(city) {
        fetch(
            'http://api.weatherapi.com/v1/'
            + 'current.json'
            + '?key=550f2bc9f0aa46b5945111518231412'
            + '&q='
            + city
    )
        .then(response => {

            if(!response.ok) {
                document.querySelector('.invalid').style.display = 'inline-block';
                searchBar.classList.add('search-bar--invalid')
                console.error('Something went wrong. Error: ', response.status)
                searchBar.value = ''; 
            }
            return response.json();
        })
            
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
                    body.style.backgroundImage = "url('https://images.unsplash.com/photo-1503429134808-fdf0cd4e1bfa?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
                break;
                case 'Rain':
                    body.style.backgroundImage = "url('https://images.unsplash.com/photo-1559047838-d2ceb47b6ce9?q=80&w=3135&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
                break;
                case 'Thunder':
                    body.style.backgroundImage = "url('https://images.unsplash.com/photo-1429552077091-836152271555?q=80&w=2088&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
                break;
                case 'Sunny':
                    body.style.backgroundImage = "url('https://images.unsplash.com/photo-1597316342034-39cb9003f5bf?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
                break;
                case 'Mist':
                    body.style.backgroundImage = "url('https://images.unsplash.com/photo-1585508889431-a1d0d9c5a324?q=80&w=3164&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
                break;
                case 'Light snow':
                case 'Light sleet':
                case 'Snowy':
                    body.style.backgroundImage = "url('https://images.unsplash.com/photo-1516035645781-9f126e774e9e?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
                break;
            }
            this.displayWeather(data) // data is sent to function displayWeather
            }); 
    },

    displayWeather: function(data) { // value of const {} will be taken from objects and stored in a variable
        const {name} = data.location;
        const {text} = data.current.condition;
        const {temp_c, humidity} = data.current;
        const {wind_kph} = data.current;

        document.querySelector('.city-name').textContent =  name;
        document.querySelector('.city-name').style.backgroundColor = 'black';
        document.querySelector('.city-paragraph').textContent = 'Weather in: ';
        document.querySelector('.degrees').textContent = Math.floor(temp_c) + '°C';
        document.querySelector('.forecast p').textContent = text;
        document.querySelector('.humidity').textContent = 'Humidity: ' + humidity + '%';
        document.querySelector('.wind-speed').textContent = 'Wind speed: ' + wind_kph + 'km/h';
    },

    search: function() {
        if (!isNaN(searchBar.value) || searchBar.value.trim() === '') {
            errorMsgInvalidLocation()
        } else {
            searchBar.classList.remove('search-bar--invalid')
            document.querySelector('.invalid').style.display = 'none';
            this.fetchWeather(searchBar.value);
            searchBar.value = '';
            card.style.height = 'min-content';
            document.querySelector('.weather-container').style.display = 'block';
            
                //If location is invalid and weather card is open, reposition error message
                if(!isNaN(searchBar.value) || searchBar.value.trim() === '' && document.querySelector('.weather-container').style.display === 'block') {
                    document.querySelector('.invalid').style.top = '105px';
                }
        }
    }
    }

//Error message - location is invalid
const errorMsgInvalidLocation = () => {
    document.querySelector('.invalid').style.display = 'inline-block';
    searchBar.classList.add('search-bar--invalid')
    console.error('You must input a valid location.')
    searchBar.value = '';
}

//Submit on search button click
searchButton.addEventListener('click', function() {
    weather.search()
});

// Submit on 'enter' key press
function checkSubmit(e) {
    if (e && e.keyCode == 13) {
        weather.search()
}
}