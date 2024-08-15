//Author: Eric Purvis

//key and url to access weather data
const apiKey = "0bdf710c6a3db9261f2e714e09c06ea8";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
	
//Gathers and returns specified weather data
async function getWeather(city, units) {
  const find = apiUrl + `q=${city}` + `&appid=${apiKey}` + `&units=${units}`;
  const response = await fetch(find);
  var data = await response.json();
	
  //Updates weather image
  const imgName=data.weather[0].main.toLowerCase();
  document.querySelector(".weather-icon").src = "images/"+`${imgName}`+".png";
		
  //Uses Lat and Lon data to get points of interest
  var poiData = getPointsOfInterest(data.coord.lat, data.coord.lon, 25);
		
  //Returns collected weather data and poi
  return([data, units, poiData]);
}
	
//Gets the specified city's weather and in the chosen units of measurement
async function getSpecificWeather() {
  const city = document.querySelector(".search #city").value;
  const units = document.querySelector(".search #units").value;
  return(getWeather(city, units));
}
	
//Initial weather data getting
async function getInitWeather() {
  const city = "Tokyo";
  const units = "Metric";
  return(getWeather(city, units));
}
