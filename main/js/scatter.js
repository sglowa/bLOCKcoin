// function windowResized() {
//   //console.log('resized');
//   resizeCanvas(windowWidth, windowHeight);
// ***REMOVED***

var cubes = [];
var numCubes = 60;
var cnv;
var img;

function setup(){
	cnv = createCanvas(window.screen.width, window.screen.height);
	cnv.position(0, 0);
	// cnv.style('z-index', '-1');
	cnv.parent("canvasParent");
  	img = loadImage("imgs/block_white_mini.png");

  	// initialize cube array
  	for(i=0;i<numCubes;i++){
		c = new cubeObj(random(30,60), i ) // generate a random sized circObj and store it's ID for later
		cubes.push(c); //add it to the array.
	***REMOVED***
***REMOVED***

function draw(){
	background(255);

	for(j=0;j<numCubes;j++){
	cubes[j].place(cubes); //try to place a cubeObj on the screen
	***REMOVED***

	for(k=0;k<numCubes;k++){ // display the objects
		cubes[k].disp();
	***REMOVED***
***REMOVED***

function cubeObj(s, id){
	this.x = random(width);
	this.y = random(height);
// scaled dimensions
	this.w = s*img.width;
	this.h = s*img.height;
	this.id = id;
	this.hit = true;

	this.place = function(objArray){

		for(i=0;i<objArray.length;i++){
			if(this.id != i){ //dont do the check if it is looking at itself
				// collide function, returns bool
				this.hit = collideRectRect(this.x, this.y, this.w, this.h, objArray[i].x, objArray[i].y, this.w, this.h);

				if(this.hit == true){ // if we ever get a true we have to try again, this works since we iterate down through the objects one by one.
					//try again:
					this.x = random(width)
					this.y = random(height)
				***REMOVED***
			***REMOVED***
		***REMOVED***
	***REMOVED***

	this.disp = function(){
		
		if(this.x > width){
		this.x = (-30)
		***REMOVED***else{
		this.x += (this.w/100);
		***REMOVED***;
		image(img,this.x,this.y,this.w,this.h);

	***REMOVED***

***REMOVED***



// // ~~~~~~~~~~~~~~~~~~~template~~~~~~~~~~~~~~~~~~~~~~
// // d size
// function circObj(d, id){
// 	// coordinates
// 	this.x = random(width)
// 	this.y = random(height)
// 	// diameter
// 	this.d = d
// 	// id
// 	this.id = id;
// 	// color
// 	this.color = color(random(255),random(255),random(255));
// 	// detect collision
// 	this.hit = true;

// 	// placing method
// 	this.place = function(objArray){

// 			for(i=0;i<objArray.length;i++){
// 				if(this.id != i){ //dont do the check if it is looking at itself
// 					// collide function, returns bool
// 					this.hit = collideCircleCircle(this.x, this.y, this.d, objArray[i].x, objArray[i].y, objArray[i].d); //colliding with anything?

// 					if(this.hit == true){ // if we ever get a true we have to try again, this works since we iterate down through the objects one by one.
// 						//try again:
// 						this.x = random(width)
// 						this.y = random(height)
// 					***REMOVED***
// 				***REMOVED***
// 			***REMOVED***
// 	***REMOVED***

// 	this.disp = function(){
// 		noStroke();
// 		fill(this.color);
// 		ellipse(this.x,this.y,this.d,this.d);

// 	***REMOVED***

// ***REMOVED***