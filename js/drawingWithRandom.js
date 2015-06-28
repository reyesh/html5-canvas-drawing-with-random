/*
	 Drawing class for each new canvas painting. You need to provide ID
	 width and height. cicrle_x, cicrle_y, and rs (radius size) are used to created
	 a circle on canvas to move around.
*/
var Drawing = function(id,h,w) {
	var obj = { id: id,
              width: w,
              height: h,
              cicrle_x: 50,
              cicrle_y: 50,
							rs: 40};

  $.extend(obj, Drawing.methods);
	return obj;
};
/*
	Shared methonds for functional Drawing class
*/
Drawing.methods = {
/* for every new Drawing class you will need to initialize first. This will set
	 the id, width and height of the newely formed canvas element on index.
*/
  initCanvas: function() {
    var blankCanvas = '<canvas id="%data_id%" width="%data_w%" height="%data_h%">.</canvas>';
    formattedBlankCanvas = blankCanvas.replace("%data_id%",this.id);
    formattedBlankCanvas = formattedBlankCanvas.replace("%data_w%",this.width);
    formattedBlankCanvas = formattedBlankCanvas.replace("%data_h%",this.height);
    $("#main").append(formattedBlankCanvas);
  },
/*	Set the background color of canvas
*/
  canvasColor: function(color){
    var c = document.querySelector("#"+this.id);
    var ctx = c.getContext("2d");
    ctx.fillStyle = color;
    this.canvasColor=color;
    ctx.fillRect(0,0,this.width,this.height);
  },
/* Set a frame around the canvas, pass in color and the margain size.
	 you can layer several to create a better looking frame.
*/
  frameV2: function(color,fsize){
    var c = document.querySelector("#"+this.id);
    var ctx = c.getContext("2d");
    ctx.fillStyle = color;
    ctx.fillRect(0,0,this.width,fsize);
    ctx.fillRect(0,0,fsize,this.height);
    ctx.fillRect(0,this.height,this.width,-fsize);
    ctx.fillRect(this.width,0,-fsize,this.height);
  },
/*	Random function returns any number between 0 and num
*/
  randomNum: function(num){
    return Math.floor(Math.random()*(num));
  },
/* Since the built in circle function take radian, here's a converter
	 that converts radian to degree.
*/
  r2degrees: function(radians){
    return (radians * (Math.PI/180));
  },
/*	Random function, returns any number betwen min and max
*/
  randomNumBetween: function(min,max){
    return Math.floor(Math.random() * (max - min)) + min;
  },
/*	returns a random color available from the color array.
*/
	randomColor: function(){
		var colors = ["red","orange","yellow","green","blue","indigo","violet","black","white"];
		return colors[this.randomNum(colors.length)];
	},
/* Draws one line random depending on canvas width and height.
	 Takes in size of stroke and color.
*/
  drawLines: function (strkS,color){
    var c = document.querySelector("#"+this.id);
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth=strkS;
    ctx.moveTo(this.randomNum(this.width), this.randomNum(this.height));
    ctx.lineTo(this.randomNum(this.width),this.randomNum(this.height));
    ctx.stroke();
  },
/* Draws one circle, you to specify, fill color, stroke color, line size, mininum size
	 of circle and maxinum size for circle.
*/
  drawCirle: function(fColor,lColor,line,min,max){
    var c = document.querySelector("#"+this.id);
    var ctx = c.getContext("2d");
    var x;
    var y;
    var sa = 0; //start of angle
    var ea = 360; //end of angle, starting at 0, ending at 260 gives you a comple cicrle
    var rs = this.randomNumBetween(min,max);
    ctx.beginPath();
    ctx.strokeStyle=lColor;
    ctx.fillStyle=fColor;
    ctx.lineWidth=line;
    x = this.randomNum(this.width);
    y = this.randomNum(this.height);
    ctx.arc(x,y,rs,this.r2degrees(sa),this.r2degrees(ea));
    ctx.stroke();
    ctx.fill();
  },
/* Draws a bezier line randomly depending on width and height of canvas, unlike the
	 line function method this one bends, and the function of recursive. The first
	 parameter 'l' tells it how many times the function will call it self, the bezier
	 line will be continuous, color is color of line, and ss is the lines thickness.
*/
  bezierDraw: function (l,color,ss){
    var c = document.querySelector("#"+this.id);
    var ctx = c.getContext("2d");

    var x = this.randomNum(this.width);
    var y = this.randomNum(this.height);

    this.bezierDrawRR(l,x,y,color,ss,ctx);

  },
/* this is part of function bezierDraw
*/
  bezierDrawRR: function(l,x,y,color,ss,fctx){
    fctx.strokeStyle=color;
    fctx.lineWidth=ss;
    fctx.beginPath();
    fctx.moveTo(x,y);

    var ex = this.randomNum(this.width);
    var ey = this.randomNum(this.height);

    if(l==0){
      // end
    } else {
      l=l-1;
      fctx.bezierCurveTo(this.randomNum(400), this.randomNum(400), this.randomNum(400), this.randomNum(400), ex, ey);
      fctx.stroke();
      this.bezierDrawRR(l,ex,ey,color,ss,fctx);
    }
  },
/* erase the canvas, used with requestAnimationDraw()
*/
  eraseCanvas: function(){
    var c = document.querySelector("#"+this.id);
    var ctx = c.getContext("2d");
    ctx.fillStyle = this.canvasColor;
		ctx.clearRect(0,0,this.width,this.height);
		ctx.fillRect(0,0,this.width,this.height);
  },
/* draws a circle on canvas this circle x and y coordinates are stored in the obj
	 along with the size of the cirle. This function was entended to be used with
	 requestAnimationDraw to be moved and resize with keyboard keys
*/
  expCircle: function(fColor,lColor,line){
    var c = document.querySelector("#"+this.id);
    var ctx = c.getContext("2d");
    var x = this.cicrle_x;
    var y = this.cicrle_y;
    var sa = 0; //start of angle
    var ea = 360; //end of angle, starting at 0, ending at 260 gives you a comple cicrle
		var rs = this.rs;
    ctx.beginPath();
    ctx.strokeStyle=lColor;
    ctx.fillStyle=fColor;
    ctx.lineWidth=line;
    //x = this.randomNum(this.width);
    //y = this.randomNum(this.height);
    ctx.arc(x,y,rs,this.r2degrees(sa),this.r2degrees(ea));
    ctx.stroke();
    ctx.fill();
  },
/* The following four function are used to moved the circle that was created
	 using expCircle.
*/
  moveCirlePlus: function(){
		this.cicrle_x += 10;
  },
  moveCirleMinus: function(){
    this.cicrle_x -= 10;
  },
	moveCirleYPlus: function(){
		this.cicrle_y += 10;
	},
	moveCirleYMinus: function(){
		this.cicrle_y -= 10;
	},
/* the following functions are used to change the radius of cirlce that was created
	 using expCircle.
*/
	blowCirlePlus: function(){
		this.rs += 10;
	},
	blowCirleMinus: function(){
		this.rs -= 10;
	}


};
/* for painting_1 it's an example of how expCircle works with requestAnimationFrame
*/
var painting_1 = Drawing("c",400,800);
painting_1.initCanvas();
painting_1.canvasColor("yellow");
painting_1.frameV2("black",7);

function draw() {
        requestAnimationFrame(draw);
        painting_1.eraseCanvas();
        //painting_1.bezierDraw(10,"red",5);
        //painting_1.drawCirle("red","red",1,40,80);
        painting_1.expCircle("white","red",10);
        painting_1.frameV2("black",7);
      //  processInput();
}

draw();
var k = new Kibo();
k.down(['right'], function() {
	painting_1.moveCirlePlus();
  console.log('right key pressed');
}).down('left', function() {
	painting_1.moveCirleMinus();
  console.log('left key pressed');
}).down('up', function(){
  painting_1.moveCirleYMinus();
}).down('down', function(){
	painting_1.moveCirleYPlus();
	document.body.style.overflowY = "hidden";
}).up('down', function(){
	document.body.style.overflowY = "scroll";
}).down('d', function(){
	painting_1.blowCirlePlus();
}).down('e', function(){
	painting_1.blowCirleMinus();
});

/* For painting_2, since most function draw once you can used for loops to draw
	 a lot more on the canvas.
*/
var painting_2 = Drawing("d",400,500);
painting_2.initCanvas();
painting_2.canvasColor("yellow");

for(var i=0;i<150;i++){
  painting_2.drawLines(.5,"red");
  painting_2.drawLines(.5,"green");
  painting_2.drawLines(.5,"blue");
}

for(var i=0;i<150;i++){
  painting_2.drawCirle("rgba(255, 255, 255, 0)","black",.5,3,10);
}

painting_2.bezierDraw(7,"black",4);
painting_2.bezierDraw(2,"red",20);

painting_2.frameV2("black", 11);
painting_2.frameV2("grey", 10);
painting_2.frameV2("black", 5);

/* for painting_3 another complex drawing using lines and circles, and a nicer frame
*/

var painting_3 = Drawing("f",400,400);
painting_3.initCanvas();
painting_3.canvasColor("black");

for (var i=0;i<10;i++){

	painting_3.drawCirle("black","",.5,3,5);
	painting_3.drawCirle(painting_3.randomColor(),"",.5,5,10);
	painting_3.drawCirle(painting_3.randomColor(),"",.5,5,10);
	painting_3.drawLines(2,painting_3.randomColor());
	painting_3.drawLines(2,painting_3.randomColor());
	painting_3.drawLines(2,painting_3.randomColor());
	painting_3.drawLines(2,painting_3.randomColor());

}

painting_3.frameV2("black",10);
painting_3.frameV2("grey",9);
painting_3.frameV2("black",5);

/* Example of the bezierDraw function
*/
var painting_5 = Drawing('q',600,600);
painting_5.initCanvas();
painting_5.canvasColor("grey");
painting_5.bezierDraw(200,'red', .4);
painting_5.bezierDraw(200,'yellow', .4);
painting_5.frameV2("black",20);


var c = document.querySelector("#f");
function handleMouseClick(evt) {
        x = evt.clientX - c.offsetLeft;
        y = evt.clientY - c.offsetTop;
        console.log("x,y:"+x+","+y);
}
c.addEventListener("click", handleMouseClick, false);
