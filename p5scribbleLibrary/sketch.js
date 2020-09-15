var scribble = new Scribble();

function setup() {

  createCanvas(400, 400)
  background(225);
  fill(255, 100, 100)
  stroke(255, 100, 100)

  // x, y is center coords
  scribble.scribbleRoundedRect(120, 120, 100, 100, 40)
  stroke(0, 50, 180)
  

    let xCoords = [70, 170, 170, 70]
  let yCoords = [70, 70, 170, 170]
  let gap = 1
  let angle = 180
  scribble.scribbleFilling(xCoords, yCoords, gap, angle)
  
}

function draw() {


}