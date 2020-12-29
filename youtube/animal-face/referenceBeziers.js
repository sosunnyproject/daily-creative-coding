
// bezier(x1, y1, cpx1, cpy1, cpx2, cpy2, x2, y2);
// 8 parameters
// x1, y1 : start point
// cpx1, cpy1: control point of start point
// x2, y2 : end point
// cpx2, cpy2: control point of end point

// start point
let startP = createVector(Math.abs(sin(t))*width/4*2, 300)
vertex(startP.x, startP.y); 

// control points
let firstCP = createVector(mouseX + 300, mouseY)
let secondCP = createVector(mouseX + 50, mouseY)

// draw eyes
fill(71, 37, 0)
ellipse(firstCP.x, firstCP.y, 20, 20)
ellipse(secondCP.x, secondCP.y, 20, 20)

// end point
let endP = createVector(width - Math.abs(sin(t))*width/4*2, 300)
b.drawVertex(firstCP, secondCP, endP)

class Butterfly {

  constructor(x, y, size, numStrokes) {
    // define default variables and values for this object
    // ...
  }

  display() {

    // define coordinates 
    // ...
    // call drawBezier function  I made in this Butterfly class
    this.drawBezier(v0[0], v0[1], v0[2], v0[3])
    this.drawBezier(v1[0], v1[1], v1[2], v1[3])
    this.drawBezier(v2[3], v2[1], v2[2], v2[0])
    this.drawBezier(v3[3], v3[1], v3[2], v3[0])
  }


  setPoints(x, y, controlEoff, size, range, upsideDown) {
    // determining the direction of control end point
    // ...
    let vertices = [pointS, controlS, controlE, pointE]
    return vertices
  }

  drawBezier(pointS, controlS, controlE, pointE) {

    let t = (frameCount / 100) % 300
    for (let i = 0; i < this.numStrokes; i++) {
      // ...
      bezier(pointS.x, pointS.y,
        controlS.x + i * sin(nn) * 11, controlS.y + i * cos(nn) * 10,
        controlE.x + i * sin(nn) * 12, controlE.y + i * cos(nn) * 11,
        pointE.x, pointE.y)
    }
  }
}
