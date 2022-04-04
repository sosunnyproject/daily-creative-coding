class Walker{
  constructor(x, y){
    this.pos = createVector(x, y);
    // this.vel = createVector(1, 1);
    // this.acc = createVector(1,0);
		this.stepsNum = 0;
  }
  
  step(val){
   let choice = parseInt(random(4)); 
   switch(choice){
     case 0:
       this.pos.x += val;
       break;
     case 1:
       this.pos.x -= val;
       break;
     case 2: 
       this.pos.y += val;
       break;
     case 3:
       this.pos.y -= val; 
       break;
   }
	 this.stepsNum++;
  }

	stop(){
		if(this.stepsNum > 300) {
		  return true
		}
	}
  
  display(color){
		// stroke(color)
		fill(color)
    noStroke();
    // stroke(map((this.pos.x+this.pos.y)/2, 0, width, 0, 360), 60, 100);
    // strokeWeight(random(1,15));
    // point(this.pos.x, this.pos.y);
		let size = random(10, 20)
		rect(this.pos.x, this.pos.y, size, size, 4)
    // ellipse(this.pos.x, this.pos.y, 10, 10);
  }
  
  bounce(){
    // console.log(x, y);
    if((this.pos.x > width) || (this.pos.x < 0)){
      this.pos.x = width/2;

    }
    if((this.pos.y > height) || (this.pos.y < 0)){
      this.pos.y = height/2;
      // console.log(this.pos.x, this.pos.y);
    }
  }
}