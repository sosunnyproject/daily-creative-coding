// flowfield camera

let capture, c;
let scl = 20;
let inc = 0.2;
let bound = 20;
let zoff = 0;

function setup() {
  cols = floor(width / scl);
  rows = floor(height / scl);
  flowfield = new Array(cols * rows);

  c = createCanvas(600, 600);
  // capture = createCapture(VIDEO);
  // capture.size(320, 240)

  let constraints = {
    video: {
      mandatory: {
        minWidth: 720,
        minHeight: 480
      },
      optional: [{ maxFrameRate: 10 }]
    },
  };
  capture = createCapture(constraints, function(stream) {
    console.log(stream);
  });
  capture.hide()
}

function draw() {
  background(0);
  capture.loadPixels()

  let yoff = 0;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      // let ind = (x + y * width) *4;
      let ind = (x + y * cols);
      xoff += inc;

        stroke(255)
        point(x, y)
        console.log(x, y)
        // console.log(ind)
        // video
        // const i = y * width + x;
        const darkness = (255 - capture.pixels[ind]) / 255;
        
        if(darkness < 0.5 ) {
          // vectors
          let angle = noise(xoff, yoff, zoff) * TWO_PI * 3;
          let v = p5.Vector.fromAngle(angle);
          flowfield[ind] = v;
          push();
          translate(x * scl, y * scl);
          rotate(v.heading());
          stroke(255, 100, 100)
          line(0, 0, scl, 0);
          pop();
        }
      }
    yoff += inc;
    zoff += 0.004;
  }
  
}
