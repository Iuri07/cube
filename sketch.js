let w = 22;
let angle = 0;
let magic_angle;

function setup() {
  // magic_angle = atan(1/sqrt(2));
  magic_angle = QUARTER_PI;

  createCanvas(windowWidth, windowHeight, WEBGL);
  ortho(-width / 2, width / 2, height / 2, -height / 2, 0, 2000);
}

function draw() {
  background(10);

  ambientMaterial(255);
  // directionalLight(80, 0, 195, -1, 1, 0);
  directionalLight(0, 153, 195, -1, 1, 0);
  directionalLight(62, 227, 183, 0, -1, -1);

  let off = min(width, height);
  translate((-off/2 + w + 100), 0, 0);
  rotateX(QUARTER_PI);
  rotateY(magic_angle);

  let limit = floor((off -200)*sin(magic_angle)/(w+2));

  for(let z = 0; z < limit; z++){
    for(let x = 0; x < limit; x++){
      let offset = dist(x,z, limit/2, limit/2);
      let scl = map(offset, 0, limit/2, 0.1, 1)
      let h = map(sin(angle+offset*scl/2), -1, 1, 60, limit*20)
      push();
      translate((w + 2)*x, 0, (w + 2)*z);
      box(w,h,w);
      pop();
    }
  }
  angle-=0.07;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight, WEBGL);
  ortho(-width / 2, width / 2, height / 2, -height / 2, 0, 2000);
}
