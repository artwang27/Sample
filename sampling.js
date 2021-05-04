/*取樣函式
*/


class Font {
    static Width = 5;
    static Height = 7;
    static dx;    //點與點的距離，取樣的距離
    static dy;   //點與點的距離

    //static TrueColor;
    //static FalseColor;
    static setupTrueColor(c) {
        Font.TrueColor = c.levels;  //把 color 轉換成 rgba 陣列
    }

    static setupFalseColor(c) {
        Font.FalseColor = c.levels;  //把 color 轉換成 rgba 陣列
    }

}//Font

class Letter {
    constructor(startX, startY, dx, dy) {
        this.bits = [];
        this.asBools(startX, startY, dx, dy, this.compareFontFalseColor)
   }

   //------------------------------------------------------------------
   //從 bitmap 的某一區間，萃取字體，構成 colors 陣列
   asColors(startX, startY, dx, dy) {
      let colors = this.getLetter(startX, startY, dx, dy, null);
      //console.log(colors);
      return colors;
   }


   //------------------------------------------------------------------
   //從 bitmap 的某一區間，萃取字體，構成 bool 陣列，並存入 this.bits 方便未來的處理
   //compareFunction：可在 Letter 類別之外另行撰寫，並以函式指標參數傳入
   //也可以省略此參數，以預設的 compareFontTrueColor 做顏色的比對
   asBools(startX, startY, dx, dy, compareFunction=this.compareFontFalseColor) {
      this.bits = this.getLetter(startX, startY, dx, dy, compareFunction);
   }


   //判斷顏色若是與 TrueColor 相符，則傳回 true
   compareFontTrueColor(c) {
      return colorEqual(c, Font.TrueColor);
   }

    //判斷顏色若是與 FalseColor 相符，則傳回 false
    compareFontFalseColor(c) {
        return !colorEqual(c, Font.FalseColor);
    }

   //------------------------------------------------------------------

   //把 bool 陣列轉換為字串陣列
   //當 true 時轉換為 trueChar，
   //當 false 時轉換為 falseChar
   toStringArray(trueChar, falseChar){
      let strAry=[];
      if(this.bits.length===0){
         return "null";
      }

      let idx=0;
      for (let j = 0; j < Font.Height; j++) {
         let str="";
         for (let i = 0; i < Font.Width; i++) {
            str += this.bits[idx++] ? trueChar : falseChar;
         }
         strAry.push(str);
      }

      return strAry;
   }


   //從 bitmap 的某一區間，萃取字體，構成 bool 陣列
   getLetter(startX, startY, dx, dy, compareFunction = null) {
      let bits = [];   //array of bool
      let y = startY;
      for (let j = 0; j < Font.Height; j++, y += dy) {
         let x = startX;

         for (let i = 0; i < Font.Width; i++, x += dx) {

            let result = this.extract(x, y, dx, dy, compareFunction);
            bits.push(result);

         }
      }

      //console.log(bits);
      return bits;
   }

   //預設：傳回陣列(裡面有四個元素，分別代表 r,g,b,a)
   extract(x, y, dx, dy, compareFunction) {
      let c = get(x, y);   //萃取顏色
      paintBox(x, y, dx, dy, c);

      //若 colorAs 有定義，則繼續執行 colorAs 函式，否則直接傳回陣列(裡面有四個元素，分別代表 r,g,b,a)
      if (compareFunction) return compareFunction(c);
      else return c;
   }



}//class 


//在取出的範圍，塗上色塊
function paintBox(x, y, dx, dy, c) {
   let r=0.8;
   fill(c);
   noStroke();
   rect(x, y, dx*r, dy*r);
}



//比對顏色，使用陣列的元素比對
function colorEqual(a, b) {
   return a[0] == b[0] && a[1] == b[1] && a[2] == b[2] && a[3] == b[3];
}

