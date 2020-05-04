function setup() {
  var cnv = createCanvas(windowWidth, windowHeight); // make a full screen canvas
  cnv.style("display", "block"); // get rid of default margin that some browsers have for canvas
  background(0);
  pixelDensity(1);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  let yoff = 0;
  let inc = 0.005;

  loadPixels();
  for (let y = 0; y < height; y++) {
    let xoff = 0;
    for (let x = 0; x < width; x++) {
      var index = (x + y * width) * 4;
      var r = noise(xoff, yoff) * 255; // noise gives a value between 0 and 1, always the same for a given xoff (= point in time)
      // right now we are at one given pixel, which is defined by 4 values : R G B A
      pixels[index] = r; // red value
      pixels[index + 1] = r; // green value
      pixels[index + 2] = r; // blue value
      pixels[index + 3] = 255; // alpha

      xoff += inc;
    }
    yoff += inc;
  }
  updatePixels();
  noLoop();
}
