
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

/*to hide and show guide*/
const guided =document.getElementById('guideSection');
document.getElementById('guideButton').addEventListener('click',function view(){
    guided.classList.remove('guide');
  
});
document.getElementById('cancelButton').addEventListener('click',function view(){
  guided.classList.add('guide');

});
/*to add date onload*/

var today = new Date();
document.getElementById("date").innerHTML = 'Weather for ' + today;
// Prepare openweathermap.org request
var day =new Date();
document.getElementById("day").innerHTML = day.getDate();

var year= new Date();
document.getElementById("year").innerHTML = year;
