// Made with Zdog
let isSpinning = true;

let illo = new Zdog.Illustration({
  // set canvas with selector
  element: '.zdog-canvas',
  dragRotate: true,
  onDragStart: function() {
    isSpinning = false;
  },
  onDragEnd: function() {
    isSpinning = true;
  }
});

let catOne = new Zdog.Hemisphere({
    diameter: 180,
    addTo: illo,
    color: '#C67',
    backface: 'green',
    stroke: false,
  });

let catTwo = new Zdog.Hemisphere({
    diameter: 180,
    addTo: illo,
    rotate: { y: Zdog.TAU/2 },
    color: '#289',
    backface: 'orange',
    stroke: false,
  });

let eye = new Zdog.Polygon({
  addTo: catOne,
  radius: 20,
  sides: 5,
  stroke: 10,
  translate: {x: 50, y: -30, z: -90},
  color: '#EA0',
});

eye.copy({
  translate: {x: -50, y: -30, z: -90},
    color: '#623',
})

let whisker = new Zdog.Shape({
  addTo: catOne,
  path: [
    { x: -20, y: 10 },   // start
    { arc: [
      { x:  -30, y: -30 }, // corner
      { x:  -60, y:  10 }, // end point
    ]},
    { arc: [ // start next arc from last end point
      { x:  -60, y:  10 }, // corner
      { x:  -80, y:  -30 }, // end point
    ]},
  ],
  translate: { y: 10, z: -100},
  closed: false,
  stroke: 20,
  color: '#C45'
});

//nose
new Zdog.Polygon({
  addTo: catOne,
  radius: 15,
  sides: 3,
  stroke: 10,
  translate: { y: 10, z: -100},
  rotate: { x: Zdog.TAU/2},
  color: 'pink',
});

function animate() {
  if(isSpinning) {
    // rotate illo each frame
    illo.rotate.y += 0.03;
  }
  // update & render
  illo.updateRenderGraph();
  // animate next frame
  requestAnimationFrame( animate );
}
// start animation
animate();
