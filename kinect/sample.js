var myCanvas = null;

// Declare kinectron 
var kinectron = null;

var frameP;

function setup() {
  myCanvas = createCanvas(500, 500);
  background(0);

  frameP = createP('');

  // Define and create an instance of kinectron
  var kinectronIpAddress = "192.168.219.100"; // FILL IN YOUR KINECTRON IP ADDRESS HERE
  kinectron = new Kinectron(kinectronIpAddress);
  kinectron.setKinectType("windows")

  // Connect with application over peer
  kinectron.makeConnection();

  // Set callbacks
  kinectron.setColorCallback(drawFeed);
  kinectron.setDepthCallback(drawFeed);
  kinectron.setInfraredCallback(drawFeed);
  kinectron.setTrackedBodiesCallback(drawSkeleton);

  
  // kinectron.startTrackedBodies(drawSkeleton);

}

function draw() {
  var fps = frameRate();
  // fill(0);
  stroke(0);
  text("FPS: " + fps.toFixed(0), 10, height);
  frameP.html(fps.toFixed(0));
  
}

// Choose camera to start based on key pressed
function keyPressed() {
  if (keyCode === ENTER) {
    kinectron.startTrackedBodies();
  } else if (keyCode === UP_ARROW) {
    // kinectron.startDepth();
  } else if (keyCode === DOWN_ARROW) {
    // kinectron.startInfrared();
  } else if (keyCode === RIGHT_ARROW) {
    kinectron.stopAll();
  }
}

function drawFeed(img) {
  // Draws feed using p5 load and display image functions  
  loadImage(img.src, function(loadedImage) {
    image(loadedImage, 0, 0);
  });
}

function drawSkeleton(body) {
  background(0, 20);
  console.log(body)

  // Draw a circle at the location of each joint
  for (let i = 0; i < body.joints.length; i++) {
    joint = body.joints[i];

    fill(100);

    // Map Kinect joint data to canvas size
    ellipse(
      joint.depthX * myCanvas.width,
      joint.depthY * myCanvas.height,
      15,
      15
    );
  }
}