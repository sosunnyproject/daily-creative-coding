let walkers = []
let colors = extractColors("https://coolors.co/233d4d-fe7f2d-fcca46-a1c181-619b8a")
function setup() {
  createCanvas(400, 400);
  background(0);
  let w = new Walker(width/2, height/2);
  // colorMode(HSB);
  walkers.push(w)
}

function draw() {
	for(let i = 0; i < walkers.length; i++){
		let w = walkers[i]
		w.step(random(10, 20));
		w.display(random(colors));
		w.bounce();
		if(w.stop()) {
			walkers.splice(i, 1)
		}
	}
}

function mousePressed() {
	let w = new Walker(width/2, height/2);
  walkers.push(w)
}

function extractColors(url)
{
	let slaIndex = url.lastIndexOf("/");
	let colStr = url.slice(slaIndex + 1);
	let colArr = colStr.split("-");
	for(let i = 0; i < colArr.length; i++)colArr[i] = "#" + colArr[i];
	return colArr;
}