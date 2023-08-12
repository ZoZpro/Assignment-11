// Today's data
let todayName = document.querySelector('.today-date-name');
let todayNumber = document.querySelector('.today-date-num');
let todayMonth = document.querySelector('.today-date-month');
let todayLocation = document.querySelector('.today-location');
let todayTemp = document.querySelector('.today-temp');
let todayConditionImg = document.querySelector('.today-condition-img');
let todayConditionText = document.querySelector('.today-condition-text');
let humidity = document.querySelector('.humidity');
let wind = document.querySelector('.wind');
let windDirection = document.querySelector('.wind-direction');

// Tomorrow's data
let tomorrowName = document.querySelectorAll('.tomorrow-name');
let tomorrowConditionImg = document.querySelectorAll('.tomorrow-condition-img');
let tomorrowConditionText = document.querySelectorAll('.tomorrow-condition-text');
let tomorrowMaxTemp = document.querySelectorAll('.tomorrow-max-temp')
let tommorrowMinTemp = document.querySelectorAll('.tomorrow-min-temp')

// Search input
let search = document.querySelector('.search');


async function getWeatherData(cityName) {
    let weatherResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7ebc03fae0ca4822ad3113403230708&q=${cityName}&days=3`)
    let weatherData = await weatherResponse.json();
    return weatherData
}

// display Today's data
function displayTodayData(data) {
    let todayDate = new Date();
    todayNumber.innerHTML = todayDate.getDate();
    todayName.innerHTML = todayDate.toLocaleDateString('en-US', { weekday: 'long' })
    todayMonth.innerHTML = todayDate.toLocaleDateString('en-US', { month: 'long' })
    todayLocation.innerHTML = data.location.name
    todayTemp.innerHTML = data.current.temp_c + '°C'
    todayConditionImg.setAttribute('src', data.current.condition.icon)
    todayConditionText.innerHTML = data.current.condition.text
    humidity.innerHTML = data.current.humidity + '%'
    wind.innerHTML = data.current.wind_kph + 'km/h'
    windDirection.innerHTML = data.current.wind_dir

}
//display Tomorrow's data
function dispalyTomorrowData(data) {
    let forecastData = data.forecast.forecastday
    for (let i = 0; i < 2; i++) {
        let tomorrowDate = new Date(forecastData[i + 1].date);
        tomorrowName[i].innerHTML = tomorrowDate.toLocaleDateString('en-US',{weekday:'long'})
        tomorrowMaxTemp[i].innerHTML = forecastData[i + 1].day.maxtemp_c + '°C'
        tommorrowMinTemp[i].innerHTML = forecastData[i + 1].day.mintemp_c + '°C'
        tomorrowConditionImg[i].setAttribute('src', forecastData[i + 1].day.condition.icon)
        tomorrowConditionText[i].innerHTML = forecastData[i + 1].day.condition.text
    }
}
//start Weather 
async function startWeather(city='cairo') {
    let weatherData = await getWeatherData(city);
    if(!weatherData.error){
        displayTodayData(weatherData);
        dispalyTomorrowData(weatherData);
    }
}

startWeather();

search.addEventListener('input', function(){
    startWeather(search.value)
})