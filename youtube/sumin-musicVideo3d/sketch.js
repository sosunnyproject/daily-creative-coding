function setup() {
  createCanvas(400, 400, WEBGL);
  normalMaterial();
}

function draw() {
  background(0)
  orbitControl()
  for (let x = -width; x < width; x += 40) {
    for (let y = -height; y < height; y += 40) {
      for (let z = -200; z < 200; z += 40) {
        push()
        translate(x, y, z)
        noStroke()
        sphere(2)
        pop()
      }
    }
  }
}