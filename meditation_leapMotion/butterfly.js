class Butterfly {

  constructor(x, y, size) {
    this.x = x
    this.topY = y
    this.bottomY = y + (size/2)
    this.size = size
    this.range = random(40)
    this.rangeOffset = random(-this.range, this.range)
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

    let speed = sin(frameCount/100*range)

    let pointS = {
      x: x, //+ sin(frameCount/10)*range,
      y: y
    }
    let pointE = {
      x: x, //+ sin(frameCount/10)*range, 
      y: y + size
    }

    let controlS = {
      x: (upsideDown ? pointE.x : pointS.x) + this.rangeOffset,
      y: upsideDown ? (pointE.y + size) : (pointS.y - (size*2)) // + random(-range, range) 
    }

    let narrow = speed * (size*4) * controlEoff
    let wide = narrow * 1.5
    let controlE = {
      x: upsideDown ? (pointE.x + narrow) : (pointS.x + wide),
      y: upsideDown ? pointE.y - size/4 : pointS.y
    }

    let vertices = [pointS, controlS, controlE, pointE]
    return vertices
  }

 drawBezier(pointS, controlS, controlE, pointE) {

  bezier(pointS.x, pointS.y,
    controlS.x, controlS.y,
    controlE.x, controlE.y,
    pointE.x, pointE.y)
  }


}