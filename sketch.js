function setup() {
  // put setup code here
    createCanvas(1920, 1080);
    image(img, 0, 0);

    print("---");
    //setTrueColor("White");
    Font.TrueColor=color("White").levels;
    print(Font.TrueColor);
    print("---");
    getLetter(0,0,80,80,colorAsBool);
}

function draw() {
  // put drawing code here
    //getLetter(0, 0, 50, 50);
    return;

    if (mouseIsPressed) {
        fill(0);
    } else {
        fill(255);
    }
    ellipse(mouseX, mouseY, 80, 80);
}

let img;
function preload() {
  img = loadImage('assets/tiles.png');
}



