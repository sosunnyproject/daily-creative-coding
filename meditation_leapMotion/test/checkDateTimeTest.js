let minToAdd = 0.02
let milliSec = 60000
let begin = new Date().getTime() 
let end = begin + minToAdd*milliSec;
let isTimeOver = false;

function checkTime() {
  if(!isTimeOver){
    if(new Date().getTime() >= end) {
      isTimeOver = true
    }
  } else {
    document.querySelector('#scene').textContent = 1
    noLoop();
  }  
}