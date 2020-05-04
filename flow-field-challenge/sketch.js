var inc = 0.1;
var scl = 20; // scale (do not name it "scale" because it's the name of a function in p5)
var col, rows;
var zoff = 0;
var particles = [];
var flowfield;

// not dealing with pixels anymore but with vectors

function setup() {
  var cnv = createCanvas(windowWidth, windowHeight); // make a full screen canvas
  cnv.style("display", "block"); // get rid of default margin that some browsers have for canvas
  background(0);
  pixelDensity(1);
  cols = floor(width / scl);
  rows = floor(height / scl);
  flowfield = new Array(cols * rows);
  for (let i = 0; i < 1000; i++) {
    // // to change visualisation (SLIDER) : nbr of particules
    particles[i] = new Particle();
  }
  background(255);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  var yoff = 0;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      var index = x + y * cols;
      flowfield[index] = v;
      var angle = noise(xoff, yoff, zoff) * TWO_PI * 4; // noise gives a value between 0 and 1, always the same for a given xoff (= point in time)
      // to change visualisation (SLIDER): instead of multiplying by TWO_PI and having the particules always coming from the right, we could mulltiply by smth else (ex: TWO_PI * 4)
      var v = p5.Vector.fromAngle(angle);
      v.setMag(0.5); // controls how exactly the particules follow the vectors
      // to change visualisation (SLIDER): how strict is the flow
      stroke(0, 50);
      strokeWeight(1);
      push();
      translate(x * scl, y * scl);
      rotate(v.heading());
      // line(0, 0, scl, 0);
      pop();
      xoff += inc;
    }
    zoff += 0.004;
    yoff += inc;
  }

  for (let i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }
  // noLoop();
}
