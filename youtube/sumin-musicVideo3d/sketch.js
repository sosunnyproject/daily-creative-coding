function setup() {
  createCanvas(600, 600, WEBGL);
  specularMaterial(255);
}

function draw() {
  background(0)
  orbitControl()

  let dirX = (mouseX / width - 0.5) * 2;
  let dirY = (mouseY / height - 0.5) * 2;
  pointLight(0, 0, 250, -width/2, -height/2, 50); //topleft
  pointLight(250, 0, 250, -width/2, height/2, 50); //bottomleft
  pointLight(0, 250, 250, width/2, height/2, 50); //bottomright
  pointLight(0, 250, 0, width/2, -height/2, 50); //topright


  for (let x = -width; x < width; x += 80) {
    for (let y = -height; y < height; y += 80) {
      for (let z = -600; z < 600; z += 80) {
        push()
        translate(x, y, z)
        noStroke()
        // sphere(10)
        ellipse(x, y, 10, 10)
        pop()
      }
    }
  }
}

// function mouseClicked() {
//   console.log(mouseX, mouseY)
// }