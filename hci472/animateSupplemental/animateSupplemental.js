(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"animateSupplemental_atlas_1", frames: [[0,0,476,77],[0,147,244,44],[0,79,377,66],[379,79,121,120]]}
];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.gotoAndPlay = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.CachedBmp_3 = function() {
	this.initialize(ss["animateSupplemental_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2 = function() {
	this.initialize(ss["animateSupplemental_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1 = function() {
	this.initialize(ss["animateSupplemental_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap1 = function() {
	this.initialize(ss["animateSupplemental_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.stageOutline = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(4,1,1).p("EgUTgj6MAonAAAQBkAAAABkMAAABEtQAABkhkAAMgonAAAQhkAAAAhkMAAAhEtQAAhkBkAAg");
	this.shape.setTransform(139.95,229.9);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2,-2,283.9,463.8);


(lib.square3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	var sprImg_shape = cjs.SpriteSheetUtils.extractFrame(ss["animateSupplemental_atlas_1"],3);
	sprImg_shape.onload = function(){
		this.shape.graphics.bf(sprImg_shape, null, new cjs.Matrix2D(1,0,0,1,-60.5,-60)).s().p("ApcJYIAAyvIS5AAIAASvg")
	}.bind(this);
	this.shape.setTransform(60.5,60);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,121,120);


(lib.sqaureOne = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#336666").s().p("AnzJYQhkAAAAhkIAAvnQAAhkBkAAIPnAAQBkAAAABkIAAPnQAABkhkAAg");
	this.shape.setTransform(60,60);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,120,120);


(lib.rectangle1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	var sprImg_shape = cjs.SpriteSheetUtils.extractFrame(ss["animateSupplemental_atlas_1"],3);
	sprImg_shape.onload = function(){
		this.shape.graphics.bf(sprImg_shape, null, new cjs.Matrix2D(0.653,0,0,2.769,-39.5,-166.2)).s().p("AmKZ9MAAAgz5IMVAAMAAAAz5g")
	}.bind(this);
	this.shape.setTransform(39.5,166.1);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,79,332.2);


(lib.buttonOne = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// text
	this.instance = new lib.CachedBmp_1();
	this.instance.setTransform(45.8,13.55,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_2();
	this.instance_1.setTransform(78.9,19.05,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_3();
	this.instance_2.setTransform(28,10.75,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},2).to({state:[{t:this.instance_2}]},1).wait(1));

	// button
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#3399FF").s().p("A0TEsQhkAAAAhkIAAmPQAAhkBkAAMAonAAAQBkAAAABkIAAGPQAABkhkAAg");
	this.shape.setTransform(140,30);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#336666").s().p("A0TEsQhkAAAAhkIAAmPQAAhkBkAAMAonAAAQBkAAAABkIAAGPQAABkhkAAg");
	this.shape_1.setTransform(140,30);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#336666").s().p("AxaDIQhVAAAAhCIAAkLQAAhCBVAAMAi1AAAQBVAAAABCIAAELQAABChVAAg");
	this.shape_2.setTransform(140,30);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#3399FF").s().p("A0TGPQhkAAAAiFIAAoTQAAiFBkAAMAonAAAQBkAAAACFIAAITQAACFhkAAg");
	this.shape_3.setTransform(140,30.075);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-9.8,280,79.8);


(lib.squareTwoo = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.squareOne = new lib.sqaureOne("synched",0,false);
	this.squareOne.name = "squareOne";
	this.squareOne.setTransform(60,60,1,1,0,0,0,60,60);

	this.timeline.addTween(cjs.Tween.get(this.squareOne).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,120,120);


// stage content:
(lib.animateSupplemental = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {startSquash:1,startAnticipation:35,startFollowThrough:84};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,34,83,135];
	// timeline functions:
	this.frame_0 = function() {
		var _this = this;
		/*
		Stop a Movie Clip/Video
		Stops the specified movie clip or video.
		*/
		_this.stop();
		var _this = this;
		/*
		Clicking on the specified symbol instance executes a function.
		*/
		_this.startFollowThrough.on('click', function(){
		/*
		Moves the playhead to the specified frame label in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		*/
		_this.gotoAndPlay('startFollowThrough');
		});
		var _this = this;
		/*
		Clicking on the specified symbol instance executes a function.
		*/
		_this.startAnticipation.on('click', function(){
		/*
		Moves the playhead to the specified frame label in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		*/
		_this.gotoAndPlay('startAnticipation');
		});
		var _this = this;
		/*
		Clicking on the specified symbol instance executes a function.
		*/
		_this.StartSquash.on('click', function(){
		/*
		Moves the playhead to the specified frame label in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		*/
		_this.gotoAndPlay('startSquash');
		});
	}
	this.frame_34 = function() {
		var _this = this;
		/*
		Stop a Movie Clip/Video
		Stops the specified movie clip or video.
		*/
		_this.stop();
	}
	this.frame_83 = function() {
		var _this = this;
		/*
		Stop a Movie Clip/Video
		Stops the specified movie clip or video.
		*/
		_this.stop();
	}
	this.frame_135 = function() {
		var _this = this;
		/*
		Stop a Movie Clip/Video
		Stops the specified movie clip or video.
		*/
		_this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(34).call(this.frame_34).wait(49).call(this.frame_83).wait(52).call(this.frame_135).wait(1));

	// buttonThree
	this.startFollowThrough = new lib.buttonOne();
	this.startFollowThrough.name = "startFollowThrough";
	this.startFollowThrough.setTransform(840,610);
	new cjs.ButtonHelper(this.startFollowThrough, 0, 1, 2, false, new lib.buttonOne(), 3);

	this.timeline.addTween(cjs.Tween.get(this.startFollowThrough).wait(136));

	// buttonTwo
	this.startAnticipation = new lib.buttonOne();
	this.startAnticipation.name = "startAnticipation";
	this.startAnticipation.setTransform(468,610);
	new cjs.ButtonHelper(this.startAnticipation, 0, 1, 2, false, new lib.buttonOne(), 3);

	this.timeline.addTween(cjs.Tween.get(this.startAnticipation).wait(136));

	// buttonOne
	this.StartSquash = new lib.buttonOne();
	this.StartSquash.name = "StartSquash";
	this.StartSquash.setTransform(232,640,1,1,0,0,0,140,30);
	new cjs.ButtonHelper(this.StartSquash, 0, 1, 2, false, new lib.buttonOne(), 3);

	this.timeline.addTween(cjs.Tween.get(this.StartSquash).wait(136));

	// mask_idn (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_1 = new cjs.Graphics().p("EAmIAj8QhkAAAAhkMAAAhEvQAAhkBkAAMAooAAAQBkAAAABkMAAABEvQAABkhkAAgEgT/Aj8QhkAAAAhkMAAAhEvQAAhkBkAAMAonAAAQBkAAAABkMAAABEvQAABkhkAAgEhOvAj8QhkAAAAhkMAAAhEvQAAhkBkAAMAooAAAQBkAAAABkMAAABEvQAABkhkAAg");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:null,x:0,y:0}).wait(1).to({graphics:mask_graphics_1,x:606,y:360}).wait(135));

	// followThru
	this.instance = new lib.square3("synched",0);
	this.instance.setTransform(600.5,528,1,1,0,0,0,60.5,60);
	this.instance._off = true;

	this.instance_1 = new lib.rectangle1("synched",0);
	this.instance_1.setTransform(600,570.05,1,1,0,0,0,40,312.1);
	this.instance_1._off = true;

	var maskedShapeInstanceList = [this.instance,this.instance_1];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(84).to({_off:false},0).to({_off:true,regX:40,regY:312.1,x:600,y:570.05},5,cjs.Ease.quadOut).wait(47));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(84).to({_off:false},5,cjs.Ease.quadOut).to({regX:40.1,scaleY:1.0021,skewX:3.6669,x:600.1},1).to({scaleY:1.0041,skewX:-5.1824},1).to({scaleY:1.0762,skewX:-21.688,x:1079.1},16,cjs.Ease.sineInOut).to({scaleY:1.0024,skewX:3.9411},2,cjs.Ease.quadOut).to({scaleY:1.0134,skewX:9.3358,x:877.15},6,cjs.Ease.quadInOut).to({scaleY:1.0001,skewX:-0.7064,x:877.2},4,cjs.Ease.quadOut).to({scaleY:1.0248,skewX:-12.6166,x:1085.25},4,cjs.Ease.quadInOut).to({scaleY:1.0001,skewX:-0.6233},5,cjs.Ease.quadOut).to({scaleY:1.0034,skewX:4.6913,x:973.3},2,cjs.Ease.quadInOut).to({regX:40.2,scaleY:1.0003,skewX:-1.4029,x:973.45},2).to({scaleY:1.0005,skewX:1.9008},1).wait(1).to({regX:40.3,scaleY:1,skewX:-0.1364,x:973.6},0).wait(2));

	// anticipation
	this.instance_2 = new lib.squareTwoo("synched",0);
	this.instance_2.setTransform(230,528,1,1,0,0,0,60,60);
	this.instance_2._off = true;

	var maskedShapeInstanceList = [this.instance_2];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(35).to({_off:false},0).wait(1).to({scaleY:1.0111,skewX:3.9609,y:528.4},0).wait(1).to({scaleY:1.0229,skewX:8.2046,y:528.9},0).wait(1).to({scaleY:1.0355,skewX:12.7389,y:529.4},0).wait(1).to({regX:60.1,scaleY:1.049,skewX:17.5712,x:230.1,y:530},0).wait(1).to({regX:60,scaleY:1.0536,skewX:9.4735,x:229.95,y:529.55},0).wait(1).to({scaleY:1.0588,skewX:0.3876,y:529.05},0).wait(1).to({scaleY:1.0645,skewX:-9.7416,y:528.55},0).wait(1).to({scaleY:1.071,skewX:-20.9734,x:230.05,y:528},0).wait(1).to({scaleY:1.0845,skewX:-22.342,x:274.7,y:528.25},0).wait(1).to({scaleY:1.1,skewX:-23.9043,x:325.65,y:528.5},0).wait(1).to({scaleY:1.1175,skewX:-25.671,x:383.3,y:528.8},0).wait(1).to({scaleY:1.1371,skewX:-27.6533,x:447.95,y:529.15},0).wait(1).to({scaleY:1.159,skewX:-29.8632,x:520.1,y:529.55},0).wait(1).to({regX:60.1,scaleY:1.1833,skewX:-32.3137,x:600.05,y:530},0).to({scaleY:1.0058,skewX:6.1823},2,cjs.Ease.sineOut).to({scaleY:1.0001,skewX:0.4765},2).wait(6).to({skewX:0.4765},0).to({scaleX:1.4971,scaleY:0.5,skewX:0.4756,x:600.1,y:560},3,cjs.Ease.quadInOut).to({scaleX:0.658,scaleY:1.0001,x:600.05,y:530},2,cjs.Ease.quadIn).to({scaleX:1,scaleY:1,skewX:15.4755,skewY:14.9992,y:230.05},4,cjs.Ease.quadOut).to({regX:60.2,scaleY:0.5891,skewX:45.4743,skewY:44.9988,y:250.05},2).to({scaleY:0.5892,skewX:90.4734,skewY:89.9983,x:600,y:529.95},3).to({scaleX:0.5079,scaleY:1.1675,skewX:90.4733,x:599.95,y:558.95},2,cjs.Ease.sineInOut).to({regX:60.1,scaleX:1,scaleY:1.0001,skewX:90.4765,skewY:90,x:600,y:530.05},2).to({skewX:0.4765,skewY:0,x:600.05,y:522},1).to({skewX:0.4765,y:528},2).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).to({_off:true},2).wait(52));

	// squashStretch
	this.squareOne = new lib.sqaureOne("synched",0,false);
	this.squareOne.name = "squareOne";
	this.squareOne.setTransform(230.05,20.05,0.8333,1.3333,0,0,0,60,60);
	this.squareOne._off = true;

	var maskedShapeInstanceList = [this.squareOne];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.squareOne).wait(1).to({_off:false},0).to({scaleX:1,scaleY:1,x:230,y:530},9,cjs.Ease.quadIn).to({regX:60.1,regY:60.1,scaleX:1.5012,scaleY:0.4991,x:230.05,y:560.05},3,cjs.Ease.quadInOut).to({regX:60,regY:60,scaleX:1,scaleY:1,x:230,y:530},2,cjs.Ease.sineIn).wait(1).to({regY:60.1,scaleX:0.8333,scaleY:1.1667,y:520.05},0).to({regX:60.1,scaleX:1,scaleY:1.0001,rotation:29.9984,x:230.15,y:300.05},3,cjs.Ease.quadOut).to({regX:60.3,scaleX:1.0408,scaleY:0.5656,rotation:89.9985,x:231.95,y:460},4,cjs.Ease.sineIn).to({regX:60,regY:60,scaleX:1,scaleY:1,rotation:90,x:230,y:530},2).to({regX:60.1,regY:60.1,scaleX:1.3333,scaleY:0.6667,rotation:0,x:230.2,y:549.05},1).wait(1).to({regX:60,regY:60,scaleX:1,scaleY:1,x:230,y:530},0).wait(1).to({y:524},0).wait(1).to({y:528},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).to({_off:true},4).wait(101));

	// stages
	this.instance_3 = new lib.stageOutline("synched",0);
	this.instance_3.setTransform(979.7,360,1,1,0,0,0,140,229.9);

	this.instance_4 = new lib.stageOutline("synched",0);
	this.instance_4.setTransform(607.85,360,1,1,0,0,0,140,229.9);

	this.instance_5 = new lib.stageOutline("synched",0);
	this.instance_5.setTransform(232,360,1,1,0,0,0,140,229.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_5},{t:this.instance_4},{t:this.instance_3}]}).wait(136));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(730,488.1,391.5999999999999,191.89999999999998);
// library properties:
lib.properties = {
	id: '6A026454BAFE7B449924C0E7198C7B07',
	width: 1280,
	height: 720,
	fps: 30,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/animateSupplemental_atlas_1.png", id:"animateSupplemental_atlas_1"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['6A026454BAFE7B449924C0E7198C7B07'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused || stageChild.ignorePause){
			stageChild.syncStreamSounds();
		}
	}
}
an.handleFilterCache = function(event) {
	if(!event.paused){
		var target = event.target;
		if(target){
			if(target.filterCacheList){
				for(var index = 0; index < target.filterCacheList.length ; index++){
					var cacheInst = target.filterCacheList[index];
					if((cacheInst.startFrame <= target.currentFrame) && (target.currentFrame <= cacheInst.endFrame)){
						cacheInst.instance.cache(cacheInst.x, cacheInst.y, cacheInst.w, cacheInst.h);
					}
				}
			}
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;