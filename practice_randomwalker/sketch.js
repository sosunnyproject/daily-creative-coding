let numW = 10
let numH = 10

let w, h
let margin = 20
let walker
function setup(){
  createCanvas(600, 600)
  w = (width - margin)/ numW
  h = (height - margin)/ numH

  walker = new Walker(numW, numH)

}

function draw(){
  background(255)
  fill(255)
  
  for(let i = 0; i < numW*numH; i++){
    let x = i % numW
    let y = floor(i /  numH) 
    rect(x * w + margin *0.5, y * h + margin*0.5, w, h)
  }
  walker.render()
}

function keyPressed(){
  if(key === ' ') {
    walker.update()
  }
}