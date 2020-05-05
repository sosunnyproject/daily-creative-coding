let colors = ['#e23d21', '#cc563c', '#e7642c','#f28435', '#d3b33c', '#dac670', '#c0970b', '#a5b062', '#7e8b46', '#bfd36c', '#ddf280'];
let font;
function preload() {
    font = loadFont("fonts/LobsterTwo/LobsterTwo-Bold.otf");
}

let points;
let bounds;
let caption = "ovendry tomato";
let col =0;
let loopNum = 20;
let count=0;

function setup() {
    createCanvas(800, 500);
    // colorMode(HSB);
    noFill();
    strokeWeight(1);
    stroke(100, 80, 100);
    points = createPoints(caption);

    // points = font.textToPoints(caption, 0, 0, 100, {
    //     sampleFactor: 5, 
    //     simplifyThreshold: 0
    // });
    bounds = font.textBounds(" " + caption + " ", 0, 0, 100);
}

function draw(){
    background(0, 5);
    // let noiseVal = Math.floor(noise(colors.length)*10);
    // points = createPoints(caption);
    // beginShape();
    // translate(10, height/2);
    translate(30, 150);

    // translate(-bounds.x * width / bounds.w, -bounds.y * height/ bounds.h);
    
    // stroke(255, 0, 0);
    stroke(random(colors));
    strokeWeight(3);
    for (let i = 0; i < 20; i++) {
        let p = points[count];
        vertex(p.x, p.y);
        count++;
        if (count > points.length-1) {
          count = 0;
        }
      }
    // for(let i = 0; i < points.length; i++) {
    //     let p = points[i];
    //     // console.log(i);
    //     vertex(p.x, p.y);

    //     // vertex(
    //     //     p.x * width / bounds.w +
    //     //       sin(20 * p.y / bounds.h + millis() / 1000) * width / 30,
    //     //     p.y * height / bounds.h
    //     //   );
    // }
    // endShape(CLOSE);
}

function createPoints(txt){
    points = font.textToPoints(txt, 0, 0, 100, {
      sampleFactor: 2,
      simplifyThreshold: 0
    });
    return points;
  }