let sceneNum = document.querySelector('#scene');
// sceneNum.addEventListener('DOMSubtreeModified', checkScene)

function checkScene() {
  const scene = sceneNum.textContent
  switch(scene) {
    case '1': 
      // removeJS('intro.js')
      // loadJS('donut.js')
      break;
  }
}

function loadJS(filename) {
  setTimeout(2000)
  // load new 
  var script = document.createElement('script');
  script.onload = function () {
      //do stuff with the script  
  };
  script.src = filename;
  setTimeout(document.body.appendChild(script), 5000)
}

function removeJS(filename){
    // remove prev
    const scriptList = document.body.querySelectorAll("script")
    const convertedNodeList = Array.from(scriptList)
    const prevScript = convertedNodeList.find(script => script.attributes.src.nodeValue === filename)
    console.log(scriptList, prevScript)
    prevScript.parentNode.removeChild(prevScript)
  
    const canv = document.body.querySelector('canvas')
    canv.parentNode.removeChild(canv)
  
}