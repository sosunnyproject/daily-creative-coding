function setup() {
  createCanvas(400, 400);

}

function draw() {
  background(0);
  colorMode(HSB)
  
  let x = width / 2
  let topY = height / 4
  let v0 = setPoints(x, topY, random(0.5, 0.1))
  let v1 = setPoints(x, topY, random(0.5, 0.1))

  let bottomY = height / 2
  let v2 = setPoints(x, bottomY, random(0.5, 0.1))
  let v3 = setPoints(x, bottomY, random(0.5, 0.1))

  fill(frameCount%360, 100, 100)
  noStroke()
  // noFill()
  
  let controlE0 = {
    x: mouseX + (sin(frameCount / 10) * width), //pointE.x + sin(off) * 325,
    y: mouseY - height / 2 // pointE.y + sin(off) * 125,
  }

  drawBezier(v0[0], v0[1], controlE0, v0[3])

  let controlE1 = {
    x: mouseX - (sin(frameCount / 10) * width), //pointE.x + sin(off) * 325,
    y: mouseY - height / 2 // pointE.y + sin(off) * 125,
  }
  drawBezier(v1[0], v1[1], controlE1, v1[3])
  
  ellipse( v0[1].x,  v0[1].y, 30 , 30)
  ellipse(v1[1].x, v1[1].y, 30 , 30)

  // ellipse(controlE0.x, controlE0.y, 30 , 30)
  // ellipse(controlE1.x, controlE1.y, 10 , 10)
  

  let controlSbottom = {
    x: mouseX, //pointE.x + sin(off) * 325,
    y: height  // pointE.y + sin(off) * 125,
  }
  let controlEbottom1 = {
    x: mouseX - (sin(frameCount / 10) * width ), //pointE.x + sin(off) * 325,
    y: height // + 100
  }
  let controlEbottom2 = {
    x: mouseX + (sin(frameCount / 10) * width ), //pointE.x + sin(off) * 325,
    y: height  // + 100
  }
  
  drawBezier(v2[3], controlSbottom, controlEbottom1, v2[0])
  drawBezier(v3[3], controlSbottom, controlEbottom2, v3[0])
}

function setPoints(x, y, off) {
  let pointS = {
    x: x,
    y: y
  }
  let pointE = {
    x: pointS.x, //random(-125, 125),
    y: pointS.y + height / 3
  }
  let controlS = {
    x: mouseX, //pointE.x + sin(off) * 325,
    y: mouseY - height / 2 // pointE.y + sin(off) * 125,
  }
  let controlE = {
    x: mouseX, //pointE.x + sin(off) * 325,
    y: mouseY - height / 2 // pointE.y + sin(off) * 125,
  }
  let vertices = [pointS, controlS, controlE, pointE]

  return vertices
}

function drawBezier(pointS, controlS, controlE, pointE) {

  let t = (frameCount / 100) % 300
  // let e = easeOutSine(t)
  // let v = map(e, -0.5, 0.5, 0, PI)
  // anchorE = {
  //       x: pointE.x + sin(frameCount/10)*25,
  //       y: pointE.y + sin(frameCount/10)*100,
  //     }

  controlS = {
    x: controlS.x + random(-25, 25), //(off)*25,
    y: controlS.y + random(-25, 25),
  }

  bezier(pointS.x, pointS.y,
    controlS.x, controlS.y,
    controlE.x, controlE.y,
    pointE.x, pointE.y)
}