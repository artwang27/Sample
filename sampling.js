/*取樣函式
*/


class Font {
    static Width = 5;
    static Height = 7;
    static dx=5;    //點與點的距離，取樣的距離
    static dy=5;   //點與點的距離

    //要比對的顏色
    static MatchColor=[237, 34, 93, 255];    
    static setupMatchColor(c) {
        let c2=color(c);
        this.MatchColor = c2.levels;  //把 color 轉換成 rgba 陣列
    }

    //若是比對符合，那要設為哪一種布林值
    static MatchBool=true;
    static setupMatchBool(b=true){
        this.MatchBool=b;
    }



}//Font


class Letter {
    constructor(startX, startY, dx=Font.dx, dy=Font.dy, fontWidth=Font.Width, fontHeight=Font.Height) {
        this.FontWidth= fontWidth;
        this.FontHeight= fontHeight;
        //this.compareFunction = compareMatchFontColor;  //設定要使用哪一個比較函數？
        this.compareFunction = compareBrightness;  //設定要使用哪一個比較函數？

        this.bits = [];
        this.bits=this.asBools(startX, startY, dx, dy);
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
   //也可以省略此參數，以預設的 compare 函數，做顏色的比對
   asBools(startX, startY, dx, dy) {
      return this.getLetter(startX, startY, dx, dy, this.compareFunction);
   }

   /*
   //比對顏色，若是符合，則傳回當初設定的布林值
   compareMatchFontColor(c){
       return colorEqual(c, Font.MatchColor)? Font.MatchBool: !Font.MatchBool;
   }
   */

   /*
   //判斷顏色若是與 TrueColor 相符，則傳回 true
   compareFontTrueColor(c) {
      return colorEqual(c, Font.TrueColor);
   }

    //判斷顏色若是與 FalseColor 相符，則傳回 false
    compareFontFalseColor(c) {
        return !colorEqual(c, Font.FalseColor);
    }
    */

   //------------------------------------------------------------------
   //從 bitmap 的某一區間，萃取字體，構成 bool 陣列
   getLetter(startX, startY, dx, dy, compareFunction = null) {
       let bits = [];   //array of bools, or array of colors
      let y = startY;
      for (let j = 0; j < this.FontHeight; j++, y += dy) {
         let x = startX;

         for (let i = 0; i < this.FontWidth; i++, x += dx) {
            let result = this.extract(x, y, dx, dy, compareFunction);
            bits.push(result);

         }
      }

      //console.log(bits);
      return bits;
   }

   //預設：傳回偵測到的某一個顏色，此顏色其實是個陣列(裡面有四個元素，分別代表 r,g,b,a)
   //若未定義 compareFunction，則傳回顏色
   //否則依照 compareFunction 所定義，傳回指定的型別
   extract(x, y, dx, dy, compareFunction) {
       //print("x= "+x);
       //print("y= "+y);
      let c = get(x, y);   //萃取顏色
      //print(c);
      
      //paintBox(x, y, dx, dy, c);

      //若 colorAs 有定義，則繼續執行 colorAs 函式，否則直接傳回陣列(裡面有四個元素，分別代表 r,g,b,a)
      if (compareFunction) return compareFunction(c);
      else return c;
   }

    //------------------------------------------------------------------

    //把 bool 陣列轉換為字串陣列
    //當 true 時轉換為 trueChar 字元，
    //當 false 時轉換為 falseChar 字元
    toStringArray(trueChar, falseChar) {
        let strAry = [];
        if (this.bits.length === 0) {
            return "null";
        }

        let idx = 0;
        for (let j = 0; j < this.FontHeight; j++) {
            let str = "";
            for (let i = 0; i < this.FontWidth; i++) {
                str += this.bits[idx++] ? trueChar : falseChar;
            }
            strAry.push(str);
        }

        return strAry;
    }



}//class 



//比對顏色，若是符合，則傳回當初設定的布林值
function compareMatchFontColor(c){
    return colorEqual(c, Font.MatchColor) ? Font.MatchBool : !Font.MatchBool;
}

//比對顏色，若是亮度大於30，則傳回當初設定的布林值
function compareBrightness(c){
    let value = brightness(c);
    return value>30 ? Font.MatchBool : !Font.MatchBool;
}
