function setup() {
	// put setup code here
	createCanvas(800, 600);
	image(img, 0, 0);

	test();
	return;
	getLetter(0, 0, 80, 80, colorAsBool);
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
	img = loadImage('assets/eng02.png');
}



function test() {
	print("---");

	//Font.setupTrueColor("White");
	//Font.TrueColor=color("White").levels;
	let c= color(245,218,4);
	Font.setupTrueColor( c);
	c=color("Black");
	Font.setupFalseColor(c);

	print(Font.TrueColor);
	print("---");

	let L=new Letter();
	//let colors=L.asColors(2, 2, 54, 54);
	//print(colors);

	translate(350, 0);
	L.asBools(23,14,5,5);
	print(L.bits);

	const space=""
	let strAry = L.toStrings('O',' ');
	print(strAry);

	printLetter(strAry);

}

function printLetter(strAry){
	let s="";
	for(let i=0; i< strAry.length; i++){
		s = s+ strAry[i] + "<BR>";
	}

	document.getElementById("textArea").innerHTML = s;
}

