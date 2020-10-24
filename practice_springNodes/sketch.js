let num = 200;
let springNodes = [] // number of springs
let constantK = 0.1;  // F = k*W 
let spring_l = 5; // spring length

function setup() {
  createCanvas(400, 400);
  for(let i = 0; i < num;i++) {
    springNodes.push(new SpringNode(i, num))
  }
  
  strokeJoin(BEVEL);
}

function draw() {
  background(220);
  
  for(let i = 0; i < springNodes.length; i++){
    let prev = (i===0) ? springNodes[num-1]: springNodes[i-1].pos
    let next = (i===num-1) ? springNodes[0] : springNodes[i+1].pos
    springNodes[i].calculateForce(prev, next)
    springNodes[i].update()
  }
  
  noFill()
  strokeWeight(2)
  stroke(0)
  beginShape()
  for(let i = 0; i < springNodes.length; i++){
    let x = springNodes[i].pos.x
    let y = springNodes[i].pos.y
    vertex(x, y)
  }
  endShape(CLOSE)
}