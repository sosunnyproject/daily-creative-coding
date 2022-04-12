let balls = []
let lines = []
function setup() {
  createCanvas(400, 400);
  
  for(let i = 0; i < 10; i++) {
    let pos = createVector(random(30, width-30), random(50, height-50))
    let b = new Ball(pos)
    balls.push(b)
  }
  
  let s = createVector(0, 0)
  let e = createVector(width, height)
  let movingLine = new MovingLine(s, e)
  lines.push(movingLine)
}

function draw() {
  background(220);
  let prevVec = createVector(width/2 - 50, height/2)
  let currVec = createVector(width/2 + 50, height/2)
  
  // line(prevVec.x, prevVec.y, currVec.x, currVec.y)
  
  // line(pmouseX, pmouseY, mouseX, mouseY)
  let currMouse = createVector(mouseX, mouseY)
//   for(let b of balls) {
//     if(currMouse.dist(b.pos) < 80) {
//       line(mouseX, mouseY, b.pos.x, b.pos.y)
//       text(int(currMouse.dist(b.pos)), b.pos.x, b.pos.y+30)

//     } 
//     b.render()
//     // line(mouseX, mouseY, b.pos.x, b.pos.y)
//   }
  strokeWeight(5)
  for(let l of lines) {
    l.render()
  }
}

class MovingLine {
  constructor(start, end) {
    this.start = start
    this.end = end
    this.prevPos = start
    this.pos = start
    this.acc = createVector(0.25, 0.3)
    this.vel = createVector(5, 5)
    this.len = int(start.dist(end)/4)
  }
  
  render() {
    this.update()
    this.prevPos = this.pos
    line(this.prevPos.x, this.prevPos.y, this.pos.x, this.pos.y)
  }
  
  update() {
    this.acc.x = noise(0.1, 0.9)
    this.acc.y = noise(0.1, 0.5)
    this.vel.add(this.acc)
    this.vel.mult(3)
    this.pos.add(this.vel)
    
    this.prevPos = this.pos
    this.vel.mult(0)
        
    // this.prev is start
    // this.curr is start + 5ish
    // this.curr = this.prev
    // this.curr = this.curr + 5ish
    // if this.curr > this.end, this.curr = start + 5, this.prev = start
  }
  
  
}

class Ball {
  constructor(pos) {
      this.pos = pos
  }
  
  render() {
    ellipse(this.pos.x, this.pos.y, 30)
  }
}