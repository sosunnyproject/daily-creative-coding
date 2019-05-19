function Particle(x, y) {
  this.x = x;
  this.y = y;

  this.update = function() {
    this.x += random(-50, 50);
    this.y += random(-50, 50);
  }

  this.show = function() {
    noStroke();
    var px = floor(this.x / vScale);
    var py = floor(this.y / vScale);
    var col  = video.get(px, py); // array of single pixel - r, g, b, alpha
    // console.log(col);
    // fill(255, 150);
    fill(col[0], col[1], col[2], col[3]);
    ellipse(this.x, this.y, 20, 20);
  }

}
