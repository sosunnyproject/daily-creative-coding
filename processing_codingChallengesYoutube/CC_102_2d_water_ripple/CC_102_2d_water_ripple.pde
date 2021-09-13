int cols;// = 200;
int rows;// = 200;

float[][] current; //= new float[cols][rows];
float[][] previous; // = new float[cols][rows];

float dampening = 0.95;

void setup() {
  size(400, 400);
  cols = width;
  rows = height;
  current = new float[cols][rows];
  previous = new float[cols][rows];
  //previous[200][200]=255;
}

void mouseDragged(){
  //clicking a mouse = dropping a pebble;
  current[mouseX][mouseY] = 255;
  
}

void draw() {
  background(0);
  loadPixels();
  for(int i = 1; i < cols-1 ; i++){
    for(int j= 1; j < rows -1 ; j++){
      //current: add up all things around me and subtract my value
      current[i][j] = (
      previous[i-1][j] + 
      previous[i+1][j] +
      previous[i][j-1] +
      previous[i][j+1]) / 2 -
      current[i][j];
      current[i][j] = current[i][j] * dampening;
      int index = i + j * cols; // making 2d into 1d array
      // finding pixel in that 1d array address location
      pixels[index] = color(current[i][j]*255);                   
    } 
  }
  updatePixels();
  
  float[][] tempor = previous;
  previous = current;
  current = tempor;
}
