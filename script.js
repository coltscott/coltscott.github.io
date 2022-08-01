const button = document.getElementById('submit');
const inputValue = document.getElementById('inputValue');
var wName = document.querySelector('.name');
var desc = document.querySelector('.description');
var temp = document.querySelector('.temp');
var iconic = document.querySelector('.icon');

function buttonEvent() {
  fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputValue.value+'&units=imperial&appid=c983b5a10bc8da951ebfd1ad2c147a89')
  .then(response =>response.json())
  .then(data => {
    var icon = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
    var tempValue = Math.round(data.main.temp) + "°";
    var weather = data.weather[0].main;
    var nameValue = data.name;
    var description = "Currently the weather in " + nameValue + " consists of: " + weather;

    $('.icon').attr('src', icon);
    temp.innerHTML = tempValue;
    desc.innerHTML = description;
  })
  
.catch(err => alert("Unrecognized City Name!"))
  
}

button.addEventListener('click', buttonEvent);
