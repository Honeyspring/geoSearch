"use strict";var cityForm=document.getElementById("city-form"),cityInput=document.getElementById("city"),locationForm=document.getElementById("locationForm"),locationInput=document.getElementById("location"),reportSection=document.getElementById("weatherReport"),celsciusSection=document.getElementById("celsciusResult"),celscius=document.getElementById("celscius"),fahrenheitSection=document.getElementById("fahrenheitResult"),fahrenheit=document.getElementById("fahrenheit"),pressureSection=document.getElementById("pressureResult"),pressure=document.getElementById("pressure"),humiditySection=document.getElementById("humidityResult"),humidity=document.getElementById("humidity"),windSection=document.getElementById("windResult"),wind=document.getElementById("wind"),button=document.querySelectorAll(".button").forEach(function(e){e.addEventListener("click",function(){this.style.backgroundColor=" grey"}),e.addEventListener("blur",function(){this.style.backgroundColor=" white"})}),showPage=function(){document.getElementById("loader").style.display="none",document.getElementById("map").style.display="block"},pageLoader=function(){setTimeout(showPage,3e3)},guided=document.getElementById("guideSection");document.getElementById("guideButton").addEventListener("click",function(){guided.classList.toggle("guide")});var myDay=function(){var e=new Date;return document.getElementById("date").textContent="Weather for "+e,document.getElementById("day").textContent=e.getDate(),document.getElementById("year").textContent=e};function initAutocomplete(){var o=new google.maps.Map(document.getElementById("map"),{center:{lat:6.608,lng:3.6218},zoom:13,mapTypeId:"roadmap"}),e=document.getElementById("cityInput"),t=(document.getElementById("cityInput"),new google.maps.places.SearchBox(cityInput));o.controls[google.maps.ControlPosition.TOP_LEFT].push(e),o.addListener("bounds_changed",function(){t.setBounds(o.getBounds())});var i=[];t.addListener("places_changed",function(){var e=t.getPlaces();if(0!=e.length){i.forEach(function(e){e.setMap(null)}),i=[];var n=new google.maps.LatLngBounds;e.forEach(function(e){if(e.geometry){var t={url:e.icon,size:new google.maps.Size(71,71),origin:new google.maps.Point(0,0),anchor:new google.maps.Point(17,34),scaledSize:new google.maps.Size(25,25)};i.push(new google.maps.Marker({map:o,icon:t,title:e.name,position:e.geometry.location})),e.geometry.viewport?n.union(e.geometry.viewport):n.extend(e.geometry.location)}else mapSection.textContent="Returned place contains no geometry"}),o.fitBounds(n)}})}myDay(),cityForm.addEventListener("submit",function(e){e.preventDefault();var t=cityInput.value;document.getElementById("locationHeader").textContent=t,apiRequest.open("GET","https://api.openweathermap.org/data/2.5/weather?q="+t+"&APPID=2d0c49b28f134f4907a106fff814d7bb"),apiRequest.send()});var apiRequest=new XMLHttpRequest;apiRequest.onreadystatechange=function(){if(4===apiRequest.readyState){if(404===apiRequest.status)return cityInput.style.border="thin solid red",reportSection.textContent="City not found";var e=JSON.parse(apiRequest.response);reportSection.textContent="The weather in "+e.name+" is "+e.weather[0].description+" and a temperature  "+e.main.temp+"Kelvin,click celscius button to convert to celscius and fahrenheit respectively";pressure.addEventListener("click",function(){return pressureSection.textContent="The pressure in "+e.name+" is "+e.main.pressure+"hPa."});wind.addEventListener("click",function(){return windSection.textContent="The Wind Speed in "+e.name+" is "+e.wind.speed+"meter/sec   and  a wind direction of"+e.wind.deg+"degrees."});humidity.addEventListener("click",function(){return humiditySection.textContent="The humidity in "+e.name+" is "+e.main.humidity+"%."});celscius.addEventListener("click",function(){return celsciusSection.textContent="The temperature in "+e.name+" is "+(e.main.temp-273.15)+"celscius"});fahrenheit.addEventListener("click",function(){return fahrenheitSection.textContent="The temperature in "+e.name+" is "+(9*(e.main.temp-273.15)/5+32)+"fahrenheit"})}};