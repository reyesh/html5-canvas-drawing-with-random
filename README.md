#Drawing with Random

I'm learning about object oriented javaScript and html5 canvas so I decided to create a class that allows you to draw randomly on a canvas.

Used object oriented JS, functional class pattern with shared methods, also made use of requestAnimationFrame, and recursive functions.

Download all files and open index.html

##Quickly get started

```
var painting_5 = Drawing('q',200,600);
painting_5.initCanvas();
painting_5.canvasColor("yellow");
painting_5.bezierDraw(500,'red', 1);
painting_5.bezierDraw(200,'yellow', 1);

for(var i=0;i<1500;i++){
	painting_5.bezierDraw(10,painting_5.randomColor(), 1);

}
painting_5.frameV2("black",5);

```

The above code creates:

![](http://i.imgur.com/xxJrQtS.png?1)

*note that it's never the same drawing after reloading the page, hense title of the project "drawing with random"*
