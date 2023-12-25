const weather = {
    API_KEY: '550f2bc9f0aa46b5945111518231412'
    }

const inputValue = document.getElementById('search-bar')
const searchBox = document.querySelector('.search-box')
const searchButton = document.querySelector('button')

fetch(`http://api.weatherapi.com/v1/current.json?key=550f2bc9f0aa46b5945111518231412&q=Stockholm`)
.then(response => response.json())
.then(data => {
    console.log(data)
    
});