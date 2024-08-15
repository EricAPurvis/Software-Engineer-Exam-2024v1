//Author: Eric Purvis

//Vue dynamic data and method handling
const app = Vue.createApp( {
  data() {
    return {
	  city: "Japan",
	  temp: 100,
	  humidity: 100,
	  windSpeed: 100,
	  tempUnits: "°c",
	  speedUnits: "kmph",
	  poiData: ['1', '2', '3', '4', '5', '1', '2', '3', '4', '5', '1', '2', '3', '4', '5', '1', '2', '3', '4', '5', '1', '2', '3', '4', '5'],
	  currentPage:1,
	  maxPage:5,
	  pagination: 5
	}
  },
  methods: {
    //Moves the pagination state
	movePage(increment) {
	  this.currentPage+=increment;
	  if(this.currentPage>this.maxPage) {
	    this.currentPage=this.maxPage;
	  }
	  if(this.currentPage<1) {
		this.currentPage=1;
	  }
    },
    //Opens a new tab with Google maps of the location(s) availble
    googleMaps(index) {
      const poi=this.poiData[index];
      const googleMapsURL = `https://www.google.com/maps/search/?api=1&query=${poi}+${this.city}+Japan`;
      window.open(googleMapsURL);
    },
    //Updates POI based on selected location
    async updatePOI(data) {
      for(index=0;index<this.poiData.length; index++) {
	    this.poiData.splice(index, 1, "Loading");
	  }
				
	  var poiData=[];
	  await data.then(function(result) {
	    try {
	      poiData = result.features;
	    }catch(err) {
	     console.log(err.message);
	    };
	  });
      for(index=0; index<poiData.length; index++){
	    this.poiData[index]=poiData[index].properties.address_line1;
	  }
	  this.currentPage=1;
	},
	//Modifies the existing waether data to match new selections
	async updateWeather() {
	  var data = await getSpecificWeather();
	  var units = data[1];
					
	  const displayTempUnit = units=="Metric" ? "°c" : "°f";
	  const displaySpeedUnit = units=="Metric" ? " kmph" : " mph";
					
	  this.city=data[0].name;
	  this.temp=Math.round(data[0].main.temp);
	  this.humidity=data[0].main.humidity;
	  this.windSpeed=data[0].wind.speed;
	  this.tempUnits=displayTempUnit;
	  this.speedUnits=displaySpeedUnit;
					
	  this.updatePOI(data[2]);
				
	}
  },
  //Initializes the data for the user with the first options
  created: async function() {
    var data = await getInitWeather();
	var units = data[1];
					
	const displayTempUnit = units=="Metric" ? "°c" : "°f";
	const displaySpeedUnit = units=="Metric" ? " kmph" : " mph";
					
	this.city=data[0].name;
	this.temp=Math.round(data[0].main.temp);
	this.humidity=data[0].main.humidity;
	this.windSpeed=data[0].wind.speed;
	this.tempUnits=displayTempUnit;
	this.speedUnits=displaySpeedUnit;
					
	this.updatePOI(data[2]);
  }
});

//Mounts the VueJS app to the 'everything' class
app.mount('.everything');