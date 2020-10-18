let num = 13
let w;

function setup(){
  createCanvas(500, 500)
  background(255)
  w = width/num
  for(let i = 0; i < num*num; i++){
    //모듈러 연산
    let coordX = i % num // 23%10-->3
    let coordY = floor(i / num) // 34/10 -->3

    fill(0)
    if(coordX % 2 === 0 && coordY % 2 ===0) fill(255)
    if(coordX % 2 !== 0 && coordY % 2 !== 0) fill(255)
    // if((i + (coordY % 2)) % 2 === 0) fill(255)
    rect(coordX*w, coordY*w, w, w)
  }
}

function draw(){

}