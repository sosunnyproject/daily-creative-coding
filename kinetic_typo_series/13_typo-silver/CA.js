// cells.length = tiles 

class CA {

  constructor(tiles, tileSize) {
    this.width = tiles * 2
    this.size = tileSize
    this.generation = 0  // each horizontal line
    
    this.ruleset = [0, 0, 0, 1, 1, 1, 1, 0] // ruleset 30
    this.cells = []
    for (let i = 0; i < this.width; i++) {
      this.cells[i] = 0
    }
    this.cells[this.width / 2] = 1
    // all cells start with state 0
    // except the center index has state 1
  }


  generate() {
    let nextgen = []
    for (let i = 1; i < (this.width - 1) ; i++) {

      //left, middle, right
      let left = this.cells[i - 1]
      let me = this.cells[i]
      let right = this.cells[i + 1]
      nextgen.push(this.rules(left, me, right))
    }
    this.cells = nextgen
    this.generation++
  }
  
  render(){
    for(let i = 0; i < this.width; i++) {
      if(this.cells[i] == 1) {
        image(kira, i*this.size, this.generation*this.size)
      }
    }
  }
  
  rules(a, b, c) {
  	if (a == 1 && b == 1 && c == 1) return this.ruleset[0];
  	if (a == 1 && b == 1 && c === 0) return this.ruleset[1];
  	if (a == 1 && b === 0 && c == 1) return this.ruleset[2];
  	if (a == 1 && b === 0 && c === 0) return this.ruleset[3];
  	if (a === 0 && b == 1 && c == 1) return this.ruleset[4];
  	if (a === 0 && b == 1 && c === 0) return this.ruleset[5];
  	if (a === 0 && b === 0 && c == 1) return this.ruleset[6];
  	if (a === 0 && b === 0 && c === 0) return this.ruleset[7];
  	return 0;
  }
  
  restart(){
    if(this.generation > this.width) {
      this.generation = 0
      this.generate()
    }
  }
}