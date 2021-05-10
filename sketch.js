let img;    //可以是彩色的
let img2;   //img 的備份，用來製作 filter 所產生的圖形，所以呈現出黑白兩色
function preload() {
    img = loadImage('assets/03.jpg');
}


function setup() {
    img2 = new p5.Image(img.width, img.height);

    layout();

	let canvas=createCanvas(800, 600);
    canvas.position(300,0);
    
    //duplicate(img, img2);
    changeImageContrast();

    reDraw();
}



function draw() {
    return;
}


//圖形重新繪製，並過濾成黑白兩色
function reDraw(){
    clear();
    image(img2, 0, 0);

    //textSize(32);
    //text('word', 18, 32);
}





function LetterTest() {

    //重畫螢幕，因為上面可能有輔助格線，這次不要畫格線
    print("LetterTest");
    reDraw();
    resetFont();


    let startx = float(dom.startx.value());    //22;
    let starty = float(dom.starty.value());    //15;

    let L = new Letter(startx, starty);

    //在 html 以文字 char 方式來填圖
    let strAry = L.toStringArray('O', '_');
    //print(strAry);
    showStringArrayHtml(strAry);

    drawLetterToCanvas();
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



