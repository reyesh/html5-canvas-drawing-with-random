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

Drawing.methods = {
  initCanvas: function() {
    var blankCanvas = '<canvas id="%data_id%" width="%data_w%" height="%data_h%">.</canvas>';
    formattedBlankCanvas = blankCanvas.replace("%data_id%",this.id);
    formattedBlankCanvas = formattedBlankCanvas.replace("%data_w%",this.width);
    formattedBlankCanvas = formattedBlankCanvas.replace("%data_h%",this.height);
    $("#main").append(formattedBlankCanvas);
  },
  canvasColor: function(color){
    var c = document.querySelector("#"+this.id);
    var ctx = c.getContext("2d");
    ctx.fillStyle = color;
    this.canvasColor=color;
    ctx.fillRect(0,0,this.width,this.height);
  },
  frameV2: function(color,fsize){
    var c = document.querySelector("#"+this.id);
    var ctx = c.getContext("2d");
    ctx.fillStyle = color;
    ctx.fillRect(0,0,this.width,fsize);
    ctx.fillRect(0,0,fsize,this.height);
    ctx.fillRect(0,this.height,this.width,-fsize);
    ctx.fillRect(this.width,0,-fsize,this.height);
  },
  randomNum: function(num){
    return Math.floor(Math.random()*(num));
  },
  r2degrees: function(radians){
    return (radians * (Math.PI/180));
  },
  randomNumBetween: function(min,max){
    return Math.floor(Math.random() * (max - min)) + min;
  },
	randomColor: function(){
		var colors = ["red","orange","yellow","green","blue","indigo","violet","black","white"];
		return colors[this.randomNum(colors.length)];
	},
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
  bezierDraw: function (l,color,ss){
    var c = document.querySelector("#"+this.id);
    var ctx = c.getContext("2d");

    var x = this.randomNum(this.width);
    var y = this.randomNum(this.height);

    this.bezierDrawRR(l,x,y,color,ss,ctx);

  },
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
  eraseCanvas: function(){
    var c = document.querySelector("#"+this.id);
    var ctx = c.getContext("2d");
    ctx.fillStyle = this.canvasColor;
		ctx.clearRect(0,0,this.width,this.height);
		ctx.fillRect(0,0,this.width,this.height);
  },
  expCircle: function(fColor,lColor,line,min,max){
    var c = document.querySelector("#"+this.id);
    var ctx = c.getContext("2d");
    var x = this.cicrle_x;
    var y = this.cicrle_y;
    var sa = 0; //start of angle
    var ea = 360; //end of angle, starting at 0, ending at 260 gives you a comple cicrle
    var rs = this.randomNumBetween(min,max);
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
	expLine(){
		var c = document.querySelector("#"+this.id);
		var ctx = c.getContext("2d");
		var i = 10;
		var x = 100;
		var y = 100;
		var x2 = x+10;
		var y2 = y;
	  ctx.rotate(this.r2degrees(this.randomNum(360)));

		ctx.beginPath();
		ctx.strokeStyle = "black";
		ctx.moveTo(x,y);
		ctx.lineTo(x2,y2);
		ctx.stroke();

	},
	expLineRR(i){

	},
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
	blowCirlePlus: function(){
		this.rs += 10;
	},
	blowCirleMinus: function(){
		this.rs -= 10;
	}


};

var painting_1 = Drawing("c",400,800);
painting_1.initCanvas();
painting_1.canvasColor("yellow");
painting_1.bezierDraw(10,"red",5);
painting_1.drawCirle("red","red",1,20,50);
painting_1.frameV2("black",7);
var k = new Kibo();

function draw() {
        requestAnimationFrame(draw);
        painting_1.eraseCanvas();
        //painting_1.bezierDraw(10,"red",5);
        //painting_1.drawCirle("red","red",1,40,80);
        painting_1.expCircle("red","red",1,40,41);
        painting_1.frameV2("black",7);
      //  processInput();
}

draw();
console.log(painting_1);


//function processInput() {
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

	$( "#c" ).keydown(function() {
		painting_1.moveCirleXPlus
		});

//}

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

var painting_4 = Drawing("g",200,200);
painting_4.initCanvas();
painting_4.canvasColor("yellow");
painting_4.expLine();

var c = document.querySelector("#f");

function handleMouseClick(evt) {
        x = evt.clientX - c.offsetLeft;
        y = evt.clientY - c.offsetTop;
        console.log("x,y:"+x+","+y);
}
c.addEventListener("click", handleMouseClick, false);

console.log(painting_3.randomColor());
