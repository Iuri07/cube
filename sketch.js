let w = 22;
let angle = 0;
let speed = 0.07;
let magic_angle;
let limit;
let off;
let _off;
let disX;
let disZ;

function setParams(){
  w = 22;
  off = min(width, height);
  limit = floor((off*0.9)*sin(magic_angle)/(w+2));
  if(limit < 15){
    w = floor((off*0.9)*sin(magic_angle)/15 - 2);
    limit = 15
  }
}

function setup() {
  magic_angle = QUARTER_PI;

  createCanvas(windowWidth, windowHeight, WEBGL);
  ortho(-width / 2, width / 2, height / 2, -height / 2, 0, 2000);

  setParams();
  disX = limit/2;
  disZ = limit/2;
}

function mouseClicked(){
  angleMode(DEGREES);
  let off = min(width, height);
  let limit = floor((off*0.9)*sin(45)/(w+2));

  off = floor(width/2 - off/2*0.9 + w*0.5 -2)
  let l = 1.75*limit*(w+2)*sin(35.4);

  if(   mouseX*tan(35.4) + height/2 - off*tan(35.4) - w >= mouseY
        && -mouseX*tan(35.4) + height/2 + off*tan(35.4) -w <= mouseY
        && -mouseX*tan(35.4) + height/2 + off*tan(35.4) + l >= mouseY
        && mouseX*tan(35.4) + height/2 - off*tan(35.4) - l <= mouseY ){
    let bw = w+2;

    sx = mouseX ;
    sz = mouseY;

    x = floor((-sx / bw) + (sz / (bw*0.75)));
    z = floor((sz /(bw*0.75)) + (sx /bw));

    minX = get_min(tan(35.4), height/2 - off*tan(35.4) -w, tan(35.4), height/2 + off*tan(35.4), 0)
    maxX = get_min(tan(35.4), height/2 - off*tan(35.4) - l, tan(35.4), height/2 + off*tan(35.4), 0)
    minZ = get_min(tan(35.4), height/2 - off*tan(35.4) - w, tan(35.4), height/2 + off*tan(35.4), 1)
    maxZ = get_min(tan(35.4), height/2 - off*tan(35.4) -w, tan(35.4), height/2 + off*tan(35.4) + l, 1)

    disX = floor(map(x, minX, maxX, 0, limit));
    disZ = floor(map(z, minZ, maxZ, 0, limit));
  }
  angleMode(RADIANS);
}

function keyPressed(){
  if(key == ' '){
    disX = limit/2;
    disZ = limit/2;
  }
}

function draw() {
  background(10);
  stroke(0)

  ambientMaterial(255);
  directionalLight(0, 153, 195, -1, 1, 0);
  directionalLight(62, 227, 183, 0, -1, -1);

  translate(floor(-off/2*0.9 + w), 0, 0);
  rotateX(QUARTER_PI);
  rotateY(QUARTER_PI);

  for(let z = 0; z < limit; z++){
    for(let x = 0; x < limit; x++){
      let offset = dist(x,z, disX, disZ);
      let scl = map(offset, 0, limit*sqrt(2), 0.1, 1);
      let h = map(sin(angle+offset*scl*0.9), -1, 1, 60, limit*20);
      push();
      translate((w + 2)*x, 0, (w + 2)*z);
      box(w,h,w);
      pop();
    }
  }
  angle -= speed;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight, WEBGL);
  ortho(-width / 2, width / 2, height / 2, -height / 2, 0, 2000);
  setParams();
}
