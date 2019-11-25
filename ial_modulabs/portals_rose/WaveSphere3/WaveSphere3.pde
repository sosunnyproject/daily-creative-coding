import de.voidplus.leapmotion.*;

LeapMotion leap;

int Nmax = 1400 ; 
float M = 50 ; 
float H = 0.93 ; 
float HH = 0.01 ;

float X[] = new float[Nmax+1];
float Y[] = new float[Nmax+1];
float Z[] = new float[Nmax+1];
float dX[] = new float[Nmax+1];
float dY[] = new float[Nmax+1];
float dXDest[] = new float[Nmax+1];
float dYDest[] = new float[Nmax+1];

float V[] = new float[Nmax+1];
float dV[] = new float[Nmax+1]; 
float L ; 
float R = 2*sqrt((4*PI*(200*200)/Nmax)/(2*sqrt(3))) ;
float Lmin ; 
int N ; 
int NN ; 
float KX ; 
float KY ; 
float KZ ; 
float KV ; 
float KdV ; 
int K ;

int objectX = 500;
int objectY = -500;

float fingerX = 0;
float fingerY = 0;

boolean isDragged = false;
float timePrev;

PVector prePos;
PVector postPos;

int maxFrame = 100;
int startFrame = 0;

boolean isRecieve = false;

void setup() {

  fullScreen();
  background(0, 0, 0) ;
  noSmooth() ;
  stroke(255, 255, 255) ;
  fill(50, 50, 50) ;
  for ( N = 0; N <= Nmax; N++ ) {
    X[N] = 0 ;
    Y[N] = 0 ;
    Z[N] = random(-300, +300) ;
    dX[N] = 0;
    dY[N] = 0;
  }
  prePos = new PVector(0, 0);
  postPos = new PVector(0, 0);
  leap = new LeapMotion(this);
}

boolean isInnerMouse(float posx, float posy, int boundary) {
  if (posx > objectX - boundary && posx < objectX + boundary) {
    if (posy > objectY - boundary && posy < objectY + boundary) {
      return true;
    }
  }
  return false;
}

void drawingSphere(float X[], float Y[], float Z[], int xLoc, int yLoc, float dX[], float dY[]) {
  for ( N = 0; N <= Nmax; N++ ) {
    for ( NN = N+1; NN <= Nmax; NN++ ) {
      L = sqrt(((X[N]-X[NN])*(X[N]-X[NN]))+((Y[N]-Y[NN])*(Y[N]-Y[NN]))) ;
      L = sqrt(((Z[N]-Z[NN])*(Z[N]-Z[NN]))+(L*L)) ;
      if ( L < R ) {
        X[N] = X[N] - ((X[NN]-X[N])*((R-L)/(2*L))) ;
        Y[N] = Y[N] - ((Y[NN]-Y[N])*((R-L)/(2*L))) ;
        Z[N] = Z[N] - ((Z[NN]-Z[N])*((R-L)/(2*L))) ;
        X[NN] = X[NN] + ((X[NN]-X[N])*((R-L)/(2*L))) ;
        Y[NN] = Y[NN] + ((Y[NN]-Y[N])*((R-L)/(2*L))) ;
        Z[NN] = Z[NN] + ((Z[NN]-Z[N])*((R-L)/(2*L))) ;
        dV[N] = dV[N] + ((V[NN]-V[N])/M) ;
        dV[NN] = dV[NN] - ((V[NN]-V[N])/M) ;
        stroke(125+(Z[N]/2), 125+(Z[N]/2), 125+(Z[N]/2)) ; 
        line(X[N]*1.2*(200+V[N])/200+xLoc+dX[N], Y[N]*1.2*(200+V[N])/200+yLoc+dY[N], X[NN]*1.2*(200+V[NN])/200+xLoc+dX[N], Y[NN]*1.2*(200+V[NN])/200+yLoc+dY[N]) ;
      }
      if ( Z[N] > Z[NN] ) {
        KX = X[N] ; 
        KY = Y[N] ; 
        KZ = Z[N] ; 
        KV = V[N] ; 
        KdV = dV[N] ; 
        X[N] = X[NN] ; 
        Y[N] = Y[NN] ; 
        Z[N] = Z[NN] ; 
        V[N] = V[NN] ; 
        dV[N] = dV[NN] ;  
        X[NN] = KX ; 
        Y[NN] = KY ; 
        Z[NN] = KZ ; 
        V[NN] = KV ; 
        dV[NN] = KdV ;
      }
    }
    L = sqrt((X[N]*X[N])+(Y[N]*Y[N])) ;
    L = sqrt((Z[N]*Z[N])+(L*L)) ;
    X[N] = X[N] + (X[N]*(200-L)/(2*L)) ;
    Y[N] = Y[N] + (Y[N]*(200-L)/(2*L)) ;
    Z[N] = Z[N] + (Z[N]*(200-L)/(2*L)) ;
    KZ = Z[N] ; 
    KX = X[N] ;
    Z[N] = (KZ*cos(float(50)/10000))-(KX*sin(float(50)/10000)) ;
    X[N] = (KZ*sin(float(50)/10000))+(KX*cos(float(50)/10000)) ;
    KZ = Z[N] ; 
    KY = Y[N] ;
    Z[N] = (KZ*cos(float(50)/10000))-(KY*sin(float(50)/10000)) ;
    Y[N] = (KZ*sin(float(50)/10000))+(KY*cos(float(50)/10000)) ;
    dV[N] = dV[N] - (V[N]*HH) ; 
    V[N] = V[N] + dV[N] ; 
    dV[N] = dV[N] * H ;
  }
}

void draw() {  
  background(0);
  for (Hand hand : leap.getHands()) {
    if (hand.getGrabStrength() != 1) {
      for (Finger finger : hand.getFingers()) {
        PVector fingerPosition = finger.getPosition();
        int finger_size = int(fingerPosition.z);
        fill(127);
        ellipse(fingerPosition.x, fingerPosition.y, finger_size, finger_size); 
        fingerX = fingerPosition.x;
        fingerY = fingerPosition.y;
        if (isInnerMouse(fingerX, fingerY, 250) && isDragged == false) {
          Lmin = 1000 ; 
          NN = 0 ;
          for ( N = 0; N <= Nmax; N++ ) {
            L = sqrt(((fingerX-(objectX+X[N]))*(fingerX-(objectX+X[N])))+((fingerY-(objectY+Y[N]))*(fingerY-(objectY+Y[N])));
            if ( Z[N] > 0 && L < Lmin ) {
              NN = N ; 
              Lmin = L;
            }
          }
          if ( K == 0 ) {
            dV[NN] = +finger_size ; 
            K = 1;
          } else {
            dV[NN] = +finger_size ; 
            K = 0;
          }
        }
      }
      if (isDragged == true) {
        isDragged = false;
      }
    } else {
      isDragged = true;
      objectX = int(hand.getPalmPosition().x);
      objectY = int(hand.getPalmPosition().y);
    }
  } 
  if (objectX > width - 200) {
    objectX -= 10;
  } else if (objectX < 0 + 200) {
    objectX += 10;
  }
  if (isRecieve == true) {
    drawingSphere(X, Y, Z, objectX, objectY, dX, dY);
  }
  if (isRecieve && objectY < 0 || objectY > height) {
    send(objectX, objectY, 0, 0);
    isRecieve = false;
  }
}


void receive(String msg) {

  String[] data = split(msg, ",");

  if (data.length>=5 && parseInt(data[0]) == 0 ) {
    for ( N = 0; N <= Nmax; N++ ) {
      X[N] = 0 ;
      Y[N] = 0 ;
      Z[N] = random(-300, +300) ;
      dX[N] = 0;
      dY[N] = 0;
    }
    objectX = int(width/2);
    objectY = int(height/2);
  }
}

void send(float posX, float posY, float velX, float velY) {
  String msg = 0 + "," + posX + "," + ( posY>=height?0:height ) + "," + velX + "," + velY;
  //receive(msg);
}

void mouseClicked() {
  isRecieve = true;
  String msg = 0 + "," + 500 + "," + ( 550>=height?0:height ) + "," + 150 + "," + 100;
  receive(msg);
}
