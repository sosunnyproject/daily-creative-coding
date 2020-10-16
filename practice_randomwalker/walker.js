
class Walker{

  constructor(numWidth, numHeight) {
    this.x = floor(random(numWidth))
    this.y = floor(random(numHeight))
    this.numW = numWidth
    this.numH = numHeight
  }


  render(){
    fill(255, 0, 255)
    ellipse(this.x * w + margin * 0.5, this.y * h + margin * 0.5, 10, 10)
  }

  update(){
    let pick = floor(random(4)) // 0,1, 2, 3
    switch(pick){
      case 0:
        if(this.y !== numH) this.y += 1
        break;
      case 1:
        if(this.y !== 0) this.y -= 1
        break;
      case 2:
        this.x += 1
        break;
      case 3:
        this.x -= 1
        break
    }
  }
}