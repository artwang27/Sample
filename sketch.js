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

    setupFont();

    //LetterTest();

    let startx=22;
    let starty=14;

 

    let spx=32;
    let spy=49;
    let letterPerLine=10;
    let lines=5;

    let letterAry=[];
    letterAry=SamplingStrings(letterPerLine, lines, startx, starty, spx, spy);

    let strAry=letterAry[2].toStringArray('O',' ');
    writeStringArray(strAry);



	//translate(350, 0);

}


//把字串陣列印到 html上
function writeStringArray(strAry){
	let s="";
	for(let i=0; i< strAry.length; i++){
		s = s+ strAry[i] + "<BR>";
	}

	document.getElementById("textArea").innerHTML = s;
}


//取樣字串裡的每個點
/*
letterPerLine：一行有幾個字
lines：共有幾行
spx：字距，字與字的距離 
spy：字距，字與字的距離
*/
function SamplingStrings(letterPerLine, lines, startx, starty,spx, spy){
    let letterAry=[];

    let y = starty;
    for(let j=0; j<lines; j++){
        let x=startx;
       
        for(let i=0; i<letterPerLine; i++){
            let L=new Letter(x,y,Font.dx, Font.dy);
            letterAry.push(L);
            
            x+=spx;
        }
        y+=spy;
    }

    return letterAry;
}



function setupFont(){
    let c = color(245, 218, 4);
    Font.setupTrueColor(c);

    c = color("Black");
    Font.setupFalseColor(c);

    Font.dx = 5;
    Font.dy = 5;

    print(Font.TrueColor);

}

function LetterTest(){
    let startx = 22;
    let starty = 15;

    let L = new Letter(startx, starty, 5, 5);
    print(L.bits);

    //在 html 以文字 char 方式來填圖
    let strAry = L.toStringArray('O', '_');
    print(strAry);
    writeStringArray(strAry);


}