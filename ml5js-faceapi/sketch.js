let faceapi;
let video;
let detections;
let noseImg, eyeImg;
let leftEyeImg, rightEyeImg, mouthTopImg, mouthBottomImg;

// by default all options are set to true
const detection_options = {
    withLandmarks: true,
    withDescriptors: false,
}

function preload() {
  // noseImg = loadImage('nose.png');
  leftEyeImg = loadImage('lefteye.png')
  rightEyeImg = loadImage('righteye.png');
  mouthTopImg = loadImage('mouth-top.png');
  mouthBottomImg = loadImage('mouth-bottom.png');
}
function setup() {
    createCanvas(360, 270);

    // load up your video
    video = createCapture(VIDEO);
    video.size(width, height);
    video.hide(); // Hide the video element, and just show the canvas
    faceapi = ml5.faceApi(video, detection_options, modelReady)
    textAlign(RIGHT);
  
    // noseImg.resize(100, 200)
    leftEyeImg.resize(80, 30);
    rightEyeImg.resize(80, 30);
    mouthTopImg.resize(65, 30);
    mouthBottomImg.resize(65, 30);
    rectMode(CENTER)


}

function modelReady() {
    console.log('ready!')
    console.log(faceapi)
    faceapi.detect(gotResults)

}

function gotResults(err, result) {
    if (err) {
        console.log(err)
        return
    }
    // console.log(result)
    detections = result;

    // background(220);
    background(0);
    // image(video, 0,0, width, height)
    if (detections) {
        if (detections.length > 0) {
            // console.log(detections)
            // drawBox(detections)
            drawLandmarks(detections)
        }

    }
    faceapi.detect(gotResults)
}

function drawBox(detections){
    for(let i = 0; i < detections.length; i++){
        const alignedRect = detections[i].alignedRect;
        const x = alignedRect._box._x
        const y = alignedRect._box._y
        const boxWidth = alignedRect._box._width
        const boxHeight  = alignedRect._box._height
        
        noFill();
        stroke(161, 95, 251);
        strokeWeight(2);
        rect(x, y, boxWidth, boxHeight);
    }
    
}

function drawLandmarks(detections){
    stroke(161, 95, 251)  
    strokeWeight(2)
    // fill(161, 95, 251)
    noFill()

    for(let i = 0; i < detections.length; i++){
        const mouth = detections[i].parts.mouth; 
        const nose = detections[i].parts.nose;
        const leftEye = detections[i].parts.leftEye;
        const rightEye = detections[i].parts.rightEye;
        const rightEyeBrow = detections[i].parts.rightEyeBrow;
        const leftEyeBrow = detections[i].parts.leftEyeBrow;
        const jawOutline = detections[i].parts.jawOutline

        const noseColor = video.get(nose[3]._x, nose[3]._y)
      
        // fill(noseColor)
        // drawPart(jawOutline, false);
      
        // noStroke()
        // rect(nose[3]._x, nose[3]._y-10, 50, 50)
      
              
        // fill(161, 95, 251)
        // drawPart(mouth, true);
        // drawPart(nose, false);
        // drawPart(leftEye, true);
        drawPart(leftEyeBrow, false);
        // drawPart(rightEye, true);
        drawPart(rightEyeBrow, false);
      
        // ellipse(mouth[1]._x, mouth[1]._y, 30, 30)
        // ellipse(mouth[10]._x, mouth[10]._y, 30, 30)
        image(mouthTopImg, mouth[1]._x-30, mouth[1]._y+20)
        image(mouthBottomImg, mouth[10]._x-30, mouth[10]._y+25)
        // image(noseImg, nose[3]._x-50, nose[3]._y-50)
        image(leftEyeImg, leftEye[1]._x-80, leftEye[1]._y-10)
        image(rightEyeImg, rightEye[1]._x+10, rightEye[1]._y-10)

    }

}

function drawPart(feature, closed){
    beginShape();
    for(let i = 0; i < feature.length; i++){
        const x = feature[i]._x
        const y = feature[i]._y
        vertex(x, y)
    }
    
    if(closed === true){
        endShape(CLOSE);
    } else {
        endShape();
    }
    
}