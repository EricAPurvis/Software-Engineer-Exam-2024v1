//Author: Eric Purvis

//Api key and Url to get location info
const geoApiKey="50edaa2484a34805b8e371b5434919f9";
const geoApiUrl="https://api.geoapify.com/v2/places?categories=commercial&filter=geometry:48bfcbab59fa3867ed872c6e66649d8b";

//Using lat and lon; gets the limit amount of commercial locations.
async function getPointsOfInterest(lat, lon, limit){
	
	var requestOptions = {
		method: 'GET',
	};

	var poiData = [];
	await fetch(`${geoApiUrl}&bias=proximity:${lon},${lat}&lang=en&limit=${limit}&apiKey=${geoApiKey}`, requestOptions)
		.then(response => response.json())
		.then(result => poiData=result)
		.catch(error => console.log('error', error));
		  
	return(poiData);

}