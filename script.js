const button = document.getElementById('submit');
const inputValue = document.getElementById('inputValue');
var wName = document.querySelector('.name');
var desc = document.querySelector('.description');
var temp = document.querySelector('.temp');
var iconic = document.querySelector('.icon');
var wind = document.querySelector('.wind-speed');
var feels = document.querySelector('.feels-like');
var canvasElem = document.getElementById("forecastChart");
var config = {
  type: "bar",
  data: {labels: [],
  datasets: [
    {label: "Temperature",
      data: [],
      backgroundColor: ["rgba(200,0,0,1"],
      borderColor: ["rgba(0,0,0,1"],
      borderWidth: 1
    }]
  }
};
var forecastChart = new Chart(canvasElem, config);


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

  fetch('https://api.openweathermap.org/data/2.5/forecast?q='+inputValue.value+'&units=imperial&appid=c983b5a10bc8da951ebfd1ad2c147a89')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    forecastChart.destroy();
    const plugin = {
      id: 'custom_canvas_background_color',
      beforeDraw: (chart) => {
        const {ctx} = chart;
        ctx.save();
        ctx.globalCompositeOperation = 'destination-over';
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, chart.width, chart.height);
        ctx.restore();
      }
    };
    var config = {
      type: "bar",
      data: {labels: [data.list[0].dt_txt.substring(11), data.list[1].dt_txt.substring(11), data.list[2].dt_txt.substring(11), data.list[3].dt_txt.substring(11), data.list[4].dt_txt.substring(11), data.list[5].dt_txt.substring(11), data.list[6].dt_txt.substring(11), data.list[7].dt_txt.substring(11)],
      datasets: [
        {label: "Temperature",
          data: [Math.round(data.list[0].main.temp),
          Math.round(data.list[1].main.temp),
          Math.round(data.list[2].main.temp),
          Math.round(data.list[3].main.temp),
          Math.round(data.list[4].main.temp),
          Math.round(data.list[5].main.temp),
          Math.round(data.list[6].main.temp),
          Math.round(data.list[7].main.temp)],
          backgroundColor: ["rgba(200,0,0,1"],
          borderColor: ["rgba(0,0,0,1"],
          borderWidth: 1
        }]
      },
      plugins: [plugin],
    };
    
    forecastChart = new Chart(canvasElem, config);
    forecastChart.update();
  })
}

button.addEventListener('click', buttonEvent);
