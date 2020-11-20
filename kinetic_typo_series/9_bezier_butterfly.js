let butterfly
let butterflies = []
let len = 10

function setup() {
  createCanvas(400, 400);

}
let size = 100
let n = 0.02

function draw() {
  background(0);
  colorMode(HSB)
  background(0)
  colorMode(HSB)
  // blendMode(LIGHTEST);
  
  noFill()

  //   for(let i = 0; i < butterflies.length; i++){
  //     fill(frameCount % 360, 100 - (i*5), 100)
  //     butterflies[i].display()
  //   }
  butterfly.display()

  /*
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
  */
}

// function setPoints(x, y, off) {
//   let pointS = {
//     x: x,
//     y: y
//   }
//   let pointE = {
//     x: pointS.x, //random(-125, 125),
//     y: pointS.y + height / 3
//   }
//   let controlS = {
//     x: mouseX, //pointE.x + sin(off) * 325,
//     y: mouseY - height / 2 // pointE.y + sin(off) * 125,
//   }
//   let controlE = {
//     x: mouseX, //pointE.x + sin(off) * 325,
//     y: mouseY - height / 2 // pointE.y + sin(off) * 125,
//   }
//   let vertices = [pointS, controlS, controlE, pointE]

//   return vertices
// }

// function drawBezier(pointS, controlS, controlE, pointE) {

//   let t = (frameCount / 100) % 300
//   // let e = easeOutSine(t)
//   // let v = map(e, -0.5, 0.5, 0, PI)
//   // anchorE = {
//   //       x: pointE.x + sin(frameCount/10)*25,
//   //       y: pointE.y + sin(frameCount/10)*100,
//   //     }

//   controlS = {
//     x: controlS.x + random(-25, 25), //(off)*25,
//     y: controlS.y + random(-25, 25),
//   }

//   bezier(pointS.x, pointS.y,
//     controlS.x, controlS.y,
//     controlE.x, controlE.y,
//     pointE.x, pointE.y)
// }

class Butterfly {

  constructor(x, y, size, numStrokes) {
    this.x = x
    this.topY = y
    this.bottomY = y + (size / 2)
    this.size = size
    this.range = 25
    this.numStrokes = numStrokes || 5
  }

  display() {
    // let x = width / 2
    // let topY = height / 4

    let v0 = this.setPoints(this.x, this.topY, 1, this.size, this.range)
    let v1 = this.setPoints(this.x, this.topY, -1, this.size, this.range)

    this.drawBezier(v0[0], v0[1], v0[2], v0[3])
    this.drawBezier(v1[0], v1[1], v1[2], v1[3])

    // let bottomY = height / 2 - size / 2
    let v2 = this.setPoints(this.x, this.bottomY, 1, this.size, this.range, true)
    let v3 = this.setPoints(this.x, this.bottomY, -1, this.size, this.range, true)

    this.drawBezier(v2[3], v2[1], v2[2], v2[0])
    this.drawBezier(v3[3], v3[1], v3[2], v3[0])
  }


  setPoints(x, y, controlEoff, size, range, upsideDown) {
    // off: 1 or -1 
    // determining the direction of control end point

    let speed = sin(frameCount / 40)

    let pointS = {
      x: x, //+ sin(frameCount/10)*range,
      y: y
    }
    let pointE = {
      x: x, //+ sin(frameCount/10)*range, 
      y: y + size
    }

    let controlS = {
      x: (upsideDown ? pointE.x : pointS.x), //+ random(-range, range),
      y: upsideDown ? (pointE.y + size) : (pointS.y - (size * 2)) // + random(-range, range) 
    }

    let narrow = speed * (size * 3) * controlEoff
    let wide = narrow * 1.5
    let controlE = {
      x: upsideDown ? (pointE.x + narrow) : (pointS.x + wide),
      y: upsideDown ? pointE.y - size / 4 : pointS.y
    }

    let vertices = [pointS, controlS, controlE, pointE]
    return vertices
  }

  drawBezier(pointS, controlS, controlE, pointE) {

    let t = (frameCount / 100) % 300
    for (let i = 0; i < this.numStrokes; i++) {
      noFill()
      strokeWeight(i)
      stroke((frameCount + i*100) % 360, 100, 100, 0.5)
      let nn = random(5)*n
      bezier(pointS.x, pointS.y,
        controlS.x + i * sin(nn) * 11, controlS.y + i * cos(nn) * 10,
        controlE.x + i * sin(nn) * 12, controlE.y + i * cos(nn) * 11,
        pointE.x, pointE.y)
    }
    n += 0.1
  }

}