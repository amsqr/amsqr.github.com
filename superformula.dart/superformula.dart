/*

 Superformula in Dart
 
 Copyright (C) 2012 Alejandro Mosquera <amsqr2@gmail.com>
 
 Equations from:
 
 http://en.wikipedia.org/wiki/Superformula

 
 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, version 3 of the License.
 
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.
 
 You should have received a copy of the GNU General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.

*/

#library('superformula');

#import('dart:html');



main() {
  new superformula();
}

class superformula {
  
  superformula() {
    
    CanvasElement canvas = document.query("#canvas");
    ctx = canvas.getContext("2d");
    
    drawFrame();
  }
  
  // Draw the complete figure for the current number of seeds.
  void drawFrame() {
    ctx.clearRect(0, 0, MAX_D, MAX_D);
    superShape(1, 1, 5, 23, 23, 23, 100,80, 30);
    superShape(1, 1, 5, 13, 13, 3, 200,80, 30);
    superShape(1, 1, 8, 3, 13, 3, 300,80, 30);
    superShape(10,8, 16, 30, 13, 3, 450,80, 30);
    superShape(1,1, 1, 0.5, 0.5, 0.5, 100,190, 100);
    

    for (var i= 0; i <150; i++){
        superShape(1,1, 2, 1+i/800, 4, 8-i * 0.1, 550,350, 50);
    }
    for (var i = 0; i <20; i++){
        superShape(1.1,1.2, 6, 2 + i , 4, 9 - i, 200,350, 50);
    }
    
  }
  
  
  void superShape(a, b, m, n1, n2, n3, pntx,pnty, scale){
    var r = 0;
    var p  = 0;
    var xp = 0;
    var yp = 0;

    while(p <= TWO_PI){
        var ang = m * p / 4;
        r = Math.pow(Math.pow((Math.cos(ang) / a), n2).abs() + Math.pow((Math.sin(ang) / b).abs(), n3),-1/n1);
            xp = r * Math.cos(p);
            yp = r * Math.sin(p);
      
        p += 0.01;

  putpixel(pntx + xp *scale, pnty + yp * scale,1,1,1);
        
     }
}
  
  // Draw a small circle representing a seed centered at (x,y).
  void putpixel(num x, num y,num r,num g,num b) {
    ctx.beginPath();
    ctx.lineWidth = 0.1;
    ctx.fillStyle = BLACK;
    ctx.strokeStyle = BLACK;
    ctx.arc(x, y, SEED_RADIUS, 0, TWO_PI, false);
    ctx.fill();
    ctx.closePath();
    ctx.stroke();
  }

  CanvasRenderingContext2D ctx;

 
 
  static final TWO_PI = Math.PI * 2;
  static final SEED_RADIUS = 0.5;
  static final MAX_D = 800;
  static final String BLACK = "black";

}

