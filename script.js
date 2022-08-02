const button = document.getElementById('submit');
const inputValue = document.getElementById('inputValue');
var wName = document.querySelector('.name');
var desc = document.querySelector('.description');
var temp = document.querySelector('.temp');
var iconic = document.querySelector('.icon');
var wind = document.querySelector('.wind-speed');
var feels = document.querySelector('.feels-like');
$('.icon').attr('src', "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQARKISBFy9j6rW3qTcdGSdzwUkCd3AEeMPMQ&usqp=CAU");
$('.wind-speed-icon').attr('src', "wind-clipart-wind-flow.png");
$('.wind-speed-icon').css('opacity', 0);


function buttonEvent() {
  fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputValue.value+'&units=imperial&appid=c983b5a10bc8da951ebfd1ad2c147a89')
  .then(response =>response.json())
  .then(data => {
    console.log(data);
    var icon = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
    var tempValue = Math.round(data.main.temp) + "°";
    var weather = data.weather[0].main;
    var nameValue = data.name;
    var description = "Currently the weather in " + nameValue + " consists of: " + weather;
    var windSpeed = "Wind Speed: " + data.wind.speed + " MPH";
    var feelsLike = "Feels like: " + Math.round(data.main.feels_like) + "°";

    $('.icon').attr('src', icon);
    temp.innerHTML = tempValue;
    desc.innerHTML = description;
    wind.innerHTML = windSpeed;
    $('.wind-speed-icon').css('opacity', 1);
    feels.innerHTML = feelsLike;
  })
  
.catch(err => alert("Unrecognized City Name!"))
  
}

button.addEventListener('click', buttonEvent);
