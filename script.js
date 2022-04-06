
$.getJSON("https://api.openweathermap.org/data/2.5/weather?q=west%20lafayette&units=imperial&appid=c983b5a10bc8da951ebfd1ad2c147a89", function(data) {
  console.log(data);

  var icon = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
  var temp = Math.round(data.main.temp);
  var weather = data.weather[0].main;
  var name = data.name;
   
  $('.icon').attr('src', icon);
  $(".name").append(name);
  $(".weather").append(weather);
  $(".temp").append(temp + "°");
  
});