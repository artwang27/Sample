
//在取出的範圍，塗上色塊
function paintBox(x, y, dx, dy, c) {
    let r = 0.8;
    fill(c);
    noStroke();
    rect(x, y, dx * r, dy * r);
}



//比對顏色，使用陣列的元素比對
function colorEqual(a, b) {
    return a[0] == b[0] && a[1] == b[1] && a[2] == b[2] && a[3] == b[3];
}


//把拼字用的字串陣列印到 html上
function showStringArrayHtml(strAry) {
    let s = "";
    for (let i = 0; i < strAry.length; i++) {
        s = s + strAry[i] + "<BR>";
    }

    dom.fontHTML.html(s);
}

//把取樣結果畫到 canvas 上
function drawLetterToCanvas() {
    reDraw();

    let startx = float(dom.startx.value());    //22;
    let starty = float(dom.starty.value());    //15;
    let dx = float(Font.dx);
    let dy = float(Font.dy);

    //先取樣
    let L = new Letter(startx, starty);
    let colorAry=L.asColors(startx, starty, dx, dy);
    
    push();
    noStroke();
    translate( startx, starty+(Font.Height+2)*dx);   //向下偏移，方便與原本的字做比較
    fill("red");
    rectMode(CORNER);
    rect(-dx, -dy, (Font.Width+1)*dx, (Font.Height+1)*dy);

    rectMode(CENTER);


    let sc = 0.9; //縮放比例
    let idx=0;
    let y = 0;
    for (let j = 0; j < Font.Height; j++, y += dy) {
        let x = 0;
        for (let i = 0; i < Font.Width; i++, x += dx) {
            fill(colorAry[idx++]);
            rect(x, y, dx*sc, dy*sc);
        }

    }

    pop();

}


function drawFontGrid() {
    reDraw();

    let startx = float(dom.startx.value());
    let starty = float(dom.starty.value());
    let dx = Font.dx;
    let dy = Font.dy;

    push();
    stroke(0,255,0);    //綠色外框
    noFill();
    rectMode(CENTER);

    let y = starty;
    for (let j = 0; j < Font.Height; j++, y += dy) {
        let x = startx;
        for (let i = 0; i < Font.Width; i++, x += dx) {
            rect(x, y, dx, dy);
            //print(x);
        }

    }

    pop();
}

//複製 image 圖像
function duplicate(src, dst){
    let w=src.width;
    let h=src.height;
    dst.copy(src,0,0,w,h,0,0,w,h);

}