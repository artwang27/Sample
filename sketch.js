function setup() {
  // put setup code here
    createCanvas(1920, 1080);
}

function draw() {
  // put drawing code here

    if (mouseIsPressed) {
        fill(0);
    } else {
        fill(255);
    }
    ellipse(mouseX, mouseY, 80, 80);
}