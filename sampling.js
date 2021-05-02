/*取樣函式
*/



class Font{
   static Width=5;
   static Height=7;
   static TrueColor;
   //static FalseColor;

   constructor(width, height){
      this.width=width;
      this.height=height;
      TrueColor = color("Black");
      FalseColor = color("White");

   }
   
}

function setTrueColor(c){
   Font.TrueColor=c;
}

/*
function setFalseColor(c) {
   Font.FalseColor = c;
}
*/


//從 bitmap 的某一區間，萃取字體，構成 bool 陣列
function getLetter(startX, startY, dx, dy, colorAs=null) {
   let bits=[];   //array of bool
   let y=startY;
   for(let j=0; j<Font.Height; j++, y+=dy){
      let x=startX;

      for(let i=0; i<Font.Width; i++, x+=dx){

         let result = extract(x, y, dx, dy, colorAs);
         bits.push(result);

      }
   }

   console.log(bits);
}


//預設：傳回陣列(裡面有四個元素，分別代表 r,g,b,a)
function extract(x,y,dx,dy,colorAs){
   let c = get(x, y);   //萃取顏色

   paintBox(x, y, dx, dy,c);

   //若 colorAs 有定義，則繼續執行 colorAs 函式，否則直接傳回陣列(裡面有四個元素，分別代表 r,g,b,a)
   if(colorAs) return colorAs(c);
   else        return c;
}


//判斷顏色若是與 TrueColor 相符，則傳回 true
function colorAsBool(_color){
   //const TrueColor=color("Black");
   const TrueColor = color("White").levels;

   return colorEqual( _color, TrueColor);
}

//在取出的範圍，塗上色塊
function paintBox(x,y,dx,dy,c) {
   fill(c);
   noStroke();
   rect(x, y, dx, dy);
   //print(x,y);
}


//比對顏色，使用陣列的元素比對
function colorEqual(a,b){
   return a[0]==b[0] && a[1]==b[1] && a[2]==b[2] && a[3]==b[3];
}

