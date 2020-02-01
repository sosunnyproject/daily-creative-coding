var hex_size = 40;
var map_radius = 3;
// FIXME: This should be called map size,
// but I started with hexagons, and refactoring would be too hard
var origin;
var padding = 0;
var grid_type = "HEXAGON" // Change this value for different grid types (HEXAGON, TRIANGLE, PARRALELOGRAM, RECTANGLE)
var intersections = [];
let sizeSlider, sizeVal, radSlider, radVal;
let textArray = ['s', 'a', 'v', 'e', 'b', 'e', 'e', 's', '', '', '', '', ''];
let randomG;

function setup() {
  createCanvas(900, 900);
	angleMode(RADIANS);
	origin = createVector(width/2, height/2-100); // CENTER of CANVAS
  // console.log("setup origin: " + origin); // 350, 350, 0 ;
  sizeSlider = createSlider(0, 100, 48);
  radSlider = createSlider(0, 10, 2);
  lineStroke = createSlider(0, 40, 0);
  pointStroke = createSlider(0, 60, 40);
}

function mousePressed() {
  console.log("hex_size: ", hex_size, ", map_radius: ", map_radius);
}
function draw() {
  background(255); // 지우면 trace 남아서 흥미로움 & transparent 배경위해서 comment

  // 육각형 그리기
  hex_size = sizeSlider.value();
  map_radius = radSlider.value();

  const extraEdge = map_radius + 1; // less pointy on right & left
	if(grid_type == "HEXAGON"){
		for (var q = -map_radius; q <= map_radius + extraEdge ; q++) {
				var r1 = max(-map_radius*2, -q - map_radius);
				var r2 = min(map_radius*2, -q + map_radius + extraEdge);
				for (var r = r1; r <= r2; r+= 1) {
          // hex_to_pixel(q, r) = CENTER of hexagon
					draw_hexagon(hex_to_pixel(q, r), hex_size, q, r);
				}
		}
	}

  // 각 꼭지점
  strokeWeight(pointStroke.value());
  stroke(0);
	for(var i = 0; i < intersections.length; i++){
		point(intersections[i].x, intersections[i].y);
	}
	intersections = [];

}

// 전체 육각형
function hex_to_pixel(q, r) {
	// This is basically a matrix multiplication between a hexagon orientation matrix
	// and the vector {q; r}

  // flat top
  var x = hex_size * (3.0/2 * r);
  var y = hex_size * (sqrt(3) / 2 * r + sqrt(3) * q);

  /*
  // original code - pointy top
  var x = (sqrt(3) * q + sqrt(3)/2 * r) * (hex_size) ;
  var y = (3/2 * r) * hex_size;
  */

  let resultVector = createVector(x + origin.x, y + origin.y);
  return resultVector;
}


function draw_hexagon(center, size, q, r, drawCities = true){
	points = [];

  // FILL INSIDE BIG HEXAGON
	for(let i = 0; i < 10; i++) {
		points.push(hex_corner(center, size - padding + 3, i));
		var c = hex_corner(center, size, i);
		if(intersections_includes(c) == false && drawCities)
			intersections.push(c);
	}

	beginShape();
  // 6 because its hexagon
	for(i = 1; i <= 6; i++){
    noFill();
    strokeWeight(lineStroke.value());
    // sin(value) --> changes which hexagon stroke
    stroke(map(sin(q-r*10), 0, 1, 0, 50));    // black&white
    // stroke(255, random(180, 230), 0);      //yellow

    /* 육각형 내부 색깔 COLOR
		fill( map(-q-r, -map_radius, map_radius, 0, 255),
			map(r, -map_radius, map_radius, 0, 255),
				map(q, -map_radius, map_radius, 0, 255));
    */
    // fill( map(sin(q-r*10), 0, 1, 40, 60), 70, 100, 0.1);

    // point(points[i % 6].x, points[i % 6].y);
		vertex(points[i % 6].x, points[i % 6].y);
		line(points[i-1].x, points[i-1].y, points[i % 6].x, points[i % 6].y);
	}
	endShape();

  // text inside HEXAGON
	fill(0);
  noStroke();
	textSize(20);
	textAlign(CENTER, CENTER);
  // sample case
  //5, 4, 3, 2, 1, 0, -1, -2, -3, -4, -5 ...
  // hex size: 30 , map_radius: 3
  let ind = abs((-q-r) - map_radius);
  let letter = textArray[ind];
  textFont('Uncial Antiqua');
  text(letter, center.x + 1, center.y + 2);  // text location

}

function intersections_includes(c){
	for(var i = 0; i < intersections.length; i++){
		// I have to use approx because the padding results in the
		// intersections not having the EXACT same location (and other things don't line up)
		if(approx(intersections[i].x, c.x) && approx(intersections[i].y, c.y)){
			return true;
		}
	}
	return false;
}

epsilon = padding + 1;

function approx(a,b){
	if(abs(a - b) < epsilon)
		return true;
	return false;
}

function hex_corner(center, size, i){
    var angle_deg = 60 * i // 60, INSTEAD OF 30 MAKES HEXAGON I LIKE.
    var angle_rad = PI/180 * angle_deg;
    return createVector(center.x + size * cos(angle_rad),
                 center.y + size * sin(angle_rad));
}
