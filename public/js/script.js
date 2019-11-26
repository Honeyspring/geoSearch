const cityForm = document.getElementById('city-form');
const cityInput = document.getElementById('city');
const locationForm = document.getElementById('locationForm');
const locationInput = document.getElementById('location');
const reportSection = document.getElementById('weatherReport');
const celsciusSection = document.getElementById('celsciusResult');
const celscius=document.getElementById("celscius");
const fahrenheitSection = document.getElementById('fahrenheitResult');
const fahrenheit=document.getElementById("fahrenheit");
const pressureSection = document.getElementById('pressureResult');
const pressure=document.getElementById("pressure");
const humiditySection = document.getElementById('humidityResult');
const humidity=document.getElementById("humidity");
const windSection = document.getElementById('windResult');
const wind=document.getElementById("wind");
const sideButton=document.getElementById('toggle')

/*toggle side nav for small screens*/
const show =sideButton.addEventListener('click',()=>{
 const sideNav =document.getElementById('sideNav');
return sideNav.classList.toggle('side');
});
/*to change background on click*/
const button =document.querySelectorAll('.button').forEach(function (e){
 
  function add(){
      this.style.backgroundColor=' grey';
   }
   
function remove(){
  this.style.backgroundColor=' white'; 
 }

e.addEventListener('click', add);
e.addEventListener('blur', remove);

});

/* to add page loader*/
const showPage =() => {
  document.getElementById("loader").style.display = "none";
  document.getElementById("map").style.display = "block";
};
const pageLoader =()=> { let load = setTimeout(showPage, 3000);};
 
 

/*to hide and show guide*/
const guided =document.getElementById('guideSection');
document.getElementById('guideButton').addEventListener('click',function view(){
    guided.classList.toggle('guide');
  
});

/*to add date onload*/
 const myDay=()=>{
    let today = new Date();
    document.getElementById("date").textContent= 'Weather for ' + today;
    document.getElementById("day").textContent= today.getDate();
    document.getElementById("year").textContent= today;
    return today;
  };
myDay();
//getting google map api
function initAutocomplete(){
    let map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 6.6080, lng: 3.6218},
      zoom: 13,
      mapTypeId: 'roadmap'
    });

    // Create the search box and link it to the UI element.
    let input = document.getElementById('cityInput');
    let newinput = document.getElementById('cityInput');
    let searchBox = new google.maps.places.SearchBox(cityInput);
   
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
      
    });

    let markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
      let places = searchBox.getPlaces();
      
      if (places.length == 0) {
        return;
      }

      // Clear out the old markers.
      markers.forEach(function(marker) {
        marker.setMap(null);
      });
      markers = [];

      // For each place, get the icon, name and location.
      let bounds = new google.maps.LatLngBounds();
      places.forEach(function(place) {
        if (!place.geometry) {
            mapSection.textContent="Returned place contains no geometry";
          //console.log("Returned place contains no geometry");
          return;
        }
        let icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
        };

        // Create a marker for each place.
        markers.push(new google.maps.Marker({
          map: map,
          icon: icon,
          title: place.name,
          position: place.geometry.location
        }));

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });
  };
  
  
/* 
 * Capture and handle form submit event
 * Prevent default behaviour, prepare and send API request
*/
cityForm.addEventListener('submit', ($event) => {
    $event.preventDefault();
    const chosenCity = cityInput.value;
    document.getElementById("locationHeader").textContent=chosenCity;
    apiRequest.open('GET', 'https://api.openweathermap.org/data/2.5/weather?q=' + chosenCity  +'&APPID=2d0c49b28f134f4907a106fff814d7bb');
    apiRequest.send();
  });
  // Prepare openweathermap.org request
  let apiRequest = new XMLHttpRequest();
  apiRequest.onreadystatechange = () => {
    if (apiRequest.readyState === 4) {
      if (apiRequest.status === 404 ){
        cityInput.style.border='thin solid red';
        return  reportSection.textContent = 'City not found' ;
          }
  const response = JSON.parse(apiRequest.response); 
   reportSection.textContent = 'The weather in ' + response.name + ' is '  + response.weather[0].description +' and a temperature '+' '+ response.main.temp +'Kelvin,click celscius button to convert to celscius and fahrenheit respectively';
  
  const pressureResult =()=> pressureSection.textContent ='The pressure in ' + response.name + ' is '+ response.main.pressure  +'hPa.';
    pressure.addEventListener("click", pressureResult);
const windResult=() =>  windSection.textContent ='The Wind Speed in ' + response.name + ' is '+ response.wind.speed  +'meter/sec   and  a wind direction of'+ response.wind.deg+'degrees.';
    wind.addEventListener("click", windResult);
const humidityResult =()=> humiditySection.textContent ='The humidity in ' + response.name + ' is '+ response.main.humidity  +'%.';
  humidity.addEventListener("click", humidityResult);

const celsciusConverter =()=> celsciusSection.textContent ='The temperature in ' + response.name + ' is '+( response.main.temp -273.15)  + 'celscius';
    celscius.addEventListener("click", celsciusConverter);
const fahrenheitConverter =() =>fahrenheitSection.textContent ='The temperature in ' + response.name + ' is '+( (response.main.temp -273.15)*9/5+32)  + 'fahrenheit';

fahrenheit.addEventListener("click", fahrenheitConverter);

    }
    };  
    