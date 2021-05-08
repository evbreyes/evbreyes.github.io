(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"elmarAnimation_interactive_atlas_1", frames: [[802,494,397,66],[0,415,399,77],[401,415,399,77],[0,0,401,81],[403,0,401,81],[806,0,401,81],[1209,0,401,81],[1612,0,401,81],[802,415,399,77],[0,83,401,81],[403,83,401,81],[806,83,401,81],[1209,83,401,81],[1612,83,401,81],[1203,415,399,77],[0,166,401,81],[403,166,401,81],[806,166,401,81],[1209,166,401,81],[1612,166,401,81],[1604,415,399,77],[0,249,401,81],[403,249,401,81],[806,249,401,81],[1209,249,401,81],[1612,249,401,81],[0,494,399,77],[0,332,401,81],[403,332,401,81],[806,332,401,81],[1209,332,401,81],[1612,332,401,81],[401,494,399,77],[1201,494,275,60],[1478,494,275,60],[1755,494,275,60]]},
		{name:"elmarAnimation_interactive_atlas_2", frames: [[936,0,466,688],[0,0,466,693],[468,0,466,693],[403,781,393,84],[1209,860,393,84],[1604,860,393,84],[798,862,393,84],[1404,0,401,84],[0,1469,401,81],[0,867,393,84],[395,867,393,84],[1193,946,393,84],[1588,946,393,84],[1404,86,401,84],[403,1469,401,81],[806,1548,401,81],[1209,1548,401,81],[790,948,393,84],[0,953,393,84],[1404,172,401,84],[1612,1548,401,81],[0,1552,401,81],[403,1552,401,81],[395,953,393,84],[1185,1032,393,84],[1580,1032,393,84],[790,1034,393,84],[1404,258,401,84],[806,1631,401,81],[1209,1631,401,81],[1612,1631,401,81],[0,1039,393,84],[395,1039,393,84],[1404,344,401,84],[0,1635,401,81],[403,1635,401,81],[806,1714,401,81],[1185,1118,393,84],[1580,1118,393,84],[790,1120,393,84],[0,1125,393,84],[1404,430,401,84],[1209,1714,401,81],[1612,1714,401,81],[0,1718,401,81],[395,1125,393,84],[1185,1204,393,84],[1404,516,401,84],[403,1718,401,81],[806,1797,401,81],[1209,1797,401,81],[1580,1204,393,84],[790,1206,393,84],[0,1211,393,84],[1404,602,401,84],[1612,1797,401,81],[0,1801,401,81],[403,1801,401,81],[395,1211,393,84],[1185,1290,393,84],[1404,688,401,84],[806,1880,401,81],[1209,1880,401,81],[1612,1880,401,81],[0,1884,401,81],[403,1884,401,81],[1580,1290,393,84],[790,1292,393,84],[936,690,401,84],[806,1963,401,81],[1209,1963,401,81],[1612,1963,401,81],[0,1967,401,81],[403,1967,401,81],[0,1297,393,84],[395,1297,393,84],[0,695,401,84],[1185,1376,393,84],[1580,1376,393,84],[403,695,401,84],[790,1378,393,84],[0,1383,393,84],[1339,774,401,84],[395,1383,393,84],[1185,1462,393,84],[806,776,401,84],[1580,1462,393,84],[0,781,401,84]]},
		{name:"elmarAnimation_interactive_atlas_3", frames: [[935,722,466,693],[1403,702,466,693],[1282,0,466,700],[0,722,465,705],[467,722,466,699],[0,0,1280,720]]}
];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.currentSoundStreamInMovieclip;
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		var pos = this.timeline.resolve(positionOrLabel);
		if (pos != null) { this.startStreamSoundsForTargetedFrame(pos); }
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		this.soundStreamDuration.forEach(function(value,key){
			key.instance.stop();
		});
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var _this = this;
			this.soundStreamDuration.forEach(function(value,key,arr){
				if((value.end) == currentFrame){
					key.instance.stop();
					if(_this.currentSoundStreamInMovieclip == key) { _this.currentSoundStreamInMovieclip = undefined; }
					arr.delete(key);
				}
			});
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			var _this = this;
			if(this.soundStreamDuration.size > 0){
				var maxDuration = 0;
				this.soundStreamDuration.forEach(function(value,key){
					if(value.end > maxDuration){
						maxDuration = value.end;
						_this.currentSoundStreamInMovieclip = key;
					}
				});
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if((deltaFrame >= 0) && this.ignorePause){
					cjs.MovieClip.prototype.play.call(this);
					this.ignorePause = false;
				}
				else if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
				else if(deltaFrame <= -2){
					cjs.MovieClip.prototype.stop.call(this);
					this.ignorePause = true;
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.CachedBmp_128 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_3"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_127 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_126 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_3"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_125 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_124 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_3"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_123 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_3"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_122 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_3"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_121 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_120 = function() {
	this.initialize(img.CachedBmp_120);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2309,777);


(lib.CachedBmp_119 = function() {
	this.initialize(img.CachedBmp_119);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2412,394);


(lib.CachedBmp_118 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_117 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_116 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_115 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_114 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_113 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_112 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_111 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_110 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_109 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_108 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_107 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_106 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_105 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_104 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_103 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_102 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_101 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_100 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(20);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_99 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(21);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_98 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(22);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_97 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(23);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_96 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(24);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_95 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(25);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_94 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(26);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_93 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(27);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_92 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(28);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_91 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(29);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_90 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(30);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_89 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(31);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_88 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(32);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_87 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(33);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_86 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(34);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_85 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(35);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_84 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(36);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_83 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(37);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_82 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(38);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_81 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(39);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_80 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(40);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_79 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(41);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_78 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(42);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_77 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(43);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_76 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(44);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_75 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(45);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_74 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(46);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_73 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(47);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_72 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(48);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_71 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(49);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_70 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(50);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_69 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(51);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_68 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(52);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_67 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(53);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_66 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(54);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_65 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(55);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_64 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(56);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_63 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(57);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_62 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(58);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_61 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(59);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_60 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(60);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_59 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(61);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_58 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(62);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_57 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(63);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_56 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(64);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_55 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(65);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_54 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_53 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(66);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_52 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(67);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_51 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(68);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_50 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(69);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_49 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(70);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_48 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(71);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_47 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(72);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_46 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(73);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_45 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_44 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(74);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_43 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(75);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_42 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(76);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_41 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_40 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_39 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_38 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_1"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_37 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_1"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_36 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_1"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_35 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(77);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_34 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(78);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_33 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(79);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_32 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_1"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_31 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_1"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_30 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_1"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_29 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_1"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_28 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_1"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_27 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_1"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_26 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(80);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_25 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(81);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_24 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(82);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_23 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_1"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_22 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_1"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_21 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_1"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_20 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_1"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_19 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_1"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_18 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_1"]);
	this.gotoAndStop(20);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_17 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(83);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_16 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(84);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_15 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(85);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_14 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_1"]);
	this.gotoAndStop(21);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_13 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_1"]);
	this.gotoAndStop(22);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_12 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_1"]);
	this.gotoAndStop(23);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_11 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_1"]);
	this.gotoAndStop(24);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_10 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_1"]);
	this.gotoAndStop(25);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_9 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_1"]);
	this.gotoAndStop(26);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_8 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(86);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_7 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_2"]);
	this.gotoAndStop(87);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_6 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_1"]);
	this.gotoAndStop(27);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_5 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_1"]);
	this.gotoAndStop(28);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_4 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_1"]);
	this.gotoAndStop(29);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_3 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_1"]);
	this.gotoAndStop(30);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_1"]);
	this.gotoAndStop(31);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1 = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_1"]);
	this.gotoAndStop(32);
}).prototype = p = new cjs.Sprite();



(lib.Chrome = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_3"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.HoverButton = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_1"]);
	this.gotoAndStop(33);
}).prototype = p = new cjs.Sprite();



(lib.PressedButton = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_1"]);
	this.gotoAndStop(34);
}).prototype = p = new cjs.Sprite();



(lib.RestButton = function() {
	this.initialize(ss["elmarAnimation_interactive_atlas_1"]);
	this.gotoAndStop(35);
}).prototype = p = new cjs.Sprite();



(lib.WarpedAsset_2 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#006666").s().p("AclGpQg+gPgrgcIBBiEQAcAUAqANQAqANAnAAQA6AAAbgZQAbgZAAgwIAAgIQgsAyhWAAQg8AAg0gdQgygbgfgxIgCgDIgFgJQgagxAAg+QAAgqANgmQAHgTALgTQAfgzA0gcQA0gcA8AAQBgAAArA+IAAg1IC5AAIAAF4QABCGhLBDQhKBEiKAAQhGgBg9gPgAd7gpQgWAUAAAhQAAAiAXAVQAYAVAiAAQAiAAAXgVQAWgVABgiQgBghgWgUQgXgVgiAAQgjAAgYAVgAmOGtQgogMgXgTIBBiFQAOALATAHQASAHASAAQAfAAAQgTIjFnbIDIAAIBgD6IBjj6IC4AAIjBHeQglBcg3AmQg3AlhQAAQgngBgpgLgEA5SAEFQg6gNglgVIA1iAQAXAOAdAKIAaAHIAXAFQAhAGAfAAQAhAAAOgGIABAAQAKgFACgHIAAgEQAAgLgRgFQgRgEgmgEQg5gHgpgKQgngMgggeQgegfAAg5IABgQQAEgkAXgdQAbglA2gVQA3gWBNAAQA1AAAzAKQAzAKAkASIg1CBQgYgNgZgJQgpgNguABQgwgBgMANQgEAFABAFQAAALARAFQARAFAlADQA6AIAoALQAnALAgAeQAdAfABA6IgBAIIgBAMQgFAggVAcQgbAjg3AWQg3AVhOAAQg9AAg6gMgEAx2ADiQglgigLg5IgCgMQgDgTAAgVIAAh3IhAAAIAAiOIBAAAIAAiEIDCAAIAACEIBgAAIAACOIhgAAIAAB1QAAAWAMAMQAEAFAGADQAIADALABQAOgBAMgDQAJgEAIgFIAvCHQgsAYhLAAQhjAAg2gvgAvsD+QgngTgVgiQgSgdgCglIAAgIIAAgEQAChDA0gjQA1giBsgBIBOAAQgIgvg8gHIgUgBIgUABQgWADgWAGQgiAKgXARIg+iAQApgZA5gNQA6gPA4AAQB8AABCA3QAnAiAPA4QALAkgBAsIAAD9Ii0AAIAAg9QgiBFhjAAQg4AAgngTgAuBB3IAAAEQABAGACAGQADAGAGAFQANAKAVAAQAVAAAQgLQAHgEAFgGQAEgGAEgGIAFgLIAAggIgxAAQg7AAAAAngA6AD0Qg0gegfg3QgGgMgFgMIgEgMQgQgrABgzQgBg0ARgtQAGgPAIgPQAfg4A0gdQA0geA+AAQBOAAApApIAAjIIDCAAIAAJ9Ii5AAIAAgnQgqAwhWgBQg+AAg0gdgA4XglQgWAXABArQgBAsAWAZQAVAYAgABIAFAAQAfgBAVgYQAWgZAAgsQAAgrgWgXQgVgZgiAAQghAAgWAZgEgvHADzQg+gggjg4IgMgUIgFgMQgTgrABgzQAAg0AUgtQAGgOAJgOQAjg3A+gfQA/gfBOAAQBPAAA/AfQA+AfAjA3QAIAOAGAOQAVAtgBA0QAAAzgRArIgGAMIgLAUQgjA4g+AgQg/AehPAAQhOAAg/gegEgtxgAlQgVAXAAArQAAAsAVAZQAUAYAhABIAEAAQAggBAVgYQAVgZABgsQgBgrgVgXQgWgZghAAQgiAAgVAZgEAq7AEJIAAjrQAAhQg6AAQggAAgVAYQgUAWAAAwIAADdIjCAAIAAp9IDCAAIAADNQA3guBOAAQBXAAA0A0QAjAjAMA6QAGAeAAAkIAAELgAVHEJIAAnVIDBAAIAAHVgAPqEJIjlkQIAAEQIjGAAIAApZICnAAIDlESIAAkSIDFAAIAAJZgEghNAEJIAAjrQAAhQg5AAQggAAgVAYQgVAWABAwIAADdIjDAAIAAnVIC6AAIAAAuQAbgbAkgOQAkgOArAAQBWAAA1A0QAjAjALA6QAHAeAAAkIAAELgEg2hAEJIgCkRIiDDbIhZAAIiCjTIAAEJIi6AAIAApZICnAAIDEFBIC/lBICnAAIABJZgAVTkOQghgbAAgsQAAgrAhgcQAggbA0gBQA2AAAgAbQAgAagBArQABAsggAdQggAdg2AAQg0AAgggcg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-402.7,-44,805.5,88.1);


(lib.Scene_1_stars = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// stars
	this.instance = new lib.CachedBmp_120();
	this.instance.setTransform(95.65,43.2,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(300));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_Sky = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Sky
	this.shape = new cjs.Shape();
	this.shape.graphics.lf(["#1D0F2D","#4A0275"],[0,1],-0.1,250,-0.1,-470).s().p("Ehj/A4QMAAAhwfMDH/AAAMAAABwfg");
	this.shape.setTransform(640.05,360);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(300));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_shimmer = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// shimmer
	this.instance = new lib.CachedBmp_1();
	this.instance.setTransform(857.25,550.65,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_2();
	this.instance_1.setTransform(857.25,550.65,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_3();
	this.instance_2.setTransform(855.25,550.65,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_4();
	this.instance_3.setTransform(855.25,551.65,0.5,0.5);

	this.instance_4 = new lib.CachedBmp_5();
	this.instance_4.setTransform(856.25,551.65,0.5,0.5);

	this.instance_5 = new lib.CachedBmp_6();
	this.instance_5.setTransform(856.25,550.65,0.5,0.5);

	this.instance_6 = new lib.CachedBmp_7();
	this.instance_6.setTransform(856.25,549.65,0.5,0.5);

	this.instance_7 = new lib.CachedBmp_8();
	this.instance_7.setTransform(858.25,549.65,0.5,0.5);

	this.instance_8 = new lib.CachedBmp_9();
	this.instance_8.setTransform(857.25,550.65,0.5,0.5);

	this.instance_9 = new lib.CachedBmp_10();
	this.instance_9.setTransform(857.25,550.65,0.5,0.5);

	this.instance_10 = new lib.CachedBmp_11();
	this.instance_10.setTransform(855.25,550.65,0.5,0.5);

	this.instance_11 = new lib.CachedBmp_12();
	this.instance_11.setTransform(855.25,551.65,0.5,0.5);

	this.instance_12 = new lib.CachedBmp_13();
	this.instance_12.setTransform(856.25,551.65,0.5,0.5);

	this.instance_13 = new lib.CachedBmp_14();
	this.instance_13.setTransform(856.25,550.65,0.5,0.5);

	this.instance_14 = new lib.CachedBmp_15();
	this.instance_14.setTransform(856.25,549.65,0.5,0.5);

	this.instance_15 = new lib.CachedBmp_16();
	this.instance_15.setTransform(858.25,549.65,0.5,0.5);

	this.instance_16 = new lib.CachedBmp_17();
	this.instance_16.setTransform(858.25,549.65,0.5,0.5);

	this.instance_17 = new lib.CachedBmp_18();
	this.instance_17.setTransform(857.25,550.65,0.5,0.5);

	this.instance_18 = new lib.CachedBmp_19();
	this.instance_18.setTransform(857.25,550.65,0.5,0.5);

	this.instance_19 = new lib.CachedBmp_20();
	this.instance_19.setTransform(855.25,550.65,0.5,0.5);

	this.instance_20 = new lib.CachedBmp_21();
	this.instance_20.setTransform(855.25,551.65,0.5,0.5);

	this.instance_21 = new lib.CachedBmp_22();
	this.instance_21.setTransform(856.25,551.65,0.5,0.5);

	this.instance_22 = new lib.CachedBmp_23();
	this.instance_22.setTransform(856.25,550.65,0.5,0.5);

	this.instance_23 = new lib.CachedBmp_24();
	this.instance_23.setTransform(856.25,549.65,0.5,0.5);

	this.instance_24 = new lib.CachedBmp_25();
	this.instance_24.setTransform(858.25,549.65,0.5,0.5);

	this.instance_25 = new lib.CachedBmp_26();
	this.instance_25.setTransform(858.25,549.65,0.5,0.5);

	this.instance_26 = new lib.CachedBmp_27();
	this.instance_26.setTransform(857.25,550.65,0.5,0.5);

	this.instance_27 = new lib.CachedBmp_28();
	this.instance_27.setTransform(857.25,550.65,0.5,0.5);

	this.instance_28 = new lib.CachedBmp_29();
	this.instance_28.setTransform(855.25,550.65,0.5,0.5);

	this.instance_29 = new lib.CachedBmp_30();
	this.instance_29.setTransform(855.25,551.65,0.5,0.5);

	this.instance_30 = new lib.CachedBmp_31();
	this.instance_30.setTransform(856.25,551.65,0.5,0.5);

	this.instance_31 = new lib.CachedBmp_32();
	this.instance_31.setTransform(856.25,550.65,0.5,0.5);

	this.instance_32 = new lib.CachedBmp_33();
	this.instance_32.setTransform(856.25,549.65,0.5,0.5);

	this.instance_33 = new lib.CachedBmp_34();
	this.instance_33.setTransform(858.25,549.65,0.5,0.5);

	this.instance_34 = new lib.CachedBmp_35();
	this.instance_34.setTransform(858.25,549.65,0.5,0.5);

	this.instance_35 = new lib.CachedBmp_36();
	this.instance_35.setTransform(857.25,550.65,0.5,0.5);

	this.instance_36 = new lib.CachedBmp_37();
	this.instance_36.setTransform(857.25,550.65,0.5,0.5);

	this.instance_37 = new lib.CachedBmp_38();
	this.instance_37.setTransform(855.25,550.65,0.5,0.5);

	this.instance_38 = new lib.CachedBmp_39();
	this.instance_38.setTransform(855.25,551.65,0.5,0.5);

	this.instance_39 = new lib.CachedBmp_40();
	this.instance_39.setTransform(856.25,551.65,0.5,0.5);

	this.instance_40 = new lib.CachedBmp_41();
	this.instance_40.setTransform(856.25,550.65,0.5,0.5);

	this.instance_41 = new lib.CachedBmp_42();
	this.instance_41.setTransform(856.25,549.65,0.5,0.5);

	this.instance_42 = new lib.CachedBmp_43();
	this.instance_42.setTransform(858.25,549.65,0.5,0.5);

	this.instance_43 = new lib.CachedBmp_44();
	this.instance_43.setTransform(858.25,549.65,0.5,0.5);

	this.instance_44 = new lib.CachedBmp_45();
	this.instance_44.setTransform(857.25,550.65,0.5,0.5);

	this.instance_45 = new lib.CachedBmp_46();
	this.instance_45.setTransform(857.25,550.65,0.5,0.5);

	this.instance_46 = new lib.CachedBmp_47();
	this.instance_46.setTransform(855.25,550.65,0.5,0.5);

	this.instance_47 = new lib.CachedBmp_48();
	this.instance_47.setTransform(855.25,551.65,0.5,0.5);

	this.instance_48 = new lib.CachedBmp_49();
	this.instance_48.setTransform(856.25,551.65,0.5,0.5);

	this.instance_49 = new lib.CachedBmp_50();
	this.instance_49.setTransform(856.25,550.65,0.5,0.5);

	this.instance_50 = new lib.CachedBmp_51();
	this.instance_50.setTransform(856.25,549.65,0.5,0.5);

	this.instance_51 = new lib.CachedBmp_52();
	this.instance_51.setTransform(858.25,549.65,0.5,0.5);

	this.instance_52 = new lib.CachedBmp_53();
	this.instance_52.setTransform(858.25,549.65,0.5,0.5);

	this.instance_53 = new lib.CachedBmp_54();
	this.instance_53.setTransform(857.25,550.65,0.5,0.5);

	this.instance_54 = new lib.CachedBmp_55();
	this.instance_54.setTransform(857.25,550.65,0.5,0.5);

	this.instance_55 = new lib.CachedBmp_56();
	this.instance_55.setTransform(855.25,550.65,0.5,0.5);

	this.instance_56 = new lib.CachedBmp_57();
	this.instance_56.setTransform(855.25,551.65,0.5,0.5);

	this.instance_57 = new lib.CachedBmp_58();
	this.instance_57.setTransform(856.25,551.65,0.5,0.5);

	this.instance_58 = new lib.CachedBmp_59();
	this.instance_58.setTransform(856.25,550.65,0.5,0.5);

	this.instance_59 = new lib.CachedBmp_60();
	this.instance_59.setTransform(856.25,549.65,0.5,0.5);

	this.instance_60 = new lib.CachedBmp_61();
	this.instance_60.setTransform(858.25,549.65,0.5,0.5);

	this.instance_61 = new lib.CachedBmp_62();
	this.instance_61.setTransform(858.25,549.65,0.5,0.5);

	this.instance_62 = new lib.CachedBmp_63();
	this.instance_62.setTransform(855.25,551.65,0.5,0.5);

	this.instance_63 = new lib.CachedBmp_64();
	this.instance_63.setTransform(856.25,551.65,0.5,0.5);

	this.instance_64 = new lib.CachedBmp_65();
	this.instance_64.setTransform(856.25,550.65,0.5,0.5);

	this.instance_65 = new lib.CachedBmp_66();
	this.instance_65.setTransform(856.25,549.65,0.5,0.5);

	this.instance_66 = new lib.CachedBmp_67();
	this.instance_66.setTransform(858.25,549.65,0.5,0.5);

	this.instance_67 = new lib.CachedBmp_68();
	this.instance_67.setTransform(858.25,549.65,0.5,0.5);

	this.instance_68 = new lib.CachedBmp_69();
	this.instance_68.setTransform(858.25,549.65,0.5,0.5);

	this.instance_69 = new lib.CachedBmp_70();
	this.instance_69.setTransform(855.25,551.65,0.5,0.5);

	this.instance_70 = new lib.CachedBmp_71();
	this.instance_70.setTransform(856.25,551.65,0.5,0.5);

	this.instance_71 = new lib.CachedBmp_72();
	this.instance_71.setTransform(856.25,550.65,0.5,0.5);

	this.instance_72 = new lib.CachedBmp_73();
	this.instance_72.setTransform(856.25,549.65,0.5,0.5);

	this.instance_73 = new lib.CachedBmp_74();
	this.instance_73.setTransform(858.25,549.65,0.5,0.5);

	this.instance_74 = new lib.CachedBmp_75();
	this.instance_74.setTransform(858.25,549.65,0.5,0.5);

	this.instance_75 = new lib.CachedBmp_76();
	this.instance_75.setTransform(855.25,551.65,0.5,0.5);

	this.instance_76 = new lib.CachedBmp_77();
	this.instance_76.setTransform(856.25,551.65,0.5,0.5);

	this.instance_77 = new lib.CachedBmp_78();
	this.instance_77.setTransform(856.25,550.65,0.5,0.5);

	this.instance_78 = new lib.CachedBmp_79();
	this.instance_78.setTransform(856.25,549.65,0.5,0.5);

	this.instance_79 = new lib.CachedBmp_80();
	this.instance_79.setTransform(858.25,549.65,0.5,0.5);

	this.instance_80 = new lib.CachedBmp_81();
	this.instance_80.setTransform(858.25,549.65,0.5,0.5);

	this.instance_81 = new lib.CachedBmp_82();
	this.instance_81.setTransform(858.25,549.65,0.5,0.5);

	this.instance_82 = new lib.CachedBmp_83();
	this.instance_82.setTransform(858.25,549.65,0.5,0.5);

	this.instance_83 = new lib.CachedBmp_84();
	this.instance_83.setTransform(855.25,551.65,0.5,0.5);

	this.instance_84 = new lib.CachedBmp_85();
	this.instance_84.setTransform(856.25,551.65,0.5,0.5);

	this.instance_85 = new lib.CachedBmp_86();
	this.instance_85.setTransform(856.25,550.65,0.5,0.5);

	this.instance_86 = new lib.CachedBmp_87();
	this.instance_86.setTransform(856.25,549.65,0.5,0.5);

	this.instance_87 = new lib.CachedBmp_88();
	this.instance_87.setTransform(858.25,549.65,0.5,0.5);

	this.instance_88 = new lib.CachedBmp_89();
	this.instance_88.setTransform(858.25,549.65,0.5,0.5);

	this.instance_89 = new lib.CachedBmp_90();
	this.instance_89.setTransform(855.25,551.65,0.5,0.5);

	this.instance_90 = new lib.CachedBmp_91();
	this.instance_90.setTransform(856.25,551.65,0.5,0.5);

	this.instance_91 = new lib.CachedBmp_92();
	this.instance_91.setTransform(856.25,550.65,0.5,0.5);

	this.instance_92 = new lib.CachedBmp_93();
	this.instance_92.setTransform(856.25,549.65,0.5,0.5);

	this.instance_93 = new lib.CachedBmp_94();
	this.instance_93.setTransform(858.25,549.65,0.5,0.5);

	this.instance_94 = new lib.CachedBmp_95();
	this.instance_94.setTransform(858.25,549.65,0.5,0.5);

	this.instance_95 = new lib.CachedBmp_96();
	this.instance_95.setTransform(858.25,549.65,0.5,0.5);

	this.instance_96 = new lib.CachedBmp_97();
	this.instance_96.setTransform(858.25,549.65,0.5,0.5);

	this.instance_97 = new lib.CachedBmp_98();
	this.instance_97.setTransform(855.25,551.65,0.5,0.5);

	this.instance_98 = new lib.CachedBmp_99();
	this.instance_98.setTransform(856.25,551.65,0.5,0.5);

	this.instance_99 = new lib.CachedBmp_100();
	this.instance_99.setTransform(856.25,550.65,0.5,0.5);

	this.instance_100 = new lib.CachedBmp_101();
	this.instance_100.setTransform(856.25,549.65,0.5,0.5);

	this.instance_101 = new lib.CachedBmp_102();
	this.instance_101.setTransform(858.25,549.65,0.5,0.5);

	this.instance_102 = new lib.CachedBmp_103();
	this.instance_102.setTransform(858.25,549.65,0.5,0.5);

	this.instance_103 = new lib.CachedBmp_104();
	this.instance_103.setTransform(855.25,551.65,0.5,0.5);

	this.instance_104 = new lib.CachedBmp_105();
	this.instance_104.setTransform(856.25,551.65,0.5,0.5);

	this.instance_105 = new lib.CachedBmp_106();
	this.instance_105.setTransform(856.25,550.65,0.5,0.5);

	this.instance_106 = new lib.CachedBmp_107();
	this.instance_106.setTransform(856.25,549.65,0.5,0.5);

	this.instance_107 = new lib.CachedBmp_108();
	this.instance_107.setTransform(858.25,549.65,0.5,0.5);

	this.instance_108 = new lib.CachedBmp_109();
	this.instance_108.setTransform(858.25,549.65,0.5,0.5);

	this.instance_109 = new lib.CachedBmp_110();
	this.instance_109.setTransform(858.25,549.65,0.5,0.5);

	this.instance_110 = new lib.CachedBmp_111();
	this.instance_110.setTransform(858.25,549.65,0.5,0.5);

	this.instance_111 = new lib.CachedBmp_112();
	this.instance_111.setTransform(856.25,550.65,0.5,0.5);

	this.instance_112 = new lib.CachedBmp_113();
	this.instance_112.setTransform(856.25,549.65,0.5,0.5);

	this.instance_113 = new lib.CachedBmp_114();
	this.instance_113.setTransform(858.25,549.65,0.5,0.5);

	this.instance_114 = new lib.CachedBmp_115();
	this.instance_114.setTransform(858.25,549.65,0.5,0.5);

	this.instance_115 = new lib.CachedBmp_116();
	this.instance_115.setTransform(858.25,549.65,0.5,0.5);

	this.instance_116 = new lib.CachedBmp_117();
	this.instance_116.setTransform(858.25,549.65,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},3).to({state:[{t:this.instance_2}]},3).to({state:[{t:this.instance_3}]},2).to({state:[{t:this.instance_4}]},3).to({state:[{t:this.instance_5}]},2).to({state:[{t:this.instance_6}]},3).to({state:[{t:this.instance_7}]},3).to({state:[{t:this.instance_8}]},2).to({state:[{t:this.instance_9}]},3).to({state:[{t:this.instance_10}]},3).to({state:[{t:this.instance_11}]},2).to({state:[{t:this.instance_12}]},3).to({state:[{t:this.instance_13}]},2).to({state:[{t:this.instance_14}]},3).to({state:[{t:this.instance_15}]},3).to({state:[{t:this.instance_16}]},2).to({state:[{t:this.instance_17}]},2).to({state:[{t:this.instance_18}]},3).to({state:[{t:this.instance_19}]},3).to({state:[{t:this.instance_20}]},2).to({state:[{t:this.instance_21}]},3).to({state:[{t:this.instance_22}]},2).to({state:[{t:this.instance_23}]},3).to({state:[{t:this.instance_24}]},3).to({state:[{t:this.instance_25}]},2).to({state:[{t:this.instance_26}]},3).to({state:[{t:this.instance_27}]},3).to({state:[{t:this.instance_28}]},3).to({state:[{t:this.instance_29}]},2).to({state:[{t:this.instance_30}]},3).to({state:[{t:this.instance_31}]},2).to({state:[{t:this.instance_32}]},3).to({state:[{t:this.instance_33}]},3).to({state:[{t:this.instance_34}]},2).to({state:[{t:this.instance_35}]},2).to({state:[{t:this.instance_36}]},3).to({state:[{t:this.instance_37}]},3).to({state:[{t:this.instance_38}]},2).to({state:[{t:this.instance_39}]},3).to({state:[{t:this.instance_40}]},2).to({state:[{t:this.instance_41}]},3).to({state:[{t:this.instance_42}]},3).to({state:[{t:this.instance_43}]},2).to({state:[{t:this.instance_44}]},3).to({state:[{t:this.instance_45}]},3).to({state:[{t:this.instance_46}]},3).to({state:[{t:this.instance_47}]},2).to({state:[{t:this.instance_48}]},3).to({state:[{t:this.instance_49}]},2).to({state:[{t:this.instance_50}]},3).to({state:[{t:this.instance_51}]},3).to({state:[{t:this.instance_52}]},2).to({state:[{t:this.instance_53}]},3).to({state:[{t:this.instance_54}]},3).to({state:[{t:this.instance_55}]},3).to({state:[{t:this.instance_56}]},2).to({state:[{t:this.instance_57}]},3).to({state:[{t:this.instance_58}]},2).to({state:[{t:this.instance_59}]},3).to({state:[{t:this.instance_60}]},3).to({state:[{t:this.instance_61}]},2).to({state:[{t:this.instance_62}]},3).to({state:[{t:this.instance_63}]},2).to({state:[{t:this.instance_64}]},2).to({state:[{t:this.instance_65}]},3).to({state:[{t:this.instance_66}]},3).to({state:[{t:this.instance_67}]},2).to({state:[{t:this.instance_68}]},2).to({state:[{t:this.instance_69}]},3).to({state:[{t:this.instance_70}]},1).to({state:[{t:this.instance_71}]},2).to({state:[{t:this.instance_72}]},3).to({state:[{t:this.instance_73}]},3).to({state:[{t:this.instance_74}]},2).to({state:[{t:this.instance_75}]},3).to({state:[{t:this.instance_76}]},2).to({state:[{t:this.instance_77}]},2).to({state:[{t:this.instance_78}]},3).to({state:[{t:this.instance_79}]},3).to({state:[{t:this.instance_80}]},2).to({state:[{t:this.instance_81}]},2).to({state:[{t:this.instance_82}]},3).to({state:[{t:this.instance_83}]},4).to({state:[{t:this.instance_84}]},1).to({state:[{t:this.instance_85}]},2).to({state:[{t:this.instance_86}]},3).to({state:[{t:this.instance_87}]},3).to({state:[{t:this.instance_88}]},2).to({state:[{t:this.instance_89}]},3).to({state:[{t:this.instance_90}]},2).to({state:[{t:this.instance_91}]},2).to({state:[{t:this.instance_92}]},3).to({state:[{t:this.instance_93}]},3).to({state:[{t:this.instance_94}]},2).to({state:[{t:this.instance_95}]},2).to({state:[{t:this.instance_96}]},3).to({state:[{t:this.instance_97}]},4).to({state:[{t:this.instance_98}]},1).to({state:[{t:this.instance_99}]},2).to({state:[{t:this.instance_100}]},3).to({state:[{t:this.instance_101}]},3).to({state:[{t:this.instance_102}]},2).to({state:[{t:this.instance_103}]},3).to({state:[{t:this.instance_104}]},2).to({state:[{t:this.instance_105}]},2).to({state:[{t:this.instance_106}]},3).to({state:[{t:this.instance_107}]},3).to({state:[{t:this.instance_108}]},2).to({state:[{t:this.instance_109}]},2).to({state:[{t:this.instance_110}]},3).to({state:[{t:this.instance_111}]},2).to({state:[{t:this.instance_112}]},3).to({state:[{t:this.instance_113}]},3).to({state:[{t:this.instance_114}]},2).to({state:[{t:this.instance_115}]},2).to({state:[{t:this.instance_116}]},3).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_mountains = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// mountains
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#031600").s().p("EhufAi6IgByCQAEgFABgHMAJSg4QINRd1QAFAKAKAFQAKAEAKgDQALgDAGgJICmj5IC1IeQAEALALAGQAKAGANgEQALgEAGgKII6wVIKkZpQAEAIAHAGQAJAFAJgBQAJAAAIgGQAHgGADgJIENt/IESRGQACAKAJAGQAIAGAKAAQAKAAAJgGQAHgHADgKIEXy7IL8a1QAFAKAKAFQAKAEALgDQALgDAGgKIJNjnIL7GzQAHAHAJADQAJACAJgEIH4EBQGLkoADgEII7n0IEiGwQAFAIAIADQAJAEAJgCQAKgDAGgGINpuyILclpINj1EIEMKHQACAFAEAFILCK3IGORFQADALAMAGQAMAFALgEQALgFAGgLMAPDghFIEYUfQADAKAIAHQAJAHAMgBQALgBAIgHIIvouIEibKIAAT0g");
	this.shape.setTransform(638.25,341.175);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#031600").s().p("EhufAi6IgByCQAEgFABgHMAJSg4QINRd1QAFAKAKAFQAKAEAKgDQALgDAGgJICmj5IC1IeQAEALALAGQAKAGANgEQALgEAGgKII6wVIKkZpQAEAIAHAGQAJAFAJgBQAJAAAIgGQAHgGADgJIENt/IESRGQACAKAJAGQAIAGAKAAQAKAAAJgGQAHgHADgKIIspFIHnQ/QAFAKAKAFQAKAEALgDQALgDAGgKIJNjnIL7GzQAHAHAJADQAJACAJgEIH4EBQGLkoADgEII7n0IEiGwQAFAIAIADQAJAEAJgCQAKgDAGgGINpuyILclpINj1EIEMKHQACAFAEAFILCK3IGORFQADALAMAGQAMAFALgEQALgFAGgLMAPDghFIEYUfQADAKAIAHQAJAHAMgBQALgBAIgHIIvouIEibKIAAT0g");
	this.shape_1.setTransform(638.25,341.175);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},299).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_moon = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// moon
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCCCFF").s().p("Au5O7QmMmMAAovQAAouGMmMQGLmLIuAAQIvAAGMGLQGLGMAAIuQAAIvmLGMQmMGLovAAQouAAmLmLg");
	this.shape.setTransform(1118,135);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#CCCCFF").s().p("Au6O7QmLmMAAovQAAouGLmMQGMmLIuAAQIvAAGLGLQGMGMAAIuQAAIvmMGMQmLGLovAAQouAAmMmLg");
	this.shape_1.setTransform(1117.95,135.025);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#CCCCFF").s().p("Au6O7QmLmMAAovQAAouGLmLQGMmMIuAAQIvAAGLGMQGMGLAAIuQAAIvmMGMQmLGLovAAQouAAmMmLg");
	this.shape_2.setTransform(1117.725,135.1);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#CCCCFF").s().p("Au6O6QmLmLAAovQAAouGLmMQGMmLIuAAQIvAAGMGLQGLGMAAIuQAAIvmLGLQmMGMovAAQouAAmMmMg");
	this.shape_3.setTransform(1117.35,135.25);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#CCCCFF").s().p("Au5O7QmNmMABovQgBouGNmMQGLmLIuAAQIvAAGMGLQGMGMAAIuQAAIvmMGMQmMGLovAAQouAAmLmLg");
	this.shape_4.setTransform(1116.2,135.725);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#CCCCFF").s().p("Au6O6QmLmLAAovQAAovGLmLQGMmMIuAAQIwAAGLGMQGMGLAAIvQAAIvmMGLQmLGNowgBQouABmMmNg");
	this.shape_5.setTransform(1115.4,136.05);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#CCCCFF").s().p("Au6O7QmMmMAAovQAAouGMmMQGMmMIuAAQIvAAGMGMQGMGMAAIuQAAIvmMGMQmMGMovAAQouAAmMmMg");
	this.shape_6.setTransform(1114.475,136.425);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#CCCCFF").s().p("Au7O7QmLmMAAovQAAouGLmMQGNmMIuAAQIvAAGMGMQGMGMAAIuQAAIvmMGMQmMGMovAAQouAAmNmMg");
	this.shape_7.setTransform(1113.4,136.85);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#CBCBFF").s().p("Au6O7QmMmLAAowQAAouGMmMQGLmMIvAAQIvAAGMGMQGMGMAAIuQAAIwmMGLQmMGMovAAQovAAmLmMg");
	this.shape_8.setTransform(1112.175,137.325);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#CBCBFF").s().p("Au6O8QmNmMABowQgBovGNmMQGMmLIuAAQIvAAGNGLQGLGMABIvQgBIwmLGMQmNGLovABQougBmMmLg");
	this.shape_9.setTransform(1110.8,137.9);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#CBCBFF").s().p("Au7O8QmMmMAAowQAAovGMmMQGMmMIvAAQIwAAGMGMQGMGMAAIvQAAIwmMGMQmMGMowAAQovAAmMmMg");
	this.shape_10.setTransform(1109.275,138.475);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#CBCBFF").s().p("Au7O9QmMmNAAowQAAovGMmMQGMmNIvAAQIwAAGMGNQGNGMgBIvQABIwmNGNQmMGMowAAQovAAmMmMg");
	this.shape_11.setTransform(1105.8,139.85);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#CBCBFF").s().p("Au8O9QmMmNAAowQAAovGMmNQGNmMIvAAQIwAAGNGMQGMGNAAIvQAAIwmMGNQmNGMowAAQovAAmNmMg");
	this.shape_12.setTransform(1103.85,140.65);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#CACAFF").s().p("Au8O9QmMmNAAowQAAovGMmNQGNmMIvAAQIwAAGNGMQGMGNAAIvQAAIwmMGNQmNGMowAAQovAAmNmMg");
	this.shape_13.setTransform(1101.775,141.475);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#CACAFF").s().p("Au8O9QmNmMAAoxQAAowGNmMQGNmNIvAAQIxAAGMGNQGNGMAAIwQAAIxmNGMQmMGNoxAAQovAAmNmNg");
	this.shape_14.setTransform(1099.525,142.375);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#CACAFF").s().p("Au8O+QmOmNABoxQgBowGOmMQGMmNIwAAQIxAAGMGNQGNGMAAIwQAAIxmNGNQmMGMoxAAQowAAmMmMg");
	this.shape_15.setTransform(1097.15,143.325);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#CACAFF").s().p("Au9O+QmNmNAAoxQAAowGNmNQGNmNIwAAQIxAAGNGNQGNGNAAIwQAAIxmNGNQmNGNoxAAQowAAmNmNg");
	this.shape_16.setTransform(1094.625,144.325);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#C9C9FF").s().p("Au9O/QmNmOAAoxQAAowGNmNQGNmOIwAAQIxAAGOGOQGMGNABIwQgBIxmMGOQmOGNoxAAQowAAmNmNg");
	this.shape_17.setTransform(1091.95,145.4);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#C9C9FF").s().p("Au+O+QmNmMAAoyQAAowGNmOQGOmNIwAAQIxAAGOGNQGNGOAAIwQAAIymNGMQmOGOoxAAQowAAmOmOg");
	this.shape_18.setTransform(1089.15,146.55);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#C9C9FF").s().p("Au+O/QmNmNAAoyQAAowGNmOQGNmOIxABQIxgBGOGOQGOGOgBIwQABIymOGNQmOGNoxAAQoxAAmNmNg");
	this.shape_19.setTransform(1086.2,147.7);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#C9C9FF").s().p("Au+O/QmOmNAAoyQAAoxGOmNQGNmOIxAAQIyAAGOGOQGNGNAAIxQAAIymNGNQmOGOoyAAQoxAAmNmOg");
	this.shape_20.setTransform(1083.075,148.95);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#C8C8FF").s().p("Au/PAQmOmNAAozQAAoxGOmOQGOmOIxAAQIyAAGOGOQGOGOAAIxQAAIzmOGNQmOGOoyAAQoxAAmOmOg");
	this.shape_21.setTransform(1079.825,150.25);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#C8C8FF").s().p("AvAPBQmNmPgBoyQABoxGNmPQGPmNIxgBQIyABGPGNQGNGPAAIxQAAIymNGPQmPGNoyABQoxgBmPmNg");
	this.shape_22.setTransform(1076.45,151.6);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#C7C7FF").s().p("AvAPBQmOmOAAozQAAoyGOmOQGOmOIyAAQIzAAGOGOQGOGOABIyQgBIzmOGOQmOGOozAAQoyAAmOmOg");
	this.shape_23.setTransform(1072.9,153.025);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#C7C7FF").s().p("AvAPBQmPmOAAozQAAoyGPmPQGOmOIyAAQIzAAGPGOQGOGPAAIyQAAIzmOGOQmPGPozAAQoyAAmOmPg");
	this.shape_24.setTransform(1069.2,154.5);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#C7C7FF").s().p("AvBPCQmPmPAAozQAAozGPmOQGOmPIzAAQIzAAGPGPQGPGOAAIzQAAIzmPGPQmPGPozAAQozAAmOmPg");
	this.shape_25.setTransform(1065.4,156.025);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#C6C6FF").s().p("AvCPDQmPmPAAo0QAAozGPmOQGPmQIzAAQI0AAGPGQQGPGOAAIzQAAI0mPGPQmPGPo0AAQozAAmPmPg");
	this.shape_26.setTransform(1061.425,157.6);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#C6C6FF").s().p("AvDPEQmOmQAAo0QAAozGOmPQGQmQIzABQI0gBGPGQQGQGPAAIzQAAI0mQGQQmPGPo0gBQozABmQmPg");
	this.shape_27.setTransform(1057.3,159.25);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#C6C6FF").s().p("AvDPEQmPmPAAo1QAAozGPmQQGQmPIzgBQI0ABGQGPQGPGQABIzQgBI1mPGPQmQGPo0AAQozAAmQmPg");
	this.shape_28.setTransform(1053.05,160.95);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#C5C5FF").s().p("AvEPEQmPmPAAo1QAAo0GPmQQGQmQI0ABQI1gBGPGQQGQGQAAI0QAAI1mQGPQmPGRo1AAQo0AAmQmRg");
	this.shape_29.setTransform(1048.675,162.7);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#C5C5FF").s().p("AvEPFQmQmQAAo1QAAo0GQmQQGQmQI0AAQI1AAGQGQQGQGQAAI0QAAI1mQGQQmQGQo1AAQo0AAmQmQg");
	this.shape_30.setTransform(1044.125,164.525);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#C4C4FF").s().p("AvFPGQmQmQAAo2QAAo1GQmQQGQmQI1AAQI2AAGQGQQGQGQAAI1QAAI2mQGQQmQGQo2AAQo1AAmQmQg");
	this.shape_31.setTransform(1039.425,166.375);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#C4C4FF").s().p("AvGPHQmQmRAAo2QAAo1GQmRQGRmQI1AAQI2AAGRGQQGQGRAAI1QAAI2mQGRQmRGQo2AAQo1AAmRmQg");
	this.shape_32.setTransform(1034.575,168.325);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#C3C3FF").s().p("AvHPHQmQmRAAo2QAAo2GQmQQGSmRI1AAQI2AAGRGRQGRGQAAI2QAAI2mRGRQmRGRo2AAQo1AAmSmRg");
	this.shape_33.setTransform(1029.6,170.325);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#C3C3FF").s().p("AvHPIQmRmRAAo3QAAo2GRmRQGRmRI2AAQI3AAGRGRQGRGRAAI2QAAI3mRGRQmRGRo3AAQo2AAmRmRg");
	this.shape_34.setTransform(1024.475,172.375);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#C2C2FF").s().p("AvIPJQmRmSAAo3QAAo3GRmRQGRmRI3AAQI3AAGSGRQGRGRAAI3QAAI3mRGSQmSGRo3AAQo3AAmRmRg");
	this.shape_35.setTransform(1019.225,174.475);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#C2C2FF").s().p("AvJPKQmSmTABo3QgBo3GSmSQGSmSI3ABQI4gBGSGSQGRGSAAI3QAAI3mRGTQmSGSo4AAQo3AAmSmSg");
	this.shape_36.setTransform(1013.8,176.65);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#C1C1FF").s().p("AvJPLQmTmTAAo4QAAo3GTmSQGSmTI3AAQI4AAGTGTQGSGSAAI3QAAI4mSGTQmTGRo4AAQo3AAmSmRg");
	this.shape_37.setTransform(1008.225,178.85);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#C0C0FF").s().p("AvKPLQmTmSAAo5QAAo4GTmSQGSmTI4AAQI5AAGSGTQGTGSAAI4QAAI5mTGSQmSGTo5AAQo4AAmSmTg");
	this.shape_38.setTransform(1002.525,181.125);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#C0C0FF").s().p("AvLPNQmTmTAAo6QAAo4GTmTQGSmTI5AAQI5AAGTGTQGTGTAAI4QAAI6mTGTQmTGSo5AAQo5AAmSmSg");
	this.shape_39.setTransform(996.7,183.45);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#BFBFFF").s().p("AvMPNQmTmTAAo6QAAo5GTmTQGTmTI5AAQI6AAGTGTQGTGTAAI5QAAI6mTGTQmTGTo6AAQo5AAmTmTg");
	this.shape_40.setTransform(990.7,185.875);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#BFBFFF").s().p("AvNPOQmUmTABo7QgBo5GUmUQGTmTI6AAQI7AAGTGTQGTGUAAI5QAAI7mTGTQmTGTo7ABQo6gBmTmTg");
	this.shape_41.setTransform(984.55,188.3);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#BEBEFF").s().p("AvOPPQmUmUAAo7QAAo6GUmUQGUmUI6AAQI7AAGUGUQGUGUAAI6QAAI7mUGUQmUGUo7AAQo6AAmUmUg");
	this.shape_42.setTransform(978.275,190.825);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#BDBDFF").s().p("AvPPQQmUmUAAo8QAAo6GUmVQGUmUI7AAQI8AAGUGUQGUGVAAI6QAAI8mUGUQmUGUo8AAQo7AAmUmUg");
	this.shape_43.setTransform(971.85,193.375);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#BDBDFF").s().p("AvPPRQmVmVAAo8QAAo7GVmUQGUmVI7AAQI8AAGUGVQGVGUAAI7QAAI8mVGVQmUGVo8AAQo7AAmUmVg");
	this.shape_44.setTransform(965.3,196);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#BCBCFF").s().p("AvRPSQmVmVAAo9QAAo7GVmWQGVmVI8AAQI9AAGVGVQGVGWAAI7QAAI9mVGVQmVGVo9AAQo8AAmVmVg");
	this.shape_45.setTransform(958.575,198.675);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#BBBBFF").s().p("AvSPTQmVmWAAo9QAAo8GVmWQGWmVI8AAQI9AAGWGVQGVGWAAI8QAAI9mVGWQmWGVo9AAQo8AAmWmVg");
	this.shape_46.setTransform(951.725,201.425);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#BBBBFF").s().p("AvTPUQmWmWAAo+QAAo9GWmWQGWmWI9AAQI+AAGWGWQGWGWAAI9QAAI+mWGWQmWGWo+AAQo9AAmWmWg");
	this.shape_47.setTransform(944.725,204.225);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#BABAFF").s().p("AvUPVQmWmXAAo+QAAo9GWmXQGWmWI+AAQI+AAGWGWQGXGXAAI9QAAI+mXGXQmWGWo+AAQo+AAmWmWg");
	this.shape_48.setTransform(937.6,207.075);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#B9B9FF").s().p("AvVPWQmXmXABo/QgBo+GXmXQGXmXI+AAQI/AAGWGXQGXGXAAI+QAAI/mXGXQmWGXo/AAQo+AAmXmXg");
	this.shape_49.setTransform(930.3,209.975);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#B9B9FF").s().p("AvWPXQmXmYAAo/QAAo/GXmXQGXmXI/AAQJAAAGXGXQGXGXAAI/QAAI/mXGYQmXGXpAAAQo/AAmXmXg");
	this.shape_50.setTransform(922.875,212.975);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#B8B8FF").s().p("AvXPYQmYmYAApAQAAo/GYmYQGYmYI/AAQJAAAGYGYQGYGYAAI/QAAJAmYGYQmYGYpAAAQo/AAmYmYg");
	this.shape_51.setTransform(915.275,215.975);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#B7B7FF").s().p("AvYPZQmYmYAApBQAApAGYmYQGYmYJAAAQJBAAGYGYQGYGYAAJAQAAJBmYGYQmYGYpBAAQpAAAmYmYg");
	this.shape_52.setTransform(907.575,219.075);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#B6B6FF").s().p("AvZPbQmZmZAApCQAApAGZmZQGYmZJBAAQJBAAGZGZQGZGZAAJAQAAJCmZGZQmZGYpBAAQpBAAmYmYg");
	this.shape_53.setTransform(899.7,222.2);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#B5B5FF").s().p("AvaPbQmamZAApCQAApBGamaQGYmZJCAAQJCAAGZGZQGaGagBJBQABJCmaGZQmZGapCAAQpCAAmYmag");
	this.shape_54.setTransform(891.7,225.425);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#B5B5FF").s().p("AvcPdQmZmaAApDQAApCGZmaQGamZJCAAQJDAAGaGZQGZGaAAJCQAAJDmZGaQmaGZpDAAQpCAAmamZg");
	this.shape_55.setTransform(883.525,228.675);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#B4B4FF").s().p("AvdPdQmamZAApEQAApDGamaQGamaJDAAQJEAAGaGaQGaGaAAJDQAAJEmaGZQmaGbpEAAQpDAAmambg");
	this.shape_56.setTransform(875.225,232);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#B3B3FF").s().p("AvePfQmambAApEQAApEGamaQGambJEAAQJFAAGaGbQGbGagBJEQABJEmbGbQmaGbpFAAQpEAAmambg");
	this.shape_57.setTransform(866.8,235.375);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#B2B2FF").s().p("AvfPgQmcmbAApFQAApFGcmaQGbmcJEABQJFgBGbGcQGbGaAAJFQAAJFmbGbQmbGbpFABQpEgBmbmbg");
	this.shape_58.setTransform(858.2,238.8);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#B1B1FF").s().p("AvhPiQmbmcAApGQAApFGbmcQGcmbJFAAQJGAAGbGbQGcGcAAJFQAAJGmcGcQmbGbpGAAQpFAAmcmbg");
	this.shape_59.setTransform(849.475,242.275);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#B0B0FF").s().p("AviPjQmcmcAApHQAApGGcmcQGdmcJFAAQJGAAGcGcQGdGcAAJGQAAJHmdGcQmcGcpGAAQpFAAmdmcg");
	this.shape_60.setTransform(840.6,245.825);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#AFAFFF").s().p("AvjPkQmdmdAApHQAApGGdmdQGcmdJHAAQJIAAGcGdQGdGdAAJGQAAJHmdGdQmcGdpIAAQpHAAmcmdg");
	this.shape_61.setTransform(831.55,249.425);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#AEAEFF").s().p("AvlPmQmdmeAApIQAApIGdmcQGemeJHAAQJIAAGdGeQGeGcAAJIQAAJImeGeQmdGdpIAAQpHAAmemdg");
	this.shape_62.setTransform(822.425,253.1);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#AEAEFF").s().p("AvmPnQmdmegBpJQABpIGdmeQGemeJIAAQJJAAGeGeQGeGeAAJIQAAJJmeGeQmeGepJAAQpIAAmemeg");
	this.shape_63.setTransform(813.1,256.8);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#ADADFF").s().p("AvnPoQmfmeAApKQAApJGfmeQGemfJJAAQJKAAGeGfQGfGeAAJJQAAJKmfGeQmeGfpKAAQpJAAmemfg");
	this.shape_64.setTransform(803.625,260.575);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#ACACFF").s().p("AvpPqQmfmfABpLQgBpKGfmfQGfmfJKAAQJKAAGgGfQGeGfABJKQgBJLmeGfQmgGfpKAAQpKAAmfmfg");
	this.shape_65.setTransform(794.05,264.425);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#ABABFF").s().p("AvqPrQmgmgAApLQAApLGgmfQGgmgJKAAQJMAAGfGgQGgGfAAJLQAAJLmgGgQmfGgpMAAQpKAAmgmgg");
	this.shape_66.setTransform(784.3,268.325);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#AAAAFF").s().p("AvsPsQmfmggBpMQABpLGfmhQGhmgJLAAQJNAAGgGgQGfGhABJLQgBJMmfGgQmgGhpNAAQpLAAmhmhg");
	this.shape_67.setTransform(774.4,272.275);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#A9A9FF").s().p("AvtPuQmhmhAApNQAApMGhmhQGhmhJMAAQJNAAGhGhQGhGhAAJMQAAJNmhGhQmhGhpNAAQpMAAmhmhg");
	this.shape_68.setTransform(764.375,276.25);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#A8A8FF").s().p("AvuPvQmimhAApOQAApNGimhQGhmiJNAAQJOAAGiGiQGhGhAAJNQAAJOmhGhQmiGipOAAQpNAAmhmig");
	this.shape_69.setTransform(754.175,280.35);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#A7A7FF").s().p("AvwPxQmimiAApPQAApOGimiQGimiJOAAQJPAAGiGiQGiGiAAJOQAAJPmiGiQmiGipPAAQpOAAmimig");
	this.shape_70.setTransform(743.875,284.45);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#A6A6FF").s().p("AvyPzQmimjAApQQAApPGimiQGjmjJPAAQJQAAGjGjQGiGiAAJPQAAJQmiGjQmjGipQAAQpPAAmjmig");
	this.shape_71.setTransform(733.4,288.625);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#A5A5FF").s().p("AvzP0QmjmjAApRQAApQGjmjQGjmjJQAAQJQAAGkGjQGjGjAAJQQAAJRmjGjQmkGjpQAAQpQAAmjmjg");
	this.shape_72.setTransform(722.825,292.875);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#A3A3FF").s().p("Av0P2QmlmkABpSQgBpRGlmkQGkmkJQAAQJSAAGkGkQGjGkAAJRQAAJSmjGkQmkGkpSAAQpQAAmkmkg");
	this.shape_73.setTransform(712.05,297.175);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#A2A2FF").s().p("Av2P3QmkmkAApTQAApSGkmkQGkmlJSAAQJTAAGkGlQGkGkABJSQgBJTmkGkQmkGlpTAAQpSAAmkmlg");
	this.shape_74.setTransform(701.15,301.525);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#A1A1FF").s().p("Av4P5QmlmlAApUQAApSGlmmQGmmlJSAAQJTAAGmGlQGlGmAAJSQAAJUmlGlQmmGlpTAAQpSAAmmmlg");
	this.shape_75.setTransform(690.125,305.925);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#A0A0FF").s().p("Av5P7QmmmnAApUQAApUGmmmQGmmmJTAAQJUAAGmGmQGmGmAAJUQAAJUmmGnQmmGlpUAAQpTAAmmmlg");
	this.shape_76.setTransform(678.925,310.4);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#9F9FFF").s().p("Av7P8QmnmnAApVQAApUGnmnQGmmnJVAAQJWAAGmGnQGmGnABJUQgBJVmmGnQmmGnpWAAQpVAAmmmng");
	this.shape_77.setTransform(667.6,314.925);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#9E9EFF").s().p("Av9P+QmnmoAApWQAApWGnmnQGomnJVAAQJWAAGoGnQGnGnAAJWQAAJWmnGoQmoGnpWAAQpVAAmomng");
	this.shape_78.setTransform(656.125,319.525);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#9D9DFF").s().p("Av/QAQmnmpAApXQAApXGnmoQGomoJXAAQJXAAGoGoQGoGoAAJXQAAJXmoGpQmoGnpXAAQpXAAmomng");
	this.shape_79.setTransform(644.525,324.15);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#9C9CFF").s().p("AwAQBQmpmpAApYQAApYGpmoQGpmpJXAAQJYAAGpGpQGpGoAAJYQAAJYmpGpQmpGppYAAQpXAAmpmpg");
	this.shape_80.setTransform(632.725,328.85);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#9A9AFF").s().p("AwCQDQmpmqAApZQAApYGpmqQGqmpJYAAQJZAAGqGpQGpGqAAJYQAAJZmpGqQmqGppZABQpYgBmqmpg");
	this.shape_81.setTransform(620.825,333.6);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#9999FF").s().p("AwDQEQmrmqAApaQAApaGrmqQGqmqJZAAQJaAAGrGqQGqGqAAJaQAAJamqGqQmrGrpaAAQpZAAmqmrg");
	this.shape_82.setTransform(608.775,338.45);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#9898FF").s().p("AwFQGQmrmqAApcQAApaGrmsQGrmqJaAAQJbAAGrGqQGrGsAAJaQAAJcmrGqQmrGspbAAQpaAAmrmsg");
	this.shape_83.setTransform(596.575,343.3);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#9797FF").s().p("AwHQIQmsmsAApcQAApcGsmsQGsmrJbAAQJdAAGrGrQGsGsAAJcQAAJcmsGsQmrGspdAAQpbAAmsmsg");
	this.shape_84.setTransform(584.225,348.25);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#9595FF").s().p("AwJQKQmsmsAApeQAApdGsmsQGsmtJdAAQJdAAGtGtQGsGsAAJdQAAJemsGsQmtGtpdAAQpdAAmsmtg");
	this.shape_85.setTransform(571.775,353.225);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#9494FF").s().p("AwLQMQmtmtAApfQAApeGtmtQGtmtJeAAQJfAAGtGtQGtGtAAJeQAAJfmtGtQmtGtpfAAQpeAAmtmtg");
	this.shape_86.setTransform(559.125,358.275);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#9393FF").s().p("AwMQOQmvmuABpgQgBpfGvmuQGumuJeAAQJfAAGuGuQGuGuAAJfQAAJgmuGuQmuGupfAAQpeAAmumug");
	this.shape_87.setTransform(546.35,363.375);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#9292FF").s().p("AwOQQQmvmvAAphQAApgGvmvQGumvJgAAQJhAAGuGvQGvGvAAJgQAAJhmvGvQmuGvphAAQpgAAmumvg");
	this.shape_88.setTransform(533.425,368.525);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#9090FF").s().p("AwQQSQmwmwAApiQAAphGwmvQGvmwJhAAQJiAAGvGwQGwGvAAJhQAAJimwGwQmvGvpiAAQphAAmvmvg");
	this.shape_89.setTransform(520.375,373.725);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#8F8FFF").s().p("AwSQUQmwmxAApjQAApiGwmwQGwmxJiAAQJjAAGwGxQGwGwAAJiQAAJjmwGxQmwGwpjAAQpiAAmwmwg");
	this.shape_90.setTransform(507.15,379);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#8E8EFF").s().p("AwUQVQmxmxAApkQAApkGxmwQGxmxJjAAQJkAAGxGxQGxGwAAJkQAAJkmxGxQmxGxpkAAQpjAAmxmxg");
	this.shape_91.setTransform(493.825,384.35);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#8C8CFF").s().p("AwWQXQmymyAAplQAAplGymxQGymyJkgBQJlABGzGyQGxGxAAJlQAAJlmxGyQmzGzplAAQpkAAmymzg");
	this.shape_92.setTransform(480.3,389.75);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#8B8BFF").s().p("AwYQZQmzmyAApnQAAplGzmzQGzmzJlAAQJnAAGyGzQGzGzAAJlQAAJnmzGyQmyGzpnAAQplAAmzmzg");
	this.shape_93.setTransform(466.675,395.175);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#8A8AFF").s().p("AwaQcQmzm0AApoQAApnGzmzQG0m0JmAAQJoAAGzG0QGzGzABJnQgBJomzG0QmzGzpoAAQpmAAm0mzg");
	this.shape_94.setTransform(452.9,400.7);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#8888FF").s().p("AwcQdQm0m0gBppQABpoG0m0QG0m1JoAAQJpAAG0G1QG1G0gBJoQABJpm1G0Qm0G1ppAAQpoAAm0m1g");
	this.shape_95.setTransform(438.95,406.25);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#8787FF").s().p("AwfQfQm0m1AApqQAApqG0m0QG2m2JpAAQJqAAG1G2QG2G0gBJqQABJqm2G1Qm1G2pqAAQppAAm2m2g");
	this.shape_96.setTransform(424.9,411.9);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#8585FF").s().p("AwgQhQm2m2AAprQAApqG2m2QG2m3JqAAQJrAAG2G3QG2G2AAJqQAAJrm2G2Qm2G3prAAQpqAAm2m3g");
	this.shape_97.setTransform(410.675,417.575);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#8484FF").s().p("AwjQjQm2m3gBpsQABpsG2m3QG4m3JrAAQJsAAG4G3QG2G3AAJsQAAJsm2G3Qm4G4psAAQprAAm4m4g");
	this.shape_98.setTransform(396.3,423.325);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#8383FF").s().p("AwkQlQm5m3ABpuQgBptG5m4QG3m4JtAAQJtAAG5G4QG3G4ABJtQgBJum3G3Qm5G5ptAAQptAAm3m5g");
	this.shape_99.setTransform(381.8,429.1);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#8181FF").s().p("AwnQoQm4m5AApvQAApuG4m5QG5m5JuAAQJvAAG4G5QG5G5AAJuQAAJvm5G5Qm4G5pvAAQpuAAm5m5g");
	this.shape_100.setTransform(367.175,434.95);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#8080FF").s().p("AwpQqQm5m6AApwQAApvG5m6QG6m6JvAAQJwAAG6G6QG5G6AAJvQAAJwm5G6Qm6G6pwAAQpvAAm6m6g");
	this.shape_101.setTransform(352.375,440.875);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#7E7EFF").s().p("AwrQsQm6m6AApyQAApxG6m6QG6m7JxAAQJxAAG7G7QG6G6AAJxQAAJym6G6Qm7G7pxAAQpxAAm6m7g");
	this.shape_102.setTransform(337.425,446.85);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#7D7DFF").s().p("AwtQuQm8m7AApzQAApyG8m7QG7m8JyAAQJyAAG8G8QG7G7AAJyQAAJzm7G7Qm8G8pyAAQpyAAm7m8g");
	this.shape_103.setTransform(322.35,452.85);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#7B7BFF").s().p("AwvQxQm8m9gBp0QABpzG8m8QG8m9JzAAQJ0AAG9G9QG8G8gBJzQABJ0m8G9Qm9G8p0AAQpzAAm8m8g");
	this.shape_104.setTransform(307.1,458.925);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#7A7AFF").s().p("AwyQzQm9m9AAp2QAAp0G9m+QG+m9J0AAQJ1AAG+G9QG9G+AAJ0QAAJ2m9G9Qm+G9p1AAQp0AAm+m9g");
	this.shape_105.setTransform(291.725,465.075);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#7878FF").s().p("AwzQ1Qm/m+AAp3QAAp2G/m+QG9m/J2AAQJ3AAG+G/QG+G+AAJ2QAAJ3m+G+Qm+G/p3AAQp2AAm9m/g");
	this.shape_106.setTransform(276.2,471.275);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#7676FF").s().p("Aw2Q3Qm/m/AAp4QAAp3G/m/QG/nAJ3AAQJ4AAG/HAQG/G/AAJ3QAAJ4m/G/Qm/HAp4AAQp3AAm/nAg");
	this.shape_107.setTransform(260.55,477.525);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#7575FF").s().p("Aw4Q6QnAnAgBp6QABp4HAnBQHAnAJ4AAQJ5AAHAHAQHAHBABJ4QgBJ6nAHAQnAHAp5AAQp4AAnAnAg");
	this.shape_108.setTransform(244.75,483.85);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#7373FF").s().p("Aw7Q8QnBnBAAp7QAAp6HBnBQHCnBJ5AAQJ7AAHAHBQHBHBAAJ6QAAJ7nBHBQnAHBp7AAQp5AAnCnBg");
	this.shape_109.setTransform(228.8,490.225);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#7272FF").s().p("Aw9Q/QnCnDAAp8QAAp8HCnCQHCnBJ7gBQJ8ABHCHBQHCHCAAJ8QAAJ8nCHDQnCHCp8AAQp7AAnCnCg");
	this.shape_110.setTransform(212.7,496.65);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#7070FF").s().p("Aw/RBQnDnDAAp+QAAp9HDnDQHDnDJ8AAQJ9AAHDHDQHDHDAAJ9QAAJ+nDHDQnDHDp9AAQp8AAnDnDg");
	this.shape_111.setTransform(196.475,503.15);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#6E6EFF").s().p("AxCRDQnEnEAAp/QAAp+HEnEQHEnEJ+gBQJ/ABHEHEQHEHEAAJ+QAAJ/nEHEQnEHEp/AAQp+AAnEnEg");
	this.shape_112.setTransform(180.075,509.7);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#6D6DFF").s().p("AxERGQnFnFAAqBQAAp/HFnFQHFnGJ/AAQKBAAHEHGQHFHFAAJ/QAAKBnFHFQnEHFqBAAQp/AAnFnFg");
	this.shape_113.setTransform(163.55,516.275);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#6B6BFF").s().p("AxHRIQnFnGAAqCQAAqBHFnGQHGnGKBAAQKCAAHFHGQHHHGAAKBQAAKCnHHGQnFHGqCAAQqBAAnGnGg");
	this.shape_114.setTransform(146.9,522.925);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#6969FF").s().p("AxJRKQnHnHAAqDQAAqCHHnHQHHnIKCAAQKEAAHHHIQHGHHAAKCQAAKDnGHHQnHHIqEAAQqCAAnHnIg");
	this.shape_115.setTransform(130.05,529.675);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#6868FF").s().p("AxLRNQnJnIAAqFQAAqEHJnIQHInIKDAAQKEAAHIHIQHIHIAAKEQAAKFnIHIQnIHIqEAAQqDAAnInIg");
	this.shape_116.setTransform(113.1,536.425);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#6666FF").s().p("Au5O7QmMmMAAovQAAouGMmMQGLmLIuAAQIvAAGMGLQGLGMAAIuQAAIvmLGMQmMGLovAAQouAAmLmLg");
	this.shape_117.setTransform(95.9797,543.2726,1.1556,1.1559);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape,p:{x:1118,y:135}}]}).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape,p:{x:1116.825,y:135.475}}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10,p:{x:1109.275,y:138.475}}]},1).to({state:[{t:this.shape_10,p:{x:1107.625,y:139.15}}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_12}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_14}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_16}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_18}]},1).to({state:[{t:this.shape_19}]},1).to({state:[{t:this.shape_20}]},1).to({state:[{t:this.shape_21}]},1).to({state:[{t:this.shape_22}]},1).to({state:[{t:this.shape_23}]},1).to({state:[{t:this.shape_24}]},1).to({state:[{t:this.shape_25}]},1).to({state:[{t:this.shape_26}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_28}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_31}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_33}]},1).to({state:[{t:this.shape_34}]},1).to({state:[{t:this.shape_35}]},1).to({state:[{t:this.shape_36}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_38}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_40}]},1).to({state:[{t:this.shape_41}]},1).to({state:[{t:this.shape_42}]},1).to({state:[{t:this.shape_43}]},1).to({state:[{t:this.shape_44}]},1).to({state:[{t:this.shape_45}]},1).to({state:[{t:this.shape_46}]},1).to({state:[{t:this.shape_47}]},1).to({state:[{t:this.shape_48}]},1).to({state:[{t:this.shape_49}]},1).to({state:[{t:this.shape_50}]},1).to({state:[{t:this.shape_51}]},1).to({state:[{t:this.shape_52}]},1).to({state:[{t:this.shape_53}]},1).to({state:[{t:this.shape_54}]},1).to({state:[{t:this.shape_55}]},1).to({state:[{t:this.shape_56}]},1).to({state:[{t:this.shape_57}]},1).to({state:[{t:this.shape_58}]},1).to({state:[{t:this.shape_59}]},1).to({state:[{t:this.shape_60}]},1).to({state:[{t:this.shape_61}]},1).to({state:[{t:this.shape_62}]},1).to({state:[{t:this.shape_63}]},1).to({state:[{t:this.shape_64}]},1).to({state:[{t:this.shape_65}]},1).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_67}]},1).to({state:[{t:this.shape_68}]},1).to({state:[{t:this.shape_69}]},1).to({state:[{t:this.shape_70}]},1).to({state:[{t:this.shape_71}]},1).to({state:[{t:this.shape_72}]},1).to({state:[{t:this.shape_73}]},1).to({state:[{t:this.shape_74}]},1).to({state:[{t:this.shape_75}]},1).to({state:[{t:this.shape_76}]},1).to({state:[{t:this.shape_77}]},1).to({state:[{t:this.shape_78}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_80}]},1).to({state:[{t:this.shape_81}]},1).to({state:[{t:this.shape_82}]},1).to({state:[{t:this.shape_83}]},1).to({state:[{t:this.shape_84}]},1).to({state:[{t:this.shape_85}]},1).to({state:[{t:this.shape_86}]},1).to({state:[{t:this.shape_87}]},1).to({state:[{t:this.shape_88}]},1).to({state:[{t:this.shape_89}]},1).to({state:[{t:this.shape_90}]},1).to({state:[{t:this.shape_91}]},1).to({state:[{t:this.shape_92}]},1).to({state:[{t:this.shape_93}]},1).to({state:[{t:this.shape_94}]},1).to({state:[{t:this.shape_95}]},1).to({state:[{t:this.shape_96}]},1).to({state:[{t:this.shape_97}]},1).to({state:[{t:this.shape_98}]},1).to({state:[{t:this.shape_99}]},1).to({state:[{t:this.shape_100}]},1).to({state:[{t:this.shape_101}]},1).to({state:[{t:this.shape_102}]},1).to({state:[{t:this.shape_103}]},1).to({state:[{t:this.shape_104}]},1).to({state:[{t:this.shape_105}]},1).to({state:[{t:this.shape_106}]},1).to({state:[{t:this.shape_107}]},1).to({state:[{t:this.shape_108}]},1).to({state:[{t:this.shape_109}]},1).to({state:[{t:this.shape_110}]},1).to({state:[{t:this.shape_111}]},1).to({state:[{t:this.shape_112}]},1).to({state:[{t:this.shape_113}]},1).to({state:[{t:this.shape_114}]},1).to({state:[{t:this.shape_115}]},1).to({state:[{t:this.shape_116}]},1).to({state:[{t:this.shape_117}]},1).wait(181));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_ground = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// ground
	this.shape = new cjs.Shape();
	this.shape.graphics.lf(["#042100","#125100"],[0,1],0,0,1280,0).s().p("Ehj/AMgIAA4/MDH/AAAIAAY/g");
	this.shape.setTransform(639.9096,620,0.1563,8,90);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(300));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_detail = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// detail
	this.instance = new lib.CachedBmp_119();
	this.instance.setTransform(40.35,529.1,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_118();
	this.instance_1.setTransform(874.1,553.75,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(300));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.rest = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_1 = function() {
		playSound("hover");
	}
	this.frame_2 = function() {
		playSound("press");
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(1).call(this.frame_1).wait(1).call(this.frame_2).wait(2));

	// Label
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCCCCC").s().p("AvFCcQgmgJgXgPIAihNQAWANAcAIQAcAHAaAAQAWAAAJgEQAKgEAAgJQAAgKgNgEQgMgFgcgGQglgIgYgJQgYgIgSgTQgSgUAAgjQAAgdAQgZQARgYAhgOQAhgOAvAAQAhAAAfAHQAfAHAYAOIggBNQgugYgqAAQgpAAAAAUQAAAJANAFQAMAFAcAFQAkAHAYAJQAZAJASASQATAUAAAiQAAAegRAYQgRAYghAOQghAPgvAAQgnAAglgJgAM9CdIAAjnIhcAAIAAhTIEiAAIAABTIhcAAIAADngAHtCdIg1hPIgdAAIAABPIhqAAIAAk6ICYAAQArAAAhAPQAgAOARAbQASAbAAAkQAAAigPAYQgPAZgdAPIBCBhgAGbgBIAnAAQAWAAAKgKQALgJAAgSQAAgSgLgJQgKgKgWAAIgnAAgAA6CdIgVg3Ih3AAIgVA3IhsAAICKk6IBnAAICKE6gAg0AaIA8AAIgehOgAoLCdIAAjnIhcAAIAAhTIEjAAIAABTIhdAAIAADng");
	this.shape.setTransform(131.825,31.075);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(4));

	// button
	this.instance = new lib.RestButton();

	this.instance_1 = new lib.HoverButton();

	this.instance_2 = new lib.PressedButton();

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,275,60);


(lib.CatWalking = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_121();
	this.instance.setTransform(0,5.05,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_122();
	this.instance_1.setTransform(-0.25,1.8,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_123();
	this.instance_2.setTransform(-0.45,-2.35,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_124();
	this.instance_3.setTransform(-1.05,1.35,0.5,0.5);

	this.instance_4 = new lib.CachedBmp_125();
	this.instance_4.setTransform(-1.7,4.8,0.5,0.5);

	this.instance_5 = new lib.CachedBmp_126();
	this.instance_5.setTransform(-2.15,5.05,0.5,0.5);

	this.instance_6 = new lib.CachedBmp_127();
	this.instance_6.setTransform(-2.65,7.1,0.5,0.5);

	this.instance_7 = new lib.CachedBmp_128();
	this.instance_7.setTransform(-3.1,4.8,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},4).to({state:[{t:this.instance_2}]},4).to({state:[{t:this.instance_3}]},4).to({state:[{t:this.instance_4}]},4).to({state:[{t:this.instance_5}]},4).to({state:[{t:this.instance_6}]},4).to({state:[{t:this.instance_7}]},4).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.1,-2.3,236.1,353.90000000000003);


(lib.___Camera___ = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		this.visible = false;
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(2));

	// cameraBoundary
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(0,0,0,0)").ss(2,1,1,3,true).p("EAq+AfQMhV7AAAMAAAg+fMBV7AAAg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-641,-361,1282,722);


(lib.Scene_1_ImageAssets_psd = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// ImageAssets_psd
	this.Start = new lib.rest();
	this.Start.name = "Start";
	this.Start.setTransform(640.5,681,1,1,0,0,0,137.5,30);
	new cjs.ButtonHelper(this.Start, 0, 1, 2, false, new lib.rest(), 3);

	this.instance = new lib.Chrome();

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.Start}]}).to({state:[]},1).wait(299));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_Cat_Walking = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Cat_Walking
	this.instance = new lib.CatWalking("synched",0);
	this.instance.setTransform(-150,615,0.5584,0.5584,0,0,0,116.4,176.5);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(97).to({_off:false},0).to({regX:114.4,regY:306.4,scaleX:0.4462,scaleY:0.4462,x:1340,y:618.95,startPosition:10},202,cjs.Ease.none).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.PuppetShape_5 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.WarpedAsset_2("synched",0);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#006666").s().p("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");
	this.shape.setTransform(-1.225,-2.9893);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#006666").s().p("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");
	this.shape_1.setTransform(-1.225,-3.0197);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#006666").s().p("EA+YAKrQhIgNhig2QhVgwgxgkQhAgvgggmIBohVQAXAdAbAXIAzAoQApAdAqAXQArAYAVAFIACAAQAOADAEgHIAAgDQABgNgUgPQgZgSgugeQhDgqgrgjQgpghgbgyQgbgvASg3IAFgPQAOgfAhgUQAmgWA+AGQAbACAnANQAYAHAyAUQAzATAzAfQAvAdAiAkIhOB1QgZgbgVgQQgqghgsgSQgxgVgQAHQgFABgBAGQgCANASAOQAMAJAqAXQBBAmAfAYQAuAlAWAhQAcArABBFIABAKQAAAHgDAHQgFANgNARQgRAVgFAJQgLAUggACIgHAAQgWAAgmgHgEg/3AGFQgsjXgehTIChg2ICPB4QBUBGA9AtQA0jAAni9ICnhHQAlBjBBC0QBFDCAgBWIi9BQIgwh+QgchLgSg1IhAEGIhfAnQhqg2hbhcQAMBUAOAzQATBGAhAvQhKAghyAuQgvhpgojEgAIfEcQgejRgThgQBTgdA+gZQA5AoBUAvICRBSIgliCQgWhQgTgzIC3hXQAdBQBADKQA5CzAmBlIihBQQhmgtg5gcQhXgqg+gnQAXBtAzCcQgaANhMAiQhAAcgqAYQgoh7ggi/gAn8IwQghgNgkgcQgigbgOgZIBphkQAKAQAPANQAQAOAPAGQAdAMAWgLIgPkEIgOkEIC0BOQABAzAFBUQAHBoABAfIBUhiQAwg5AegrQBgApBBAUQg0BbhZBpQgfAkiLCVQhCBHhCAPQgVAFgWAAQguAAgzgUgEAz/AFrQhrg3gnhIQgYgsAEhDIABgNQACgUAGgTIAjhxIhGgiIAShEQALgqAJgZIBJAjIAnh8IDXBrQgRAogZBUIBoA1IgrCFIhog2IgSA4IgSA4QgHAUAIASQADAHAGAGQAJAJAKAFQAPAIAOADQAKACAMAAIADBMQACAsAAAeQg6gBhPgpgAthDfIAUg6Qg0A1hbgjQgvgSgfghQgeghgJglQgIglAJggIAEgMQAVg+A5gRQA+gQBhAoIBIAcQAHgwg1gcIglgPQgWgGgWgCQgigDgaAJIgWiPQAvgKA6AGQA5AGA3AWQB1AvApBPQAZAvgEA7QgCAlgOAqQgkBtguCBgAugAoIgBAEQgCAIABAFQACAJADAEQAHAPAUAIQASAIATgFQAKgDAEgCQAIgFADgEIAHgJIALgeIgsgSQgUgIgPAAQgYAAgHAXgEguXADrQhJgEg1glIgdgXQgfghgRgvQgRgyAGgxQADgSADgPQARhCA3g6QA0g2BXgkQBRggBRAFQBQAEAwAoIAXAVQAfAiAOA1QAMArgJA1IgDAOIgGAXQgUBAg2A3Qg1A2hNAeQhJAdhAAAIgOAAgEgtlgBvQgjAPgPAfQgPAfANApQANApAeAPQAdANAhgMIAEgBQAggOAPgfQAPgggNgpQgMgqgegOQgPgHgQAAQgQAAgRAHgAUmAEQgxiYgXhCIC+hbQAfBZAnCEIBADdQgqARiKBEQgbhNgtiNgAbnC1QAEgeAKguIAQhMQAeALApABQAiABAugLQAygMAWgfQAYghgHguIgBgJQgUAdgcATQgbASgqAOQg3ASg4gNQg1gLgpgiQgBAAAAAAQgBAAAAgBQgBAAAAAAQAAgBgBAAIgHgHQgmgjgOg+QgLgtADgoQAAgSAHgaQAQhAAug0QArgwBDgcQBuguA1A7IgMg9QAgAAA/gqQA4glApAKQAgCCAKB7IAQDIQAIBIgPA5QgNAwggAsQgcAnguAZQgmAUhEATQgqAMhOAGIgYABQgoAAgogLgAd5leQglAPgTAeQgSAeAIAhQAGAfAdAQQAcAOAhgLQAigNATgYQATgYgEgpQgEgkgfgRQgQgJgSAAQgOAAgPAGgEAqiAA6QAThVATiMQAGgpgMgYQgMgaghgNQglgPgcAOQgXAMgHA0QgEAegGBPQgFBEgGAkQgpgLg4gKIhfgSQAIg+gEhjIgLixQgMjfAnheQCjAxBXAdQgdB+gFBFQBOgXBaAjQBsArAwBIQAeAugBBEQAAATgJAvQgJAwgWBPQgbBdgIAjIjBhYgA1OApIhTgYIAHgkQgnAehWgPQg4gKgqgoQgpgmgYg5IgIgZIgDgNQgKg1AIgxQAIgzAcgvQAOgWAIgJQAXgdAWgQQAVgPAbgIQA0gQBDASQBOAWAfAzIAvjBQAyAPCSAuQgfBrg0DGQg3DWgaBbQgjgNgugNgA3mk5QgaARgIAtQgIAuAQAbQAQAcAeAHIAEABQAbAHAagRQAagQAKgsQAJgsgOgdQgQgdghgJQgKgDgKAAQgVAAgSANgEgmOgC1QgbiTgShQQAqgNA/gRIBsgbIAHAtQAagfArgZQAlgVA7gLQA1gKArAGQAmAFAoAUQA6AdgKA9QgCAOABAVQAAAYgBAKQgNCLgFCKIhaAHQg2AEgpAJIgCh3QgChHgEguQgDgpgQgQQgRgQghAHQgjAHgWAcQgUAaAGAxQAGA0ARClQiOAlgvAPQgPhFgciegATVkZQgpgKgPgoQgPgmAVgrQATgnAzgYQA0gYApAJQAqAJAQAmQARAmgWAsQgWApg1AaQgiAQggAAQgNAAgMgDg");
	this.shape_2.setTransform(-1.225,-3.0638);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#006666").s().p("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");
	this.shape_3.setTransform(-1.225,-3.125);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#006666").s().p("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");
	this.shape_4.setTransform(-1.225,-3.175);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#006666").s().p("Eg/0AFyQgrjWgehUICigzICNB5QBVBIA7AtQA3jJAoiyICnhEIBiEZQA/C5AiBhIi9BMIguh/QgbhMgRg1IhCEEIhfAmQhng3hchfQAMBUANAzQAUBHAfAwQhJAehzAsQgthpgnjEgEA+VAKXQhLgMhegzQhTgrgyglQhCgwgdgjQAzgqAygsQAWAZAdAZIAzAnQAmAaArAXQArAXAUAEIACAAQAOADADgHIACgDQAAgNgUgOQgUgPgxgfQhFgqgoggQgpgggcgxQgagvARg3IAFgOQAMgfAjgVQAlgXA+AFQAbABAnAMQAbAIAvASQA0ATAxAeQAvAbAjAkIhOB1QgWgZgYgRQgqgggsgSQgxgTgQAGQgFADgBAFQgCAMASAOQAIAGAuAaQBCAlAfAXQAsAhAWAjQAdArABBEIAAAKQAAAGgDAIQgEANgOARQgQAVgFAIQgMAUgfADIgLAAQgVAAgigGgAIhEOQgejRgRhgQBJgYBJgbQA6ApBSAxICQBUIgkiDQgVhQgSgzIC5hTQAbBQA9DMQA3CzAkBmIihBMQhmgvg4gdQhWgsg9goQAUBqAzCfQgaANhNAgQhAAbgpAWQgnh7gei+gAnyIwQgigMgkgbQgjgbgNgYIBnhmQAKAPAPAOQARANAPAGQAeALAUgMQgblagLitIC2BLQABAzAHBTQAIBpACAeIBThkQAug6AegrQBZAkBJAVQgzBbhXBrQgfAliICZQhBBJhAAQQgYAFgYAAQgsAAgxgSgEA0AAFoQhrg1gnhHQgYgrADhDIABgMQADgVAFgTIAihxIhGggIAShEQAKgqAJgaIBIAhIAmh8IDWBmQgQAogZBUIBoAzIgpCGIhog0IgRA5IgSA4QgGAUAHARQAEAIAGAFQAJAJAJAFQAOAGAPADQAMACAKAAIAEBMQADAsAAAeQg6AAhPgngAtdDnIATg6QgzA2hbgiQgwgRggghQgegfgJgmQgJgjAJgiIACgLQAWhAA5gQQA8gSBjAmIBIAbQAGgwg2gbIgSgIQgJgEgKgCQgTgGgZgBQgggCgcAJIgYiPQAwgMA6AGQA3AFA4AVQB2AtAqBNQAaAwgDA6QgBAlgOAqIhODwgAugAyIAAADQgBAIAAAFQACAJADAFQAIAOAUAIQASAHASgFQAKgDAFgDQAGgDAFgGQAGgGABgCIAKgfIgsgRQgTgHgOAAQgaAAgIAYgEguYADsQhJgFg0gmIgdgYQgfghgQgwQgQgyAGgxIAHghQARhBA3g5QA1g1BYgiQBQgfBRAHQBPAFAvApQALAJALANQAeAhAOA3QALArgIA1IgKAlQgVA+g2A3Qg2A1hNAcQhGAbg8AAIgTgBgEgtjgBsQgiANgQAfQgPAgANAoQAMApAdAQQAcAOAhgMIAFgBQAggOAPgdQAPgggMgpQgMgqgdgPQgQgHgRAAQgPAAgQAGgAUoAHQguiXgVhEIC+hWQAeBaAkCEIA9DeQgkAOg2AZIhbApQgZhMgsiPgAbnDDQAEgeALguIARhMQAdAMAqACQAmAAApgKQA0gMAVgeQAXgegFgwIgBgJQgUAdgcATQgcASgqAMQg3AQg3gMQg1gMgqgjIgDgCIgHgHQgmgkgNg/QgKgoADgsQABgQAHgcQARhAAugyQAsgvBCgaQBugrA0A7IgLg9QAfAAA+gnQA5gjApAKQAeB+AKB7QAGBEAJCDQAHBHgPA5QgNAwggAsQgcAmguAYQgnAVhEASQgdAHggAEIg7AGIgSAAQgrAAgsgMgAd+lMQglAOgTAeQgSAcAHAiQAGAfAdAQQAbAPAigLQAigMATgYQATgYgFgpQgCgjgfgRQgRgJgSAAQgOAAgOAFgEAqkABFQARhPAUiSQAFgpgLgYQgMgZghgMQglgOgbAOQgZANgFAzIgKBtQgGBFgFAkQgogLg5gJIhegQQAHg+gEhjIgKiwQgLjdAlhgQC2A0BBAVQgbB/gFBFQBNgZBZAhQBrAnAwBIQAeAtABBEQAAAQgJAyQgIAwgXBQQgZBdgHAjgA1OA5IhTgXIAHgkQgnAfhXgPQg4gKgqgmQgqgngYg5QgEgKgEgOIgCgNQgKg1AGgwQAIg0AcgvQANgTAJgMQAXgdAVgPQAVgQAbgJQA0gQBDARQBMAUAhAzIAtjBQA0AOCQAsQgfBtgwDFQg2DbgXBXQgjgMgwgNgA3pknQgZASgIAsQgHAvAPAbQAQAaAfAJIADAAQAcAHAagRQAagRAJgtQAJgrgPgdQgQgcghgJQgKgCgJAAQgVAAgTAMgEgmOgCpQgZiTgRhRQApgNA/gPIBsgZIAGAtQAagfArgYQAlgVA6gJQA1gKAqAHQAmAGAnAUQA5AegJA8QgCANABAVQAAAYgBALQgNCOgECGIhaAGQg3AEgpAIIgCh2QgBhHgEgvQgDgogQgRQgQgRghAHQgkAHgVAbQgVAaAGAxIAWDYQiQAkgtAOQgOhEgbifgATckXQgpgLgOgoQgPgnAWgpQAUgoAzgWQA1gXApAKQApAKAPAmQAQAogXAqQgVApg2AYQghAPgeAAQgPAAgNgEg");
	this.shape_5.setTransform(-1.25,-3.225);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#006666").s().p("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");
	this.shape_6.setTransform(-1.25,-3.325);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#006666").s().p("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");
	this.shape_7.setTransform(-1.225,-3.425);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#006666").s().p("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");
	this.shape_8.setTransform(-1.25,-3.525);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#006666").s().p("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");
	this.shape_9.setTransform(-1.25,-3.625);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#006666").s().p("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");
	this.shape_10.setTransform(-1.225,-3.75);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#006666").s().p("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");
	this.shape_11.setTransform(-1.2,-3.925);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#006666").s().p("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");
	this.shape_12.setTransform(-1.175,-4.075);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#006666").s().p("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");
	this.shape_13.setTransform(-1.125,-3.4983);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#006666").s().p("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");
	this.shape_14.setTransform(-1.125,-2.7488);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#006666").s().p("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");
	this.shape_15.setTransform(-1.075,-2.0639);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#006666").s().p("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");
	this.shape_16.setTransform(-1,-1.3744);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#006666").s().p("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");
	this.shape_17.setTransform(-0.975,-0.7155);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#006666").s().p("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");
	this.shape_18.setTransform(-0.95,-0.0597);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#006666").s().p("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");
	this.shape_19.setTransform(-0.9,0.4489);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#006666").s().p("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");
	this.shape_20.setTransform(-0.875,0.3621);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#006666").s().p("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");
	this.shape_21.setTransform(-0.7212,0.2977);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#006666").s().p("AlPHIQgogCgngNQgpgOgVgUIBGiCQAOANASAHQATAIARAAQAfACARgTIizniIDGAJQAcBWA7CoIBqj2IC0AHQhACbiME7QgoBag5AjQg0AfhHAAIgNAAgAcxGGQg7gMgtgbIA8iIQAcAUAqALQArAMAmgCQA4gBAbgaQAbgagBgwIgBgJQgqAzhVADQg9ADgzgbQgwgXgjgyIgDgDIgFgJQgcgvgBg8QgCgsAMgmQAEgQAMgXQAdg1A0gfQAygfA+gDQBhgEAsA9IgBg2IBcgEQA5gEAkABQAFBTABBvIACC9QACCFhJBHQhHBEiIAFIgWAAQg5AAgzgLgAe0hoQgjABgXAWQgWAWACAiQAAAgAYAUQAXAUAjgBQAjgCAWgVQAWgWgBggQAAgjgYgUQgWgTgfAAIgFABgEA7PAE5QhDgHg1gQQg7gSgjgYIA/h7QAYARAaALIAyAQQAfAJAjADQAgAEARgFIABAAQALgEACgHIAAgEQAAgLgRgGQgagIgegGQg7gMgogOQgogOgegiQgdggADg5IACgPQAFgjAZgdQAegiA4gSQA3gRBPAGQAzADA1AOQAyAMAkAWIg8B9QgbgQgVgIQgogPgvgEQgwgEgNAMQgDAEgBAGQAAALARAGQAKADAsAIQA6AMAnAOQAoAOAeAgQAdAhgCA7IgCAVQgHAfgWAcQgZAgg+ATQgoAMgzAAQgXAAgZgCgEg/BAAMQgJjQgGhcICngJIDVE0ICvlLICogKIAhJXIi5ALIgRkRIh4DkIhaAFQg/hYhPhyQAFCYAJBxIi6ALQgHhrgIjDgAI+gCIgHkvICkgHIDtEGIgKkSIDEgLIAaJWIimAKQi9jJg0g6QACA9AJDUQiEAIhDAFQgHh7gEizgEA0PAEUQhkgHgyg0QgjgjgJg7IgCgNQgCgSABgVIAGh3IhCgFQAEheADgvIBCAEIAGiDIDHAPIgICDIBjAIIgICNIhigHIgGB0QgCAVALAOQAFAFAGADQAIAFALABQAPABALgDQAIgCAKgFIAnCKQgkAQg3AAIgfgBgAsQEEIADg+QgkBEhjgEQg2gCgngWQglgUgUgjQgRgfAAgkIgBgIIABgFQAFhDA0ggQA3ggBqAGIBNADQgGgwg7gJIgUgCQgKgBgKABQgVABgXAGQggAIgZAQIg5iCQAqgXA5gMQA6gMA4ADQB8AGA+A7QAlAjAOA5QAIAmgCAqIgJD8gAuCBsIAAAEQABAJACADQACAGAGAGQALALAWABQAVABAQgKQAIgFAFgFQAGgHACgFIAFgLIABggIgwgDIgFAAQg1AAgCAlgEgu7ADmQg/gbgng3IgMgTIgHgMQgUgrgCgyQgDg1ATgsIANgdQAig6A8giQA9giBRgEQBPgFBBAdQBCAcAkA2QAJANAHAOQAVAqACA3QACAugRAuIgFANIgLAVQgiA6g8AhQg9AihPAEIgUABQhDAAg3gYgEgs7gBRQgiACgUAZQgVAZACAqQABAsAXAYQAWAWAhgBIAEAAQAggDAUgYQAVgZgCgtQgCgrgXgWQgVgVgdAAIgGAAgAU+jWIDCgLIASHTQhhAFhgAGgEAq7ADkIAGjoQAChRg7gDQgggCgWAWQgVAWgBAwIgDDcIjBgDQABhGgBj6QgCjIAFh3IDKAIQgEB3gBBVQA6gtBQAFQBaAEAzA3QAiAjALA9QAEAZgBApQgCBYgICyQh+gIhEgDgA2ODnIABgmQgqAthWgDQg9gBgzgfQgxgfgfg5IgPgkQgOgvABguQACg3ASgrIAPgfQAjg4AxgaQA0gdA/ADQBOADAnAqIAHjIIDCAJQgIDUgOGogA4NhMQgWAXgCAtQgBAqAVAZQAUAYAgADIAEAAQAfAAAWgXQAWgWACgsQABgtgVgYQgVgYghgCIgCAAQggAAgVAWgEgmRgDyIC9gFIAAAuQAbgbAmgPQAkgPAsgBQBYAAA3AzQAnAkAIA5QAFAjgBAfIgDEMQiAgBhAABIAAjpQgBhRg6ABQghABgUAXQgVAYABAuIACDdIjBAFIgKnUgAVHkZQgigagBgrQgCgrAfgdQAegeA1gDQA1gDAiAZQAhAYACArQACAsgeAfQgfAeg2ADIgKAAQgtAAgfgXg");
	this.shape_22.setTransform(-0.5463,0.2456);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#006666").s().p("AlLHEQgngBgngOQgqgNgUgTIBEiDQAPAMARAHQASAIASAAQAfABARgSIi4nhIDGAHIBaD9IBoj3IC1AFQhDCjiGE1QgnBbg5AjQgzAhhIAAIgNAAgAcuGPQg7gNgugbIA+iHQAbATArANQAqALAngBQA6gBAZgaQAbgZgBgwIAAgJQgrAzhVACQg8ACg0gbQgwgZgigxIgDgDIgFgJQgbgwgCg8QAAgqALgnQAFgSAMgVQAdg1A0geQA0geA8gCQBigDArA9IgBg2IBcgDQA5gCAkAAQAEBQABBxIACC8QABCFhJBGQhIBFiJADIgRAAQg8AAg1gMgAe1hdQgkABgWAVQgXAVABAjQABAgAYAUQAXAVAjgBQAigCAWgVQAXgVgBghQAAgjgYgTQgWgTgfAAIgEAAgEA7OAEvQhAgFg4gQQg7gRgjgXIA8h8QAWAQAdALIAaAJIAXAGQAfAIAjADQAhACAPgEIACgBQAKgEACgHIAAgEQAAgMgRgFQgQgFgogHQg7gKgngOQgogNgfghQgeggADg5IACgPQAEgjAageQAdgjA3gSQA1gSBQAEQA3ADAxAMQA1ANAiAUIg6B/QgYgPgZgJQgngPgvgDQgxgDgMANQgEAFAAAEQgBALASAGQAMAEAqAIQA3AHAqAPQApANAdAgQAdAggBA7IgCAVQgGAfgWAcQgaAig8ATQgrAOg6AAIgkgBgEg+/AAAIgLktICmgHIDRE3IC0lIICngHIAZJXIi5AJIgNkSIh7DiIhaAEQhChfhJhuQAFCgAGBpIi6AIIgLksgAI+gLIgFkuICkgGIDsEJIgIkRIDFgJIATJYIimAHQihiwhNhXIAIERQiEAGhDAEQgEh5gEi1gEA0PAETQhjgGg0gyQgjgjgKg6IgCgNQgCgTABgVIAEh2IhBgEIAEiOIBCAEIAFiDIDGALIgGCDIBiAFIgGCOIhigFIgEB0QgBAWALANQAEAFAHADQAJAFAJAAQAOABAMgDQAKgDAIgFIApCJQgnATg6AAIgYgBgAsNEFIABg9QgjBEhjgDQg1gCgpgVQgmgVgTghQgRgfgBglIAAgMQAEhDA0ggQA2ghBrAEIBOADQgHgwg7gJIgUgBQgKgBgKABQgWABgXAGQghAJgXAQIg6iCQAqgXA5gMQA5gNA4ACQB8AFA/A5QAmAkAOA4QAJAkgCAsIgHD8gAuBBvIAAADQABAJACAEQADAHAFAEQALALAWABQAVABAQgLQAIgFAEgFQAFgFAEgHQAEgHAAgDIACghIgxgCIgEAAQg2AAgBAmgEgu+ADoQg+gcgmg3IgTggQgUgsgBgwQgDg0AUgtIAOgdQAig6A8ggQA/giBPgDQBPgDBBAdQBAAdAkA2QAKAQAGAMQAVApABA2QACAxgRAtIgRAhQgiA5g9AhQg+AihOADIgNAAQhIAAg5gagEgs6gBNQgjACgUAYQgVAZACArQABAsAWAXQAVAXAhAAIAEAAQAggCAVgZQAVgZgCgsQgBgrgWgXQgVgWgfAAIgEAAgAVAjUIDCgIIAOHUIjBAIgA4ND1Qg/gBgxgfQgygfgfg4IgLgYIgEgMQgOgsAAgxQACg3ASgrQAGgQAIgOQAhg4AzgcQA0gcA+ACQBPACAnAqIAFjIIDCAGIgQJ8Ii4gFIABgnQgoAshTAAIgFAAgA4QhCQgVAYgBAqQgCAsAVAZQAVAYAgACIAEAAQAfAAAWgXQAXgXAAgtQABgrgVgYQgVgYghgBIgEAAQgeAAgWAWgEAq7ADtIAEjqQAChPg7gCQgggCgVAXQgWAXAAAuIgCDdIjBgDIgBk/QgBjGAEh5IDIAGQgEByAABaQA6gtBPADQBYAEA0A2QAjAkAKA8QAFAbgBAmQgBBYgGCygEgmRgDoIC8gEIABAuQAZgbAngPQAjgOAtgBQBXgBA3A0QAlAkAJA5QAFAhAAAhIgDELIjAABIAAjqQAAhQg7AAQggABgVAXQgUAXAAAvIACDdIjBAEIgInUgAVKkWQghgbgCgrQgBgrAfgdQAggdA0gCQA1gCAhAZQAhAZABAqQADAsggAfQgfAeg1ACIgHAAQgvAAgggYg");
	this.shape_23.setTransform(-0.3734,0.2253);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#006666").s().p("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");
	this.shape_24.setTransform(-0.2484,0.1989);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#006666").s().p("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");
	this.shape_25.setTransform(-0.1234,0.1511);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#006666").s().p("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");
	this.shape_26.setTransform(-0.05,0.1758);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#006666").s().p("AmPGtQgngLgXgTIBBiGQAOAMASAGQATAIARAAQAgAAAQgTIjEnbIDIABIBgD6IBjj6IC3ABIjCHdQgkBcg4AlQg3AlhQAAQgmAAgqgNgAclGmQg9gPgrgcIBBiFQAcAUAqAOQArANAmgBQA5ABAbgaQAbgZAAgwIAAgJQgsAzhVAAQg8AAg0gbQgxgbgggyIgDgDIgFgJQgZgwgBg+QAAgrANglQAGgUAMgSQAeg0A0gcQA0gbA9gCQBhAAAqA+IgBg1IC6gBIABF4QAACHhLBDQhJBEiKAAQhKAAg6gPgAd7gsQgWAVAAAgQAAAiAXAVQAYAVAigBQAiAAAXgVQAWgUAAgiQAAgigWgTQgYgVghAAQgjAAgYAVgEA5SAEIQg4gMgmgXIA2h/QAXAPAcAJIAaAHIAYAFQAeAHAiABQAgAAAPgGIABAAQAKgGACgGIAAgEQAAgMgRgEQgSgFglgEQg1gGgtgMQgngLgggfQgegfAAg5IABgQQAEgiAXggQAdgkA1gUQA2gWBOABQAxAAA3ALQA1AKAjATIg3CAQgZgPgYgHQgrgOgrAAQgxgBgLAOQgEAFAAAFQAAALARAEQANAFApAEQA6AIAoAMQApAKAdAfQAeAeAAA7IAAAIIgBAMQgGAhgUAbQgbAig5AWQg1AVhQAAQg+gBg5gNgEA0OAESQhjAAg1gwQgkgigMg6IgCgNQgCgUAAgTIAAh3IhAAAIAAiOIBBAAIABiDIDCABIgBCEIBhABIgBCOIhggBIgBB1QAAAUALANQAFAFAGADQALAFAIAAQAPAAALgFQAJgCAIgGIAuCHQgrAYhHAAIgGAAgAvsD8QgngTgUgiQgTgegBglIgBgHIABgFQAChCAzgjQA4giBqABIBOAAQgJgwg7gGIgUgBIgUABQgSABgaAHQghAKgXARIg+iAQAogYA6gPQA4gOA6AAQB7ABBCA4QAnAhAPA4QAKAmAAAqIgBD9Ii0gBIAAg+QgiBGhjAAQg4AAgngUgAuBB2IABADQABAIACAEQADAGAFAGQANAKAVAAQAVAAAQgKQAHgFAFgGIAIgNQAEgGABgEQgBgVABgMIgwAAQg7AAgBAogEgvGADwQg8gdglg5IgSghQgSgsAAgxQAAg1AUgsQAJgTAGgJQAkg4A9gfQBAggBNABQBOgBBAAfQA+AeAjA4IAPAcQAUArAAA1QABAxgSAtIgRAgQgjA5g+AeQg+AghPABQhPAAg/gfgEgs6gBAQghAAgWAYQgVAYAAArQAAAsAWAYQAUAXAhACIAEAAQAggCAVgYQAVgYAAgsQAAgrgVgYQgXgXgfAAIgCAAgA4NENQg+AAg0geQgygcghg5IgPgkQgPgsAAgyQAAg0ARgsQAHgSAHgNQAgg3AzgdQA0geA+AAQBPABAoAoIABjHIDCABIgCJ8Ii5gBIAAgnQgpAvhUAAIgDAAgA4WgpQgVAXAAArQAAAtAVAXQAVAYAgACIAEAAQAggCAVgXQAWgYAAgtQAAgrgVgXQgWgYghAAIgCAAQggAAgWAYgAI/lNICmgBIDmERIgBkSIDFgBIACJZIimAAIjmkOIABEPIjGACIgBpZgEg+8gFMICmgCIDGFBIC+lDICngBIAEJZIi5ABIgDkQIiCDaIhZABIiEjSIACEJIi6ABgAVGjMIDCgBIABHUIjCABgEAq7AEGIAAjqQABhPg6gBQghAAgUAWQgVAYAAAuIAADeIjCgBIAAp9IDDABIAADOQA3gvBOABQBWAAA1A0QAjAkAMA6QAGAbAAAmIgBELgEgmRgDQIC5gBIABAuQAZgaAmgOQAjgOAsgBQBXAAA0A0QAjAkAMA5QAGAbAAAnIAAELIjCAAIAAjrQAAhPg6AAQghAAgUAXQgUAXAAAvIAADdIjCABgAVSkPQghgcAAgqQAAgsAggbQAggcA1AAQA2AAAfAZQAgAaAAArQAAAtgfAcQgfAdg2ABQg0AAghgcg");
	this.shape_27.setTransform(0.025,0.15);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#006666").s().p("AmOGsQgpgMgWgTIBBiFQANAMAUAHQATAHARAAQAfAAAQgTIjEnbIDHAAIBhD6IBjj6IC3AAIjBHeQglBcg3AlQg3AlhQAAQglAAgrgMgAclGpQg8gPgtgdIBBiEQAdAVApAMQArANAmAAQA6AAAbgZQAcgZgBgwIAAgIQgtAyhVAAQg9AAgzgcQgwgbghgyIgDgDIgEgJQgbgyAAg8QAAgoANgoQAGgQAMgWQAfgzA1gcQAzgcA9AAQBgAAArA+IAAg1IC5AAIAAF3QAACGhKBDQhKBEiLAAQhHAAg7gPgAd7gpQgXAUABAhQAAAhAWAVQAYAVAjAAQAiAAAWgVQAXgUAAgiQAAgigXgTQgXgVghAAQgkAAgXAVgEA5SAEGQg7gNgkgVIA1iAQAXAOAdAJIAaAIIAYAFQAbAFAkABQAiAAANgFIABgBQAKgEACgIIAAgEQAAgLgRgEQgRgFgmgEQg5gGgpgMQgmgKggggQgfgeAAg5IABgPQAEgkAXgeQAbglA2gVQA2gVBOAAQA0AAA1AKQAzAKAjASIg1CBQgXgOgagIQgrgNgsAAQgxAAgKANQgFAFAAAFQAAAKASAGQAOADAoAFQA2AHAsAMQApALAeAdQAdAfAAA6IAAAIIgBANQgGAggUAbQgZAig6AXQg2AWhPAAQg8AAg6gNgEAx2ADiQglghgLg6IgDgNQgDgZAAgOIABh3IhBAAIAAiOIBBAAIAAiEIDCABIAACDIBgAAIAACOIhgAAIAAB1QAAAVALANQAGAGAFACQAJAEAKAAQAPAAAKgEQAKgDAIgGIAuCHQgsAZhLAAQhiAAg2gwgAvsD9QgmgTgWgiQgRgegCgkIgBgIIAAgFQAChCA0gjQA2giBrAAIBPAAQgJgwg8gGIgTgBIgUABQgXACgWAHQggAJgYASIg+iAQAogZA6gOQA7gPA2AAQB9ABBBA3QAnAhAQA5QAKAlAAArIgBD8Ii0AAIAAg9QgiBFhjAAQg3AAgogTgAuAB2IAAADQAAAIADAFQAEAHAEAEQALAKAXAAQAUABARgLQAGgEAGgHQAGgGACgGIAFgLIAAggIgxgBQg6AAAAAogA5/DyQg0gdgfg5QgGgJgFgOIgFgNQgPgrAAgyQAAgzARgtIAPgfQAeg2A0gfQA1geA9ABQBPAAApApIAAjIIDBAAIAAJ8Ii5AAIAAgmQgqAvhXAAQg9AAg0gegA4XgnQgVAXAAArQAAAtAVAYQAVAXAhACIAEAAQAggCAVgXQAWgYAAgsQAAgrgWgYQgVgYgiAAQghAAgXAYgEgvGADxQg+gegjg5IgNgVIgFgMQgTguABgvQAAg2AUgrIAPgcQAjg4A+geQA/gfBOAAQBOAABAAeQA/AfAiA4IAPAcQAUArAAA1QAAAxgRAsIgHANIgLAUQgjA5g+AeQg+AghQAAQhOAAg+gfgEgtxgAnQgVAYAAArQAAAsAVAYQAVAXAgACIAEAAQAhgCAUgXQAWgZAAgsQAAgrgWgXQgVgYgiAAQghAAgWAYgAI/lPICmgBIDlESIAAkSIDGAAIAAJZIimAAIjkkQIAAEQIjGAAgEAq7AEIIAAjqQAAhPg7gBQggAAgUAXQgVAYAAAuIAADdIjBAAIAAp8IDCAAIgBDNQA4guBOAAQBXABA0A0QAjAjAMA6QAGAbgBAmIAAELgAVGjMIDCAAIAAHUIjBABgEg+7AEIIAApYICnAAIDEFAIC/lBICnAAIACJZIi4AAIgDkRIiDDbIhZAAIiCjSIAAEIgEghMAEHIAAjrQAAhPg6AAQggAAgVAXQgUAXAAAvIAADdIjCAAIAAnVIC5AAIAAAuQAagaAlgPQAlgOAqAAQBXAAA0A1QAkAjALA6QAGAdAAAkIAAELgAVSkOQgggcAAgrQAAgrAggcQAggbA1AAQA2AAAgAaQAfAbAAAqQAAAsgfAdQggAdg2AAQg0AAghgcg");
	this.shape_28.setTransform(0.1,0.175);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_12}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_14}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_16}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_18}]},1).to({state:[{t:this.shape_19}]},1).to({state:[{t:this.shape_20}]},1).to({state:[{t:this.shape_21}]},1).to({state:[{t:this.shape_22}]},1).to({state:[{t:this.shape_23}]},1).to({state:[{t:this.shape_24}]},1).to({state:[{t:this.shape_25}]},1).to({state:[{t:this.shape_26}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_28}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-417.6,-72.6,832.8,139.2);


(lib.PuppetShape_3 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.WarpedAsset_2("synched",0);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#006666").s().p("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");
	this.shape.setTransform(-17.25,-34.9694);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.shape}]},1).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-453.9,-133.8,873.3,197.70000000000002);


(lib.PuppetShape_2 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.WarpedAsset_2("synched",0);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#006666").s().p("AmPGtQgngLgXgTIBBiGQAOAMASAGQATAIARAAQAgAAAQgTIjEnbIDIABIBgD6IBjj6IC3ABIjCHdQgkBcg4AlQg3AlhQAAQgmAAgqgNgAclGmQg9gPgrgcIBBiFQAcAUAqAOQArANAmgBQA5ABAbgaQAbgZAAgwIAAgJQgsAzhVAAQg8AAg0gbQgxgbgggyIgDgDIgFgJQgZgwgBg+QAAgrANglQAGgUAMgSQAeg0A0gcQA0gbA9gCQBhAAAqA+IgBg1IC6gBIABF4QAACHhLBDQhJBEiKAAQhKAAg6gPgAd7gsQgWAVAAAgQAAAiAXAVQAYAVAigBQAiAAAXgVQAWgUAAgiQAAgigWgTQgYgVghAAQgjAAgYAVgEA5SAEIQg4gMgmgXIA2h/QAXAPAcAJIAaAHIAYAFQAeAHAiABQAgAAAPgGIABAAQAKgGACgGIAAgEQAAgMgRgEQgSgFglgEQg1gGgtgMQgngLgggfQgegfAAg5IABgQQAEgiAXggQAdgkA1gUQA2gWBOABQAxAAA3ALQA1AKAjATIg3CAQgZgPgYgHQgrgOgrAAQgxgBgLAOQgEAFAAAFQAAALARAEQANAFApAEQA6AIAoAMQApAKAdAfQAeAeAAA7IAAAIIgBAMQgGAhgUAbQgbAig5AWQg1AVhQAAQg+gBg5gNgEA0OAESQhjAAg1gwQgkgigMg6IgCgNQgCgUAAgTIAAh3IhAAAIAAiOIBBAAIABiDIDCABIgBCEIBhABIgBCOIhggBIgBB1QAAAUALANQAFAFAGADQALAFAIAAQAPAAALgFQAJgCAIgGIAuCHQgrAYhHAAIgGAAgAvsD8QgngTgUgiQgTgegBglIgBgHIABgFQAChCAzgjQA4giBqABIBOAAQgJgwg7gGIgUgBIgUABQgSABgaAHQghAKgXARIg+iAQAogYA6gPQA4gOA6AAQB7ABBCA4QAnAhAPA4QAKAmAAAqIgBD9Ii0gBIAAg+QgiBGhjAAQg4AAgngUgAuBB2IABADQABAIACAEQADAGAFAGQANAKAVAAQAVAAAQgKQAHgFAFgGIAIgNQAEgGABgEQgBgVABgMIgwAAQg7AAgBAogEgvGADwQg8gdglg5IgSghQgSgsAAgxQAAg1AUgsQAJgTAGgJQAkg4A9gfQBAggBNABQBOgBBAAfQA+AeAjA4IAPAcQAUArAAA1QABAxgSAtIgRAgQgjA5g+AeQg+AghPABQhPAAg/gfgEgtxgAoQgVAYAAArQAAAsAWAYQAUAXAhACIAEAAQAggCAVgYQAVgYAAgsQAAgrgVgYQgXgXghAAQghAAgWAYgA4NENQg+AAg0geQgygcghg5IgPgkQgPgsAAgyQAAg0ARgsQAHgSAHgNQAgg3AzgdQA0geA+AAQBPABAoAoIABjHIDCABIgCJ8Ii5gBIAAgnQgpAvhUAAIgDAAgA4WgpQgVAXAAArQAAAtAVAXQAVAYAgACIAEAAQAggCAVgXQAWgYAAgtQAAgrgVgXQgWgYghAAIgCAAQggAAgWAYgAI/lNICmgBIDmERIgBkSIDFgBIACJZIimAAIjmkOIABEPIjGACIgBpZgEg+8gFMICmgCIDGFBIC+lDICngBIAEJZIi5ABIgDkQIiCDaIhZABIiEjSIACEJIi6ABgAVGjMIDCgBIABHUIjCABgEAq7AEGIAAjqQABhPg6gBQghAAgUAWQgVAYAAAuIAADeIjCgBIAAp9IDDABIAADOQA3gvBOABQBWAAA1A0QAjAkAMA6QAGAbAAAmIgBELgEgmRgDQIC5gBIABAuQAZgaAmgOQAjgOAsgBQBXAAA0A0QAjAkAMA5QAGAbAAAnIAAELIjCAAIAAjrQAAhPg6AAQghAAgUAXQgUAXAAAvIAADdIjCABgAVSkPQghgcAAgqQAAgsAggbQAggcA1AAQA2AAAfAZQAgAaAAArQAAAtgfAcQgfAdg2ABQg0AAghgcg");
	this.shape.setTransform(0.025,0.15);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.shape}]},1).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-402.9,-44,805.9,88.3);


(lib.PuppetShape_1 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.WarpedAsset_2("synched",0);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#006666").s().p("AmFG1QgpgMgWgSIA/iGQAPAMATAGQATAHARAAQAggBAPgTIjKnYIDIgCIBjD5IBhj7IC3gCIi8HgQgkBcg3AmQg4AlhPABIgDAAQglAAgogLgAcsGgQg6gPgtgcIBBiFQAcAVApAMQArANAmAAQA6AAAbgZQAcgZgBgwIAAgIQgtAyhUAAQg9AAg0gcQgvgagigzIgCgDIgFgJQgagxAAg9QAAgoANgoQAFgQANgWQAegzA1gdQA0gcA9AAQBhAAAqA+IABg1IC6AAIgDF4QAACGhLBEQhKBDiJAAQhHAAg9gPgAeEgzQgXAVAAAhQAAAhAXAVQAYAVAiAAQAjAAAWgVQAWgUABgiQAAgigWgUQgYgUghAAQgkAAgXAUgA58EEQgzgcggg5IgQgkQgPgsABgxQAAg2ARgrIAOgeQAfg3A0geQA0geA9AAQBPAAApAoIgBjIIDCgBIACJ9Ii6ABIAAgnQgrAwhWAAQg+AAg0gegA4TgVQgVAXAAAsQAAAtAVAXQAVAXAhACIAEAAQAhgCAUgXQAVgYAAgtQAAgsgVgWQgWgYghAAQgiAAgWAYgAvmEMQgogTgUghQgTgegBglIgBgMQAChDAzgjQA2gjBsAAIBOgBQgJgvg8gGIgTgBIgVABQgTACgZAHQghALgXARIg/iAQAogZA6gOQA7gQA3AAQB8gBBBA3QAnAgARA5QAKAkABAsIACD8Ii1ACIgBg+QgiBHhjABQg3AAgogTgAtBBcQg7AAAAAoIABAEQABAIACAEQAEAHAFAEQAMAKAWAAQAUAAARgLQAIgGAEgFQAFgGACgGIAFgLIAAgggEA7NAEaQg/gBg3gNQg6gOgkgWIA3h/QAYAPAbAJIAaAIIAXAFQAeAHAiABQAiAAAMgFIACgBQAKgEACgIIAAgDQAAgMgRgEQgVgGghgEQg4gHgqgMQgngLgfggQgegeAAg5QAAgIACgIQADgiAYgfQAdglA2gUQA1gUBPAAQA0ABAzALQA0ALAjATIg3CAQgZgPgYgIQgqgOgsAAQgxgBgLANQgEAFAAAEQAAALARAGQALADArAGQA2AHAsANQAnALAeAfQAeAegBA7IgCAUQgGAhgUAaQgbAjg5AWQgyAThLAAIgIAAgEghLAEXIACjqQABhPg7gBQggAAgVAWQgUAWgBAwIgCDdIjDgCIAGnVIC5ADIgBAuQAbgbAlgOQAlgNAqAAQBXABAzA1QAkAjALA6QAGAegBAiIgBEMgEgs9AEWQhPgCg+ggQg8gfgjg5IgMgVIgFgNQgRgsAAgxQACg2AVgqQAIgRAHgLQAlg3A+geQBAgeBNACQBPABA+AgQA+AgAiA4QAJAPAGANQAUAsgBA1QgBAxgSAsIgGAMQgGAMgGAJQgkA3g/AeQg8AdhLAAIgIAAgEgtvgAiQgVAYgBAqQgBAsAVAZQAUAYAhACIAEAAQAggBAWgXQAWgYAAgsQAAgrgUgYQgWgYghgBIgCAAQggAAgWAXgEA0UAETQhjgBg0gwQglghgLg7IgCgMQgCgVAAgTIABh3IhAgBIABiOIBBABIACiDIDCACIgCCEIBhABIgCCOIhhgBIgBB1QAAAWALALQAEAGAHADQALAEAHAAQAOAAAMgEQAGgCAMgGIAsCHQgqAXhFAAIgIAAgAJDlRICngCIDnERIgCkSIDGgCIADJYIimACIjnkOIACEQIjGABgEArCAEDIACjqQABhPg6gBQghAAgUAWQgVAYAAAuIgCDdIjCgBIAFp9IDCACIgBDNQA3guBOABQBWABA1A1QAiAkAMA6QAGAcgBAlIgDELgEg2mAEBIAEkQIiIDXIhagCIh+jUIgGEHIi5gEIAOpYICnAEIC9FFIDGk9ICnAEIgLJYgAVNjTIDCgBIACHUIjCABgAVZkVQgggbgBgsQAAgrAggcQAggcA1AAQA2AAAgAaQAgAaAAAqQABAsggAeQghAdg1AAIgEAAQgxAAgggbg");
	this.shape.setTransform(-0.4234,-0.5744);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#006666").s().p("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");
	this.shape_1.setTransform(-0.9213,-1.296);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#006666").s().p("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");
	this.shape_2.setTransform(-1.4109,-2.0179);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#006666").s().p("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");
	this.shape_3.setTransform(-1.9352,-2.7175);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#006666").s().p("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");
	this.shape_4.setTransform(-2.225,-3.4376);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#006666").s().p("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");
	this.shape_5.setTransform(-2.525,-4.1612);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#006666").s().p("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");
	this.shape_6.setTransform(-2.825,-4.9004);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#006666").s().p("AlYHxQgrgKgXgQIA5iJQAPAKAUAFQATAFARgBQAhgDAOgUIjlnJIDJgQIBxDyIBUkCIC4gPIijHtQggBfg0ApQg1AphRAGIgVABQgdAAgfgGgA50F5Qgzgdggg5IgLgXIgFgNQgMgmABg2QABg4ATgoQALgWAFgHQAmg7AsgaQA2ggA6AAQBOgDApApIgEjJIC/gHIAJE/IAIE/IjAAGIAAgnQgtAyhXAAQhBAAg2gdgA3NBGQgiABgVAYQgVAYgCAsQgBAtAXAXQAVAXAhABIAEAAQAigDAUgXQAVgZABgtQgCgsgVgXQgWgWggAAIgBAAgA/vGDQg8gDgpgDIAQjpQAEhQg6gFQghgDgWAWQgXAVgDAwIgQDcQiXgNgzgFQAbk4APiaQA+AHB8ALIgFAtQAegYAmgLQAmgLApADQBXAIAyA3QAiAjAJA5QAEAegCAjIgMEJIhmgFgAvMFuQgngQgXghQgVgegCgkIgBgHIAAgFQAAhEAygkQA1gnBtgGIBOgFQgLgvg7gCIgVAAIgUACQgSADgbAJQgfALgYATIhCh8QAngaA4gSQA7gSA2gDQB8gIBEAyQArAgASA1QANAmACApIAOD8Ii3AOIgEg+QgfBJhkAGIgRAAQgtAAglgOgAsrC2Qg7ADABAoIABAEQABAIADAEQAFAHAEADQANAKAWgCQAVAAAQgNQAHgGAEgFQAFgIADgFIACgGIABgFIgBghgAdeFbQg6gOgugcIBBiGQAcAUApAMQAqAMAnAAQA4AAAcgZQAcgZAAgwIAAgJQgsAxhWACQg8ABgzgcQgwgZgigxIgDgDIgEgJQgcguAAg/QAAgrAMgmQAHgTALgUQAgg2A1gdQA4gfA9AAQBpgDAnBAIADg2IBiAAQA+gBAkADQgJBXgFBqIgIC7QgFCHhLBDQhIBCiIABQhGAAg8gOgAfziRQglABgXAVQgYAUABAjQgBAhAYAVQAXAVAjgBQAjgBAXgUQAXgVABgiQACgigXgVQgYgUghAAIgCAAgEA7lAFRQg9gHg2gUQg3gTgjgaIBCh5QAXARAaAMIAYALIAYAIQAfAKAfAEQAgAEAOgDIACgBQALgDACgIIABgDQAAgMgQgGQgVgIgggIQg3gNgngQQgngQgcgjQgaghAFg5IADgPQAIgiAagdQAgghA4gPQA3gOBOAJQA0AGAyAQQAzAQAhAXIhEB5QgVgQgZgLQgogRgtgGQgwgGgNAMQgEAEAAAEQgBAMAQAGQAMAFApAKQAxAMAuASQAmAQAbAiQAbAhgIA7IgBAIIgCANQgJAggXAYQgeAgg7APQghAJgpAAQgcAAgggEgEgtdAE3QhRgKg9goQg5gmgeg+IgKgWIgDgNQgNgvAGgwQAIg1AbgnQAIgNAKgNQAsgyBBgWQBDgWBPAKQBRALA5AlQA6AmAdA8QAGAKAHASQAQAtgGA2QgFAxgWAqIgWAfQgqAzhDAXQguAQg2AAQgYAAgZgDgEgtvgAEQgZAUgGArQgFAsATAbQASAaAhAFIAEABQAhADAYgVQAZgWAFgrQAFgsgTgaQgTgZgigFIgMgBQgaAAgUASgEA0xAEcQhggLgxg1QghglgFg7IgBgMQgBgQABgYIALh3Ig/gGIAMiNIBBAGIAMiCIDDAVIgNCDIBgALIgPCNIhfgLIgNB0QgCAVAKAOQAFAGAGADQAKAFAIABQANACAMgDQAJgCAKgEIAgCLQgiANguAAQgTAAgWgCgAJPlXICqgMID3EBIgNkRIDKgMIAbJWIioALIj2j/IAPEPIjKAPQgMkOgUlKgEg3TADSIAnkNQg3BBhwCBIhcgQQgwhogwh8QgkCkgJBfIi7gfQAPhuAmi6QAqjUAOhUICkAeICNFdQBSheChi/IClAaIhVJRgEArpADYIARjoQAGhRg5gEQgggDgXAVQgWAVgDAxIgODaIi/gLQAFh8ANjCIATlAIDFAPIgODNQA7gqBOAGQBYAJAwA4QAfAlAIA8QADAdgDAlQgHBYgPCxIi/gRgAVvkGIDHgLQAGCbAFE4IhhAEIhhAFgAV5lJQgjgZgCgrQgCgsAggdQAggdA1gCQA5gDAhAYQAiAZACAqQADAsghAeQgeAfg5ADIgJAAQgvAAgfgYg");
	this.shape_7.setTransform(-3.1,-5.6022);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#006666").s().p("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");
	this.shape_8.setTransform(-3.4,-6.3008);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#006666").s().p("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");
	this.shape_9.setTransform(-3.725,-7.0363);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#006666").s().p("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");
	this.shape_10.setTransform(-4,-7.7226);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#006666").s().p("AlDISQgrgIgYgPIA1iMQAPAKAUAEQAUAFARgCQAggEAOgUIjynBIDIgXIB6DtIBMkFIC6gWIiXH0QgdBgg0ArQg0AqhQAJQgPACgQAAQgZAAgagEgA5yG6Qg1gcggg6IgKgXIgFgNQgMglACg2QADg7AUgkIAQgdQAYghAOgPQAVgXAXgOQA2ggA5gBQBOgDApAmIgGjIIC+gKQAGB4AHDHIALE+IhhAGIhiADIABgmQgwAzhXAAQhDgBg1gcgA3ICHQgjABgUAZQgVAZgCArQgCAsAWAXQAWAXAhABIAEAAQAjgDAUgYQAVgZAAgsQgBgugVgVQgWgWggAAIgBAAgEghdAG0IAWjoQAJhPg8gHQghgFgYAVQgYAUgFAwIgYDbQiOgSg/gKQAok2AXiZQA+AKB7ARIgFAsQAegVAngKQAogJAoAFQBXALAyA4QAiAnAGA2QAEAfgDAhIgLCEIgJCDQixgOgdgDgAvAGlQgpgPgYggQgUgdgEgkIgBgIIAAgFQgBhDAygmQA0goBtgKIBPgIQgLgug9gBIgUABIgUADQgWAEgXAJQghANgVATIhGh7QAngaA4gTQA6gTA3gGQB8gMBFAwQArAcAUA2QAOAlADAqIAVD7Qh9APg8AFIgEg9QgfBKhlAJIgZABQgqAAgggMgAsiDoQg7AGACAnIAAAEIAEAMQAGAHAEADQANAJAWgCQAVgCAQgNQAHgFAFgGQAFgJACgFIADgLIgCgggEA7wAFxQg/gMgzgWQg4gYgfgbIBJh1QAVATAZAOIAZAMIAWAJQAhANAdAFQAfAHAQgDIABAAQAKgDAEgHIAAgEQACgLgQgIQgMgFgogOQg6gSgkgRQglgSgaglQgZgiAJg6IADgOQAKgjAcgaQAhgfA4gLQA5gMBNAOQA0AJAxATQAzAUAeAYIhJB1QgXgTgWgLQgogUgrgIQgwgJgNALQgFADgBAFQgCALARAJQALAFAoANQA6ASAkARQAlASAZAkQAZAkgKA6IgBAIQgBAEgDAIQgKAfgYAYQggAeg8AMQgYAFgdAAQglAAgsgJgEgt1AFGQhQgOg9gtQg4gpgbhAIgIgXIgEgNQgJgxAJguQALg0AegnIAUgYQAwgvBDgSQBGgRBNAOQBSARA2AoQA3AnAdA+QAGAMAFASQAOAsgIA4QgIAwgYApIgIALIgPASQgvAyhEATQgmAKgrAAQgjAAgmgHgEgt2AAJQgZATgJAsQgHArARAcQARAbAhAHIAEABQAiAFAZgTQAagUAIgrQAHgtgRgaQgTgcghgFQgJgBgIAAQgYAAgUANgAd4E1Qg5gMgugcQANgeAzhqQAbAUAqAMQArAMAmgBQA3AAAcgZQAcgZABgwIAAgIQgtAwhVACQg7ABg1gbQgwgZgigwIgDgDIgFgJQgcgtAAg/QAAgtAMglQAGgRAMgWQAfg2A3gfQA4gfA/gCQA1gCAlAPQAmAQATAfIAEg2IBlAAQBBgCAjAEQgNBagIBqQgEA9gHB/QgHCIhLBCQhIBBiHABIgFAAQg+AAg+gNgEAgPgC6QglABgZAWQgXAVAAAjQgBAgAYAWQAXAVAkgBQAkgCAWgUQAXgUACgkQADghgYgWQgXgUggAAIgEAAgEA1AAEiQhggRgug4QgeglgEg8IAAgNQAAgWACgRIARh2IhAgKIATiNIBBAKIASiBIDEAgQgLA8gJBGIBgAQIgWCNIhggRIgRB0QgDAVAJAOQAFAGAFAEQAHAFAKACQAPACALgCIATgFIAYCNQgbAJgjAAQgbAAgfgFgAJTlZICsgSQBCA/C/C7IgVkRIDNgTQAPDIAZGNIipAQIj+j2IAVEOIjLAWQgPjjghl0gEg3wAC2IA6kJQg9A9h7B2IhcgWQgthsgjh/QgaBQgNAvQgTBEgIA6Ii7grQAWhtA4i4QA+jOAUhTICiAqQBYEbAaBNQBjhfCnisIClAmIh+JKgEAr+AC/IAZjmQAJhQg5gIQghgEgXAVQgWAUgFAwIgVDZIi9gPQAHiBASi+IAelAIDGAXIgVDMQA+goBNAKQBYAMAuA7QAfAnAEA8QACAdgEAlIgRCDIgQCFIi9gbgAV/khIDKgQQAICZAJE5IjCAOgAWHlkQgjgZgDgqQgDgrAggeQAggfA2gDQA5gEAjAXQAjAYADApQADAsgfAfQghAgg3AEIgQABQgsAAgfgWg");
	this.shape_11.setTransform(-4.325,-8.587);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#006666").s().p("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");
	this.shape_12.setTransform(-4.575,-9.683);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#006666").s().p("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");
	this.shape_13.setTransform(-4.9,-10.7413);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#006666").s().p("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");
	this.shape_14.setTransform(-5.225,-11.806);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#006666").s().p("AkwI/QgqgGgagOIAyiOQAPAJAUAEQAXAEAPgCQAggFAOgVIkAm4IDJgfICBDpIBGkIIC6gcIiLH5QgaBgg0AuQgyAshRAMQgUADgVAAQgVAAgVgDgA34IjQhEAAg3gcQg2gcgfg6QgHgNgDgKIgFgNQgLgjADg2QAEg8AVgiQAMgVAGgHIAngwQAVgZAWgNQAzghA7gDQBOgEAoAmIgIjHIC8gOQAJB7AJDEIAOE+QgnAEg7ADIhjAFIAAgmQgxA0hXAAIgBgBgA3FDVQghACgVAZQgVAZgDAqQgCAtAWAWQAWAXAiAAIAEAAQAjgDAUgZQAVgZAAgsQAAgsgXgXQgVgVgeAAIgEABgEggAAIDQg/gGgqgHIAPhzQAIhFAHguQALhOg8gKQghgGgZATQgYATgIAwQgTB2gNBjQiegcgzgKIApjmQAYiJAShcIC7AjIgHAtQAfgVAogIQAngHAqAIQBYAQAwA5QAiApAEA1QACAggDAgIgOCBQgJBOgEA1IhqgMgAu2HoQgpgOgZggQgVgbgEglIgCgMQgChEAygnQA0gpBtgOIBPgJQgMgvg9ABIgoAFQgVAEgYALQgfANgXAUIhIh5QAngdA4gTQA6gWA2gHQB7gOBHAsQAtAcAVA1QAOAjAEAsIAcD5QiYAXgiAEIgGg9QgeBMhlALQgRACgQAAQgnAAgdgKgAsaEmQg8AIADAnIABADQABAJADAEQAGAHAEADQANAIAXgCQAWgEAPgMQAGgFAFgIQAGgIABgFQAEgHAAgEIgDghgEA76AGeQg7gPg2gbQg2gbgegdIBPhwQAXAWAXAOIAXANIAWALQAeAOAfAIQAhAIAOgBIACAAQAKgCAEgHIAAgEQADgLgQgJQgQgJgjgNQg6gXgigTQglgUgYgmQgXglAMg5IAEgPQALghAdgYQAjgeA5gHQA4gJBOATQAyAMAxAWQAwAVAfAaQgtBBgjAxQgSgRgZgPQgngXgrgLQgvgKgOAJQgFAFAAADQgDAMAQAJQALAFAoAQQAzASApAWQAkAWAXAkQAXAkgMA7IgGAUQgLAegaAXQggAdg+AJQgQACgSAAQgtAAg4gPgEguNAFfQhRgTg7gwQg3gtgYhCQgEgJgDgOIgDgOQgIgvANgvQAOgyAggmIAWgXQAzgsBFgOQBHgOBOAVQBQATA3AsQA3AsAZA/QAGAPAEAPQAMAvgLA0QgKAxgbAnIgJALQgFAIgLAJQgwAvhIAPQgeAGggAAQgtAAgygMgEgt9AAiQgcASgKArQgKAqAQAeQAQAdAhAIIAEABQAhAHAcgRQAcgTAJgrQAKgrgRgcQgQgcgjgJQgLgDgKAAQgWAAgSAMgEA1OAE0QhfgVgqg7QgcgmgCg+IAAgMQABgXAEgQIAWh1IhAgOQAQhdAJguIBBANIAYiAIDDAsIgaCAIBfAWIgcCKIhfgWIgXB0QgFAUAJAPQAFAHAEADQAJAHAJABQAOAEALgCQAMgBAHgDIASCPQgWAGgbAAQggAAgogKgAeSEdQg6gMgtgcIAfhDIAghFQAbAUArALQAmALArAAQA3gBAcgZQAcgZABgwIAAgJQgtAwhVAEQg8ABg0gaQgwgYgjgvIgDgDIgFgIQgdgwAAg9QAAgsAMgnQAFgRAMgWQAgg4A3gfQA6ggBAgDQA2gCAmAPQAoAPASAfIAEg3QAUACBUgDQBEgCAkAFQgRBegLBoQgGBBgIB8QgJCIhLBDQgmAhgzAQQgyAQhEABIgFAAQg9AAg+gMgEAgqgDVQgmABgYAXQgYAUAAAkQAAAgAYAWQAXAUAkgBQAkgBAWgVQAXgTAEglQADghgZgWQgXgUgfAAIgGAAgAJYlMICsgYQA3AxDUDAIgbkQQBHgKCIgPQATDHAhGLIipAXIkGjvIAbEOIjMAdQgTjOgsmHgEg4NAClQAxitAbhXQg1AuiSB4IhcgdQgqhygXh/QgiBLgRAwQgZBDgKA6Ii7g5QAdhtBJizQBSjGAahTICfA3IAqC4QAZBqAVBNQBvhbCvicICkAxIiiI/IjAg5gEAsUAC0IAgjkQAMhQg5gKQgggGgYATQgXAUgHAwIgbDYQgmgFiWgQQAJiDAYi7IAolBIDHAgIgcDLQBAgmBNAOQBZAQAsA8QAcAoADA+QABAYgGAqQgHAugPBUIgWCDIi6gjgAWPkuIDNgWQAJCGAOFLIjDATIghnOgAWWlxQglgYgDgqQgEgrAggeQAfggA3gEQA6gGAkAWQAkAXAFAqQAEAqggAhQgfAgg6AFIgVACQgpAAgegUg");
	this.shape_15.setTransform(-5.525,-12.85);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#006666").s().p("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");
	this.shape_16.setTransform(-5.8,-13.9185);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#006666").s().p("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");
	this.shape_17.setTransform(-6.125,-15.0114);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#006666").s().p("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");
	this.shape_18.setTransform(-6.425,-16.008);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#006666").s().p("A50JPQg3gcgeg5QgGgLgFgNIgEgMQgKgiAEg2QAFg9AWgfIAUgbQAOgQAZgfQAWgbAUgNQA2giA3gDQBPgGAoAmQgIiqgDgfQBCgEB5gNQALB8ALDDQANEEAFA6QgoAFg9AEIhlAGIABgmQgzA1hZAAQhEgBg5gcgA3BEeQgiACgUAaQgWAagDAqQgDAqAWAXQAXAXAhAAIAFAAQAkgEAUgYQAWgbgBgrQgBgtgWgVQgWgUgcAAIgFAAgAkdJpQgtgFgYgOIAuiPQASAJASADQAUADASgCQAggGANgWIkLmxIDJgkICHDlQAui4AThSIC7gkIhAEAIhCD/QgYBjgyAtQgxAvhRAOQgYAEgbAAIgggBgEggKAJDQg/gIgrgJQAXiYAOhLQAOhNg9gNQgigIgZASQgZASgLAvQgcCPgMBIQiRgfhDgQIAzjlQAeiIAWhcQAvANCNAiIgJAsQAfgTAqgGQAngFArAKQBYAVAwA6QAkAsAAAyQABAhgEAdIgTCBQgLBLgEA1IhtgPgAusInQgqgNgZggQgVgcgFgjIgCgNQgDhEAxgoQAzgpBugSIBQgNQgNgtg+ADIgUACIgUAEQgWAFgWALQgiAPgUATIhLh2QAlgdA5gXQA7gXA1gIQB7gTBJAqQAuAbAVA0QAQAiAFAtQALBYAWChIi6AhIgIg+QgcBOhmANQgWAEgUAAQghAAgcgIgAsSFgQg8AJAEAnIABAEQABAHADAFQAFAHAGADQAMAIAYgEQAVgDAQgNQAHgHAEgGQADgFAEgIQACgIAAgEIgDgggEA8FAHIQg9gUgygcQg3gfgbgfIBWhrQAVAXAWAPIAXAPIAWAMQAcARAgAKQAfALAQgCIACAAQAKgBAEgHIABgEQADgLgPgJQgOgIgmgSQg3gZgjgVQgjgXgXgoQgWglAPg6IAFgOQANghAegYQAlgaA5gEQA3gFBOAWQAwANAxAZQAyAaAbAbIhUBuQgVgVgVgOQgogZgpgMQgugOgPAJQgEADgBAGQgEAKARAKQALAHAmARQA1AWAkAYQAlAYAVAkQAVAngOA5IgDAJIgEALQgNAdgbAXQggAbhAAGIgTAAQg0AAhAgWgEgukAFzQhQgXg8g1Qg1gvgXhEIgIglQgEgxAOgtQASgzAhgjQAQgPAIgGQA1gpBIgKQBIgJBOAXQBSAaA0AuQA1AsAYBCQAGASADAOQAKAvgOA0QgNAwgbAlIgKAKQgGAIgLAJQgzAshKALQgWAEgYAAQg2AAg8gSgEguGAA3QgcAQgNAqQgMArAPAdQAPAdAhAMIAEABQAiAJAcgRQAdgQAMgqQAMgrgQgdQgQgeghgKQgNgEgNAAQgUAAgSAKgEA1dAFGQhdgbgog+QgagnABg9IAAgNQACgSAFgVIAbh0Ig/gRIAeiKIBBARIAfh/IDBA2IggCAIBfAbIgjCIIhegbIgdBzQgFAUAIAPQADAHAGAEQAHAGAKADQAMAEANgBQAKAAAJgDIAKCQQgQADgTAAQgmAAgvgNgAKGgXIgokqICugdIETDoQgXi1gKhaQBKgMCHgSQANBqAUC+IAfEoIipAbIkPjmIAiENIjOAjQgOiBgXiogAetEEQg3gLgxgbIAghEIAghFQAcATApALQApALAogBQA3AAAcgaQAcgaACgwIABgIQgvAwhVADQg6ADg1gaQgxgYgjgtIgDgEIgGgIQgdguAAg/QAAgrALgnQAFgRAMgWQAgg5A4ghQA7ghBCgDQA3gEAnAOQApAPASAgIAFg3QAVACBVgEQBIgDAiAGQgUBhgNBpQgHBDgLB6QgKCJhMBCQglAhgzAQQgxAPhEACIgNAAQg3AAg8gLgEAhHgDxQgoADgYAWQgXAVgCAkQAAAgAZAWQAYAUAjgCQAlgCAWgVQAYgTADglQAFghgZgWQgXgUggAAIgGAAgEg4oACSQAOgnAfhZIAuh/Qg4AqicBtIhdgkQgmhwgNiDQgqBHgVAuQgdBBgLA5QhHgbh1gqQAkhsBaisQBki/AghRICaBDIAdC6QATBsAQBNQBthMDFiXICiA7QiEF4hAC7IjAhEgEAsqACoIApjjQAOhQg5gMQgggHgYASQgYATgJAvQgMBJgVCOQgngGg3gHIhcgNQAMiEAci6QAPhsAjjVIDIApIgjDKQBCgkBOASQBZAVApA+QAbApAAA+QAAAXgHAqQgJAwgSBSIgcCBIi4grgAWgk8IDRgaQALCKARFFQgvAFiVAUgAWml+QgmgXgEgqQgEgrAfgfQAgggA3gHQA6gGAmAVQAlAWAGApQAFAqggAiQghAgg5AIQgOABgMAAQgnAAgdgRg");
	this.shape_19.setTransform(-6.75,-16.95);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#006666").s().p("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");
	this.shape_20.setTransform(-7.075,-17.5998);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#006666").s().p("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");
	this.shape_21.setTransform(-7.375,-18.1998);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#006666").s().p("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");
	this.shape_22.setTransform(-7.7,-18.8248);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#006666").s().p("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");
	this.shape_23.setTransform(-8.025,-19.448);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#006666").s().p("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");
	this.shape_24.setTransform(-8.325,-20.0248);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#006666").s().p("A30K+QhIgBg5gcQg3gagfg7QgHgMgDgMIgFgMQgFgUAAgUQAAgOADgdQAIhAAXgaIALgNQAGgJAFgEQAOgMAagiQAXgeARgMQA1gkA3gFQBPgIAoAlIgGhkQgEg8gEgpIC5gXQAPB/ANDAIAWE+QgpAGg+AFIhnAJIABgmQg3A2hYAAIgBAAgA26FzQgiACgVAaQgUAagFAqQgEAqAWAWQAWAWAjAAIAEAAQAmgEAUgZQAWgcgBgrQgBgrgXgVQgUgTgaAAIgIABgEggZAKJQhBgMgsgNQAeiUAThKQAShMg+gRQgigKgbAPQgcARgMAtQglCSgPBCQh5ghhfgeIBAjhQAmiEAdhbQA/AWB+AoIgLArQAjgRApgBQAqgDAqAOQAuAPAgAUQAiAXAYAgQAlAwgFAtQgCAqgEATIgZB8QgOBIgHA1IhwgTgAkCKNQgtgDgZgMIApiRQARAIAUACQAUACASgEQAggHANgWIkdmlIDLguIBJBvIBIBwQApi9APhQIC+gtQgWBkgkCgIg8EDQgWBjgvAwQgxAxhRARQgeAIgiAAIgTgBgAucJpQgsgLgZgfQgXgZgGgmIgBgGIgBgGQgEhDAxgqQAygsBvgWIBQgQQgOgug+AGIgUADQgIABgNAEQgUAGgYAMQggAQgWAVIhNh1QAlgeA4gYQA5gZA2gLQB7gZBLAnQAuAYAZA0QARAkAGApQAOBZAcCfIi9AqIgJg9QgbBPhmASQgdAFgaAAQgbAAgXgGgAsFGcQg8AMAEAnIABAEQACAIADAEQAFAGAGADQANAHAXgEQAWgFAPgOQAIgHADgGQAEgFADgJQADgIAAgDIgFgggEA8WAHwQg8gagxgiQgygigcgiIBehjQASAWAXAUIArAfQAdATAfANQAfAOAQABIABAAQALgBAFgHIABgDQADgLgPgLQgRgMghgSQg6gigegWQgigagUgpQgUgoATg4IAGgPQAOggAhgVQAlgYA6AAQA4AABNAcQAyAUAtAcQAtAaAcAgIhcBpQgRgVgWgSQglgcgpgPQgugSgPAIQgFADgBAFQgEAKAPAMQAHAFApAWQA1AcAiAaQAiAZAUAoQASAogRA5IgCAJIgFALQgPAbgdAXQgfAYhEAAQg7AAhMghgEgvFAFzQhSgeg6g6Qg0gzgShFQgDgIgCgQIgCgOQgCgyATgsQAUgwAmggQARgOAJgGQA6gkBJgFQBKgEBPAeQBSAgA0AzQAyAwAWBEIAHAgQAHAxgRAyQgPAwgfAjIgLAJQgHAHgLAIQg4AphMAFIgVABQhDAAhMgdgEguTAA6QgeAPgPAoQgQApAOAgQANAdAiAOIAEACQAiAMAfgOQAfgOAOgqQAPgqgOgeQgPgfgigNQgRgGgQAAQgRAAgQAHgEA11AFHQhbgiglhCQgWgmAEhAIACgNQACgRAGgVIAjhzIg+gVIAThEIAUhEIBAAWIAmh9IDBBHQgKAcggBhIBeAkIgsCGIhdgkIgkBwQgGAVAGAPQAEAIAEAEQAIAHAJAEQAOAEALABQAKAAAKgCIAACQIgUACQgrAAg5gWgAKbgfIgzkoICxgmQBYBCDGCaQgci0gNhaQBWgRB/gWQAQBqAZC9QAcDNANBaIisAiIkajaIArELIjQAtQgSh8gdirgAfXDIQg4gJgwgbQALgbAUgrIAghFQAbASAqALQAoAKAqgCQA2gBAcgaQAdgaACguIABgJQgwAvhUAFQg9ADg0gYQgxgWgkguIgDgDIgFgIQgfgtAAg/QAAguALglQAFgQAMgYQAgg7A5ghQA8giBEgGQA5gFApAPQAqAOARAgIAHg4QAWABBZgGQBLgEAjAHQgaBngQBoQgKBEgNB8QgOCIhLBCQgmAigyAPQgwAQhEACIgWAAQgwAAg5gJgEAhygEyQgnADgaAYQgZAVAAAkQAAAgAZAVQAZAVAjgDQAlgDAXgUQAXgVAFgkQAFgigagWQgVgTgfAAIgKAAgEAtOAB+IAzjhQAShOg4gRQgfgJgbARQgZAQgKAwQgKAsgMBAIgUBpQgmgJg3gJIhcgQQAdjkBWmZIDKA1QgWBggXBoQBFgfBNAXQBaAbAmBBQAaApgEBAQgBAUgKAtQgLAugYBSIgjCAgEg5PABYIA3h5QAihOAWgtQhOAviXBUIhfguQgjh1AEiDQg2BDgaAqQglA9gLA6QhKglhwgyQAqhsBzigQB+iwAnhPICUBTIALC8QAHBrAKBPQCChFDKiAICiBIIh5ERQhMCrgrBlIjChYgAW7lmIDUgjQALBiAKCEIAQDnQgoAFidAbIg0nKgAXAmpQgogVgGgqQgGgpAggiQAfggA5gKQA7gIAnATQAoAVAGAoQAHAqghAjQgeAhg8AKQgRADgQAAQgkAAgbgPg");
	this.shape_25.setTransform(-8.675,-20.6498);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#006666").s().p("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");
	this.shape_26.setTransform(-9,-21.2248);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#006666").s().p("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");
	this.shape_27.setTransform(-9.325,-21.823);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#006666").s().p("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");
	this.shape_28.setTransform(-9.65,-22.4231);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#006666").s().p("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");
	this.shape_29.setTransform(-10,-23.0231);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#006666").s().p("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");
	this.shape_30.setTransform(-10.35,-23.6231);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#006666").s().p("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");
	this.shape_31.setTransform(-10.7,-24.2481);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#006666").s().p("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");
	this.shape_32.setTransform(-11.025,-24.8216);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#006666").s().p("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");
	this.shape_33.setTransform(-11.4,-25.3981);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#006666").s().p("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");
	this.shape_34.setTransform(-11.725,-26.0231);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#006666").s().p("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");
	this.shape_35.setTransform(-12.075,-26.5981);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#006666").s().p("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");
	this.shape_36.setTransform(-12.45,-27.1731);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#006666").s().p("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");
	this.shape_37.setTransform(-12.775,-27.7967);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#006666").s().p("A3tNgQhMgCg9gaQg6gZgeg7IgJgXIgEgNQgFgSACgSIAHgmQAGgdAHgQQAKgYASgLQAEgDAJgIQAIgHAFgDQAXgMAUghQAYglAMgKQAwgoA4gKQBNgOApAhIgKhjQgGg7gHgoIC2gnQAZCCATC7IAfE7QgqAJhCAIIhtANIACglQg/A6hWAAIgEAAgA2qIbQgjAHgTAaQgUAbgIAnQgIAoAXAUQAXAVAkgBIAFAAQApgHATgZQAVgcAAgqQgBgtgYgSQgSgPgWAAIgNABgEgg3AMLQhEgTgugUQAuiNAbhFQAbhFhAgdQgjgQgfAKQgeALgSAsQg9CfgPAqQh+g0higtQCEk1A2h0IDCBgIgRAoQAngKAsAGQArAFAtAYQAxAbAdAYQAjAcAYAkQASAbAHAYQAHAZgHAQQgDAFgEASQgEAVgEAKIgnByQgVBCgJAzIh4gigAt7LpQgsgHgcgdQgYgYgIglIgDgMQgHhDAwguQAzgwBvghIBQgXQgRgsg+ALIgqAMQgVAIgXAOQgeASgWAXIhVhuQAlgiA2gdQA8gfAzgOQB7gkBPAgQAxAUAdAxQASAhAKAqQAbB7AeB6QiRAuguANIgNg8QgXBThpAbQgpAKgjAAQgRAAgQgCgArqIOQg8ASAHAmIABAEQACAIADADQAFAFAHADQAOAHAYgHQAWgHAPgPQAHgJADgFQAEgJACgGIACgLIgDgQIgDgQgAkULGIAhiVQAQAGAWABQAVABASgGQAggJAMgYQiWi/imjMIDOhCQB0CWAtA+QAhjFALhQIDCg8QgQBjgfCnIgyEJQgSBnguAzQguA0hQAYQgpANgrABIgLAAQgmAAgXgJgEA/HAJ8Qg9gMhLgxQg8gmgrgqQgygvgVgjIBshTQAPAaAVAYIAoAnQAcAZAfAUQAgAWAPADIACAAQALADAFgHIACgDQAEgLgOgOQgRgRgggZQg5gtgagbQgggggPguQgPgtAZg0IAIgOQATgeAigPQAqgTA5AJQA1AIBMAqQAvAbApAiQArAjAYAjIhnBeQgPgXgUgWQghgigogWQgrgYgQAFQgFACgDAFQgEALANANQAIAIAlAcQAyAkAeAfQAhAgAOApQAQAqgWA8IgDAIIgGALQgNAUglAaQgSAMgcACIgGAAQgWAAgdgGgEgtYAGZQhSgHhZgvQhTgsg5hDQgxg7gNhKIgDgnQADgyAZgoQAbgtArgaIAegQQBBgaBOAGQBNAHBUAsQBUAtAxA7QAyA7AOBHQACAKACAXQADAygXAwQgWAtglAdIgLAIIgWANQgzAZg/AAIgfgCgEgutAAxQghAJgVAnQgUAnAKAhQALAgAjAUIAEACQAkASAhgJQAigJAUgoQAUgogLggQgNghgjgTQgYgNgXAAQgMAAgLADgEA2uAFKQhZg0gahGQgRgsAMg+IADgNQAEgPAJgWIAxhtIg8ggIAbhBQARgpALgYIA/AiIA2h2IC6BoIg6B2IBaA1Ig9B/IhZg1QghBHgRAkQgKATAFARQADAHAEAGQAGAHAJAGQANAIAMACQAJACALAAIgJBJQgFArgFAdQgzgChDgogALNgyQg1jcgQhHIC0g2QBmA9DQCFQgnixgShZQBOgWCOgjQAVBkAkC/QAmDGAUBcIivAyIkxjBIA9EIIjWA+QgXhtgri1gEAv4ABOQg0gbghgPQAQgsA5itQAMgngGgYQgHgYgdgOQgggOgcANQgaANgPAvQgNApgSBAIgcBnQglgNg2gOIhagYQAfijAoidQAtizAwiHIDNBUQgnBvgaBTQBLgWBMAjQBZApAhBIQAVAtgLBAQgDATgQAsQgQAuggBOQglBVgOAlIhWgsgEg6agApIBIhwQAshFAegqQhJAai7A7IhhhBQgjh+Akh6QhMAxgjAkQgyAzgJA7QhRg2hohBQA5hrCfh/QBhhPAYgVQBCg6Amg3ICFBuIgWC6QgMBrABBOQCbgrDehbICfBgIieD8QhnCkg1BWIjGh7gEAg3ABIQg3gGgygZQAKgcAUgqIAghHQAaARAsAJQAkAIAugCQA2gDAdgbQAdgaADgwIABgIQgaAYggAOQgfANgtAEQg8AHg2gXQgzgWglgpIgDgEIgGgHQgigrAAg/QAAgtAKgnQADgOAOgbQAfg9A9glQA/gnBIgJQA+gJAtANQAtANAQAgQAEgTAFgmQAYACBggNQBTgMAiANQglB4gVBlQgPBMgQB1QgKBIgYAyQgYAxgnAiQgmAhgxAQQgtAPhGAEIghABQgqAAgzgGgEAjWgG7QgqAHgbAYQgaAXAAAjQAAAgAaAUQAaAUAkgEQAmgFAYgUQAXgUAIgnQAHgigcgWQgWgSgdAAIgOABgAX7m+QCXglBFgPQAQBfAPCFIAYDlIhkAXIhkAXIhLnDgAX9oBQgrgSgIgpQgIgpAfgjQAegjA7gNQA+gOAqAQQArASAJAnQAKAoghAmQgeAjg/APQgaAGgWAAQgdAAgYgKg");
	this.shape_38.setTransform(-13.125,-28.3731);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#006666").s().p("A3sNrQhMgBg9gaQg7gZgdg8QgGgKgEgNIgEgMQgFgSACgSIAIglQAGgdAHgQQALgYASgLQAEgCAJgIQAIgHAFgDQAYgMAUghQAXgmAMgKQAvgoA4gLQBOgOApAhIgLhjQgGg8gIgnIC2goQAbCCATC6IAfE7QgpAKhDAIIhtANIABglQg+A7hWAAIgFgBgA2pInQghAHgUAbQgUAbgIAnQgJAmAYAVQAWAVAlgBIAEAAQAqgHATgZQAVgeAAgpQgCgsgXgSQgTgPgWAAIgNABgEgg5AMVQhEgVgugUIAkhoQAWg/ARgqQAbhFhAgdQgjgRgfAKQgfAKgSAtQg8CXgRAxQh8g1hlgvQCHk0A3hzIDDBiIgSAoQAmgJAuAGQAsAHArAXQAxAbAeAZQAiAdAZAlQASAbAGAYQAHAagHAOQgDAFgEASQgEAUgEALIgoBxQgWBCgKAyIh4gigAt4LyQgrgHgegdQgXgYgJgkIgCgNQgIhCAwgvQAygwBwgiIBRgXQgSgsg+ALIgqAMQgWAJgWAOQgfASgVAXIhVhtQAmgjA0gdQA7gfA0gPQB7glBQAgQAxATAdAxQATAiAJApQAgCNAaBoQiDArg7ASIgOg8QgWBShpAcQgqALglAAQgQAAgPgCgArnIWQg8ASAGAnIACADQABAHAEAEQAEAFAHADQAQAHAXgHQAVgHAPgQQAGgGAFgIQAFgIAAgGIADgMIgDgQIgEgQgAkQLLIAhiVQASAGAUAAQAWABAQgGQAhgJAMgYQifjJifjBIDOhDQCECqAeApQAdisAOhpIDDg+QgQBlgfCmIgxEKQgSBmguA0QgtA0hQAZQgqANgrABIgQABQgiAAgWgJgEA/KAKEQg9gNhLgyQg+gqgognQgxgvgVglIBshRQAOAZAWAZIAoAoQAbAZAfAVQAhAWAPAEIACAAQALACAFgGIACgDQAEgLgOgOQgVgUgcgXQg1grgegfQgfgggPgvQgPgsAag0IAIgOQASgdAkgQQApgSA6AKQA0AIBMArQAsAZAsAlQApAhAZAlIhoBeQgQgZgTgVQgggigogWQgrgZgQAFQgFACgCAFQgGALAPANQAKALAiAZQAyAmAeAeQAgAhAOApQAPArgVA7IgEAIQgBAFgFAHQgIAMgOAMIgcAVQgSAOghAAQgXAAgegHgEgtbAGZQhRgIhbgwQhVgug3hDQgyg8gMhKIgCgYIAAgPQADgxAZgoQAcguAsgZQAQgKANgFQBCgaBOAIQBPAHBTAtQBSAtAzA8QAxA7APBIQACAPABATQADAxgYAwQgXAugkAcIgMAIQgLAHgKAFQgzAYg9AAQgRAAgRgCgEguuAAwQgiAJgVAmQgWAnAMAhQALAhAiAUIAEACQAkASAhgJQAjgJAUgnQAVgngMghQgMgigjgTQgZgNgYAAQgLAAgKADgEA2zAFKQhZg1gZhGQgRgsANg/IADgMQAFgTAJgSIAyhsQgpgYgTgKIAbhAQARgpAMgYIA/AjIA2h2IC6BrQgOAagtBbIBaA2Ig/B+IhZg2IgzBrQgJATAFARQABAHAFAGQAHAJAIAFQAMAHANADQAJACALAAIgJBJIgLBIQgzgDhDgpgALRgzQg3jggPhEIC1g3QBwBDDIB+IgdiFIgeiFQBEgUCZgmQAVBhAlDCQAmDBAVBgIivAzIkzi/IA+EHIjXBAQgXhugsizgEAuqAAeIBKjYQAOgngHgYQgHgZgdgOQgfgOgdAMQgaANgPAvQgNAngSBCIgdBmQglgNg2gPIhagYQAhilAoibQAui1AwiFIDOBXQglBjgeBeQBMgVBLAkQBaAqAgBIQAUAvgLA/QgDAQgQAvQgRAtghBOQglBVgOAkQh1g9g2gagEg48AALIhjg+IBJhvQAshFAfgpQhmAiigAvIhhhCQgjiAAmh4QhNAwgkAjQgzAzgIA7QhSg4hohCQA6hqCih+QBihLAagWQBCg5Ang3ICEBvIgYC6QgNBsgBBOQCcgqDhhYICfBiQguBKhyCwQhnCeg4BaIhjg/gEAg/AA/Qg2gGgzgYQAKgcATgrIAghHQAcARArAJQAmAHAsgCQA2gDAdgaQAdgcADguIABgJQgZAYghAOQgfANgtAFQg8AGg2gXQg1gWgjgoIgEgDIgGgIQghgrgBg/QAAgvAKglQAFgRAMgYQAfg8A9gmQA/gnBJgKQA/gJAsANQAvAMAPAhQAEgTAGgnQAYADBfgOQBUgMAjANQgmB5gVBlQgQBNgRB0QgKBIgYAyQgYAxgnAjQgmAggxAQQgtAPhGAFIghABQgqAAgzgGgEAjegHEQgpAFgcAZQgaAYAAAjQAAAfAaAVQAbAUAjgFQAngFAYgUQAXgUAIgnQAHghgcgXQgVgRgdAAIgQABgAYAnFQCFggBZgUQAQBeAPCFIAYDlQgvAKiZAnIhNnFgAYCoHQgrgSgIgpQgIgpAfgkQAegjA7gNQA+gOArAQQArARAJAoQAKAoghAmQgfAjg+APQgaAHgXAAQgdAAgYgKg");
	this.shape_39.setTransform(-13.525,-28.9968);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#006666").s().p("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");
	this.shape_40.setTransform(-13.85,-29.5968);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#006666").s().p("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");
	this.shape_41.setTransform(-14.25,-30.1468);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#006666").s().p("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");
	this.shape_42.setTransform(-14.6,-30.7701);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#006666").s().p("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");
	this.shape_43.setTransform(-14.975,-31.3723);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#006666").s().p("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");
	this.shape_44.setTransform(-15.35,-31.9723);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#006666").s().p("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");
	this.shape_45.setTransform(-15.75,-32.5692);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#006666").s().p("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");
	this.shape_46.setTransform(-16.1,-33.1942);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#006666").s().p("A3lPGQhQgCg+gYQg8gZgdg7QgGgLgDgLIgFgMQgEgSADgPIAKgiQAIgdAHgOQANgWATgHIAPgIQAJgHAHgCQAbgIASgiQAWgtAJgIQAtgsA4gOQBNgTAqAeIgPhiQgIg6gJgoIC0gxQAiCBAXC4QANBoAYDQQgrAMhFAKQhMAKgkAGIACgkQghAdggAOQgnARguAAIgIAAgA2dKIQgiAIgTAcQgTAcgKAlQgLAkAYAVQAXAUAlgCIAFAAQArgIATgaQAWgfgCgoQgBgsgYgRQgRgMgTAAQgIAAgJACgEghGANcQhIgagtgYQA4iGAghCQARghgJgZQgIgYghgTQgkgUggAHQghAGgVArQhICWgTAqQhxg4hyhAQCIkHBSiQIDGB4IgUAmQAngFAwALQAsALAuAgQAzAkAbAaQAkAgAYAoQATAeAFAYQAHAZgMAKQgEADgFAQIgKAdIgwBpQgbA9gLAxIh7grgAtiM4QgtgFgegcQgZgWgJglIgDgMQgJhDAvgxQAzgzBvgmIBRgcQgTgrg/AOIgVAHQgJACgLAGQgUAIgZAQQgfAUgVAZIhZhqQAlgkA0ggQA3giA4gTQB8grBSAcQAzASAeAvQAVAiALAoQAgB/AiBzIjABHIgQg7QgVBUhpAgQgyAQgqAAIgTgBgArVJUQg+AVAKAnIABADQACAIADADQAHAFAFADQAQAFAXgIQAWgHAOgRQAHgIAEgHQAEgKABgFIACgGIAAgGIgIgfgAjyLyIAdiXQASAFAVAAQAVAAASgHQAggMAMgYQigi6iujBIDQhNQCACVArA3QAbi0ALhkIDFhHQgNBlgeCqQgiDJgLBEQgQBogsA1QguA2hOAcQgoAOguAEIgaABQgcAAgTgGgEBAiALSQgXgCgkgLQg/gVhJg6Qg8gygogsQgug1gUgnIB0hGQAMAbAVAcIATAXIATAVQAcAfAeAXQAgAaAQAGIACABQALADAGgGIABgDQAFgKgOgRQgPgSgigfQg0gygcgiQgeglgMgwQgMguAdgzIAJgOQAUgcAlgMQApgPA6APQAvAMBOAzQAsAdAoAnQAoAnAWAlIhsBZQgPgbgSgWQgfgmglgZQgrgcgQAEQgFACgDAEQgFAKANAQQAKALAhAdQAxAsAbAfQAfAlAMApQANAugXA7IgCAIQgDAGgFAGQgJAMgPALIgdAUQgPALgXAAIgIAAgEgt1AGYQhWgPhag4QhVg1g3hKQgyhBgJhLIgBgZIAAgPQAFgwAcgnQAfgtAvgUQAVgKAKgDQBFgVBSAPQBRAOBUA1QBVA1AyBCQAxBBALBJIADAiQAAAzgbAuQgaArgnAZIgNAHQgJAFgOAFQgpAPgwAAQgeAAghgGgEgu7AAkQgkAGgXAlQgZAlAKAjQALAiAiAXIAFADQAkAVAkgGQAigGAYglQAYgngLghQgLgkgkgWQgdgSgdAAIgOABgEA3ZAFPQhWhAgVhJQgNguARg+IADgNQAGgRALgTIA5hoIg6goIAfg+QAUgoAOgXIA9AqIA/hyICzB/QgOAWgUAiIghA5IBXA+IhHB7IhWhAQglBFgVAiQgLARAEATQACAIAEAFQAGAKAHAGQANAJAMAEQALAEAJAAQgXB2gHAaQgzgIhBgvgALzg8Qg5jIgWhZIC4hAQBsA5DZB5QgvivgVhZQBSgbCPgpQAYBhAsC/QAqDAAYBfIiwA7IlAiwIBHEEQhcAfh9AsQgahmg1i4gEAw0AAeQgygfgggTQAXg1A/ifQAPgmgFgZQgGgagcgQQgggSgdALQgaAJgSAwQgPAmgVBAIghBlQglgRg1gRIhYgdQAxjLAih2QA4jAA2h2IDOBqQgxBvgdBOQBOgOBMArQBYAzAdBMQASAwgPBAQgEASgTAsQgTAsgnBLQgqBSgQAkIhUg2gEg7GgCEIBQhpQAxhAAignQhaAVi7AhQgdgYhGg1QgkiHA2hvQhZAkgnAfQg6AsgGA9QhXhDhihIQBBhqC4hnQBwg+AdgTQBKgwArgzIB7B7IgnC3QgXBogEBOQCpgZDphFICfBxQg4BNh5CfQh1Cag7BRQiGhihCgvgEAi8gAGIg+gDQg0gFg2gXQAJgcATgsIAhhJQAaARAtAIQAkAGAvgDQA1gEAdgbQAfgdADgtIABgJQgaAYghAOQggAOgsAGQg+AIg2gWQg0gTgmgoIgDgDIgGgHQgkgqAAg/QgBgtAKgnQAEgRAMgZQAgg/A+gnQBBgqBMgNQBBgLAuALQAxAMAPAhQAEgUAGgnQAaAEBjgUQBZgRAjAPQgsCFgZBlQgSBPgTBzQgMBJgZAyQgYAxgpAjQgmAigwAQQgrAOhHAHQgWABgYAAIgSAAgEAkfgIUQgsAIgbAaQgaAXAAAkQgBAfAcAUQAaATAlgFQAngGAYgVQAXgTAJgpQAJgigegWQgVgRgbAAQgJAAgKACgAZYkWIgrjfQCFgnBdgYQARBcASCFIAdDkQgyANiYAtIgtjhgAYto4QgtgQgJgoQgKgpAfglQAfgkA7gQQBAgRArAOQAuAQAKAmQALAoggAnQggAmg/ARQgfAJgcAAQgYAAgVgIg");
	this.shape_47.setTransform(-16.5,-33.7694);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#006666").s().p("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");
	this.shape_48.setTransform(-16.875,-34.3694);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#006666").s().p("A3kPcQhQgCg+gYQg9gYgdg7QgHgOgCgJIgEgMQgEgRADgPIALggQAHgcAIgOQANgXAUgGQAGgBAJgGQAKgGAHgCQAcgIARgiQAWgvAIgIQAsgtA4gOQBNgVAqAeIgPhhQgJg7gJgnQBvggBFgVQAiCCAZC3QANBoAZDQQgqAMhGALIhxARIACgkQggAdghAOQgoARgvAAIgIAAgA2aKgQgiAJgSAbQgTAbgMAmQgKAjAYAVQAXATAlgBIAFgBQAsgIASgaQAWgfgCgoQgBgrgYgRQgQgMgTAAQgJAAgJADgEghKANtQhHgbgtgZQA6iFAghAQARgigIgZQgHgYghgTQgkgVghAFQggAFgXAsIgwBeQgcA2gSAqQh5hAhsg+QCCjzBfifIDHB9IgVAmQApgFAwANQAsANAuAgQA0AnAaAaQAkAhAYApQATAfAGAYQAGAZgMAIQgFADgFAQIgLAcIgzBnQgbA8gLAwQhUgegpgPgAtdNIQgtgEgegbQgZgXgJgkIgDgMQgLhDAwgxQAyg0BwgoIBRgdQgTgrhAAPIgpAPQgVAJgYAQQgeAVgVAYIhbhoQAngmAyggQA4ghA3gVQB8gsBTAbQAzAQAfAwQAVAgALApQAiB/AiBzIjABJIgQg7QgVBVhpAhQgzARgqAAIgTgBgArQJiQg+AWAJAnIABADQACAHAFAEQAFAFAGADQAQAFAXgIQAXgJANgQQAIgIACgHQAEgIACgHIACgMIgDgQIgFgPgAjqL7IAciYQAQAFAWAAQAVAAASgHQAhgMALgZQiSioi/jQIDRhPQByCBA6BJQAcjEAJhUIDHhJQgNBlgdCrQgjDKgKBDQgQBogsA2QgtA2hPAdQgrAQgqADIgdACQgaAAgSgGgEBAqALkQgYgCgkgNQg+gWhJg9Qg7gygogvQgvg2gSgoIB0hDQAPAfASAYIAlAuQAaAcAhAcQAeAaARAHIACABQAMAEAFgGIADgDQAEgKgNgRQgRgTghghQgygygdgkQgdglgMgyQgMgvAegyIAJgNQAVgbAkgNQAqgOA5ARQAyAOBLAzQArAdAoApQAnAmAWAnIhsBYQgPgcgSgVQgdgmgmgbQgrgdgQAEQgFABgDAFQgEAKAMAQQAHAJAjAgQAzAvAYAeQAfAlAMAqQANAugXA8IgDAIIgHAMQgKALgQAMIgcAUQgPAKgWAAIgKAAgEgt7AGYQhWgShbg6QhWg2g3hMQgxhDgJhLIgBgZIABgOQAFgwAdgoQAfgqAwgVIAfgMQBGgTBSAQQBTAQBVA3QBWA3AxBDQAxBBALBKQACAQAAASQAAAygcAvQgaAqgpAZIgNAHIgXAKQgnANgtAAQgiAAgkgHgEgu+AAhQgkAFgZAlQgYAlAJAjQAKAhAjAZIAFADQAlAVAjgEQAjgFAZgmQAZgmgMgiQgLgjgjgYQgegTgeAAIgNABgEA3jAFQQhVhCgUhLQgNgtATg/IADgMQAHgSAKgSIA7hnIg6gqIAhg+QAUgnAOgXIA8AsIBBhxICyCEIhEBwIBWBAIhJB6IhVhCQgnBEgVAhQgLASADASQABAGAFAIQAGALAHAFQAOAJALAFQAKADAKACIgPBIIgQBHQg1gKhAgwgAL9g/Qg6jHgYhZIC4hCQBuA4DaB2IgiiDQgXhUgMgwQBQgcCRgrQAaBhAsC+QAtDAAYBgIixA8IlCitIBJEEQhbAfiAAuQgahlg2i4gEAvxgAgQAXgzBBigQAQgmgFgZQgFgagcgRQgggTgdAKQgbAJgTAvQgOAmgWBBIgjBkQgkgRg1gSIhZgfQA4jbAfhmQA6jDA4hyIDNBvQg0B0gcBHQBQgMBKAtQBZA2AbBMQARAvgPBCQgEAOgUAvQgUAsgnBLQgsBRgRAkQhwhMg0gggEg7RgCZIBThnQAyhAAjgmQhjAVi1AbQgegZhGg2QgkiJA5htQhcAhgoAdQg8ArgEA+QhZhGhghKQAphBBJg2QAzglBbgvQBzg7AdgRQBNguAsgyIB5B+IgtC1QgXBogGBOQCygWDkg/IChB0Qg6BOh6CbQh5Cag7BPQiIhnhDgxgEAiOgAcQg1gDg1gXQAJgdAUgsIAfhJQAaAQAtAIQAmAGAugDQA1gEAdgbQAfgcADgvIABgJQgbAZgfAOQggANguAHQg8AIg4gVQg2gUgkgmQAAgBgBAAQAAAAgBgBQAAAAAAAAQgBgBAAAAIgHgIQgjgpgBg/QAAgtAJgnQAEgQANgaQAfg/A/gpQBDgqBKgNQBDgLAvAKQAwALAQAhIAGgdIAFgeQAZAEBlgVQBagTAiAQQguCJgYBkQgUBPgTBzQgMBJgZAzQgZAwgpAkQglAhgwARQgsAOhHAHQgUABgZAAQgjAAgugDgEAkwgIoQgtAJgcAaQgaAYAAAjQAAAfAbAUQAaATAmgGQAngGAZgUQAYgUAJgpQAIgigdgWQgWgRgbAAQgJAAgKACgAZmkjIgujfQCcgtBIgUQASBcASCFIAeDkQgjAJinAyQgShRgciPgAY4pEQgtgPgJgpQgKgnAegnQAegkA9gRQBBgRArANQAtAPALAnQAMAoghAnQgfAlhAASQghAKgcAAQgXAAgVgHg");
	this.shape_49.setTransform(-17.25,-34.9694);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#006666").s().p("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");
	this.shape_50.setTransform(-17.65,-35.5694);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#006666").s().p("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");
	this.shape_51.setTransform(-18.025,-36.1695);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_12}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_14}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_16}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_18}]},1).to({state:[{t:this.shape_19}]},1).to({state:[{t:this.shape_20}]},1).to({state:[{t:this.shape_21}]},1).to({state:[{t:this.shape_22}]},1).to({state:[{t:this.shape_23}]},1).to({state:[{t:this.shape_24}]},1).to({state:[{t:this.shape_25}]},1).to({state:[{t:this.shape_26}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_28}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_31}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_33}]},1).to({state:[{t:this.shape_34}]},1).to({state:[{t:this.shape_35}]},1).to({state:[{t:this.shape_36}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_38}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_40}]},1).to({state:[{t:this.shape_41}]},1).to({state:[{t:this.shape_42}]},1).to({state:[{t:this.shape_43}]},1).to({state:[{t:this.shape_44}]},1).to({state:[{t:this.shape_45}]},1).to({state:[{t:this.shape_46}]},1).to({state:[{t:this.shape_47}]},1).to({state:[{t:this.shape_48}]},1).to({state:[{t:this.shape_49}]},1).to({state:[{t:this.shape_50}]},1).to({state:[{t:this.shape_51}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-455.7,-137.2,875.4,202.1);


(lib.mondayNights = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.PuppetShape_5("synched",1,false);
	this.instance.setTransform(402.75,44.05);

	this.instance_1 = new lib.PuppetShape_2("synched",1,false);
	this.instance_1.setTransform(402.75,44.05);

	this.instance_2 = new lib.PuppetShape_1("synched",1,false);
	this.instance_2.setTransform(402.75,44.05);
	this.instance_2._off = true;

	this.instance_3 = new lib.PuppetShape_3("synched",1,false);
	this.instance_3.setTransform(402.75,44.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance_1}]},1).to({state:[]},1).to({state:[{t:this.instance_2}]},2).to({state:[{t:this.instance_3}]},49).to({state:[]},1).wait(3));
	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:-1.2,regY:-3,x:401.55,y:41.05,startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).to({_off:true},1).wait(56));
	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(30).to({_off:false},0).to({_off:true},49).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-51.1,-89.7,873.3000000000001,200.4);


(lib.Scene_1_Message = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Message
	this.mondayNights = new lib.mondayNights("synched",0);
	this.mondayNights.name = "mondayNights";
	this.mondayNights.setTransform(636.05,295.4,1,1,0,0,0,402.8,44.1);
	this.mondayNights.alpha = 0;
	this.mondayNights._off = true;

	this.timeline.addTween(cjs.Tween.get(this.mondayNights).wait(119).to({_off:false},0).to({alpha:1,mode:"single",startPosition:30},28).wait(102).to({mode:"synched",loop:false},0).to({alpha:0,startPosition:79},50).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


// stage content:
(lib.elmarAnimation_interactive = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,1,119,147,249,299];
	this.streamSoundSymbolsList[0] = [{id:"AcousticEchoes",startFrame:0,endFrame:299,loop:1,offset:0}];
	this.___GetDepth___ = function(obj) {
		var depth = obj.depth;
		var cameraObj = this.___camera___instance;
		if(cameraObj && cameraObj.depth && obj.isAttachedToCamera)
		{
			depth += depth + cameraObj.depth;
		}
		return depth;
		}
	this.___needSorting___ = function() {
		for (var i = 0; i < this.numChildren - 1; i++)
		{
			var prevDepth = this.___GetDepth___(this.getChildAt(i));
			var nextDepth = this.___GetDepth___(this.getChildAt(i + 1));
			if (prevDepth < nextDepth)
				return true;
		}
		return false;
	}
	this.___sortFunction___ = function(obj1, obj2) {
		return (this.exportRoot.___GetDepth___(obj2) - this.exportRoot.___GetDepth___(obj1));
	}
	this.on('tick', function (event){
		var curTimeline = event.currentTarget;
		if (curTimeline.___needSorting___()){
			this.sortChildren(curTimeline.___sortFunction___);
		}
	});

	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		var soundInstance = playSound("AcousticEchoes",0);
		this.InsertIntoSoundStreamData(soundInstance,0,299,1);
		this.Start = this.ImageAssets_psd.Start;
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
		_this.Start.on('click', function(){
		/*
		Play a Movie Clip/Video or the current timeline.
		Plays the specified movie clip or video.
		*/
		_this.play();
		});
	}
	this.frame_1 = function() {
		this.Start = undefined;
	}
	this.frame_119 = function() {
		this.mondayNights = this.Message.mondayNights;
	}
	this.frame_147 = function() {
		this.mondayNights = undefined;this.mondayNights = this.Message.mondayNights;
	}
	this.frame_249 = function() {
		this.mondayNights = undefined;this.mondayNights = this.Message.mondayNights;
	}
	this.frame_299 = function() {
		this.mondayNights = undefined;this.mondayNights = this.Message.mondayNights;
		this.___loopingOver___ = true;
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(118).call(this.frame_119).wait(28).call(this.frame_147).wait(102).call(this.frame_249).wait(50).call(this.frame_299).wait(1));

	// Camera
	this.___camera___instance = new lib.___Camera___();
	this.___camera___instance.name = "___camera___instance";
	this.___camera___instance.setTransform(822.05,249.05,0.6887,0.6887,0,0,0,0.5,0.4);
	this.___camera___instance.depth = 0;
	this.___camera___instance.visible = false;

	this.timeline.addTween(cjs.Tween.get(this.___camera___instance).to({regX:0.6,regY:0.6,scaleX:0.7613,scaleY:0.7613,x:647.25,y:309.5},100,cjs.Ease.sineOut).to({regX:0.8,regY:0.8,scaleX:0.9957,scaleY:0.9957,x:639.75,y:359.15},47,cjs.Ease.sineOut).wait(102).to({regX:1.7,regY:1.6,scaleX:0.4152,scaleY:0.4152,x:630.2,y:171.8},50,cjs.Ease.sineInOut).wait(1));

	// ImageAssets_psd_obj_
	this.ImageAssets_psd = new lib.Scene_1_ImageAssets_psd();
	this.ImageAssets_psd.name = "ImageAssets_psd";
	this.ImageAssets_psd.setTransform(640,360,1,1,0,0,0,640,360);
	this.ImageAssets_psd.depth = 0;
	this.ImageAssets_psd.isAttachedToCamera = 1
	this.ImageAssets_psd.isAttachedToMask = 0
	this.ImageAssets_psd.layerDepth = 0
	this.ImageAssets_psd.layerIndex = 0
	this.ImageAssets_psd.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.ImageAssets_psd).wait(300));

	// Message_obj_
	this.Message = new lib.Scene_1_Message();
	this.Message.name = "Message";
	this.Message.setTransform(0,0,1.452,1.452,0,0,0,380.9,0.8);
	this.Message.depth = 0;
	this.Message.isAttachedToCamera = 0
	this.Message.isAttachedToMask = 0
	this.Message.layerDepth = 0
	this.Message.layerIndex = 1
	this.Message.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.Message).wait(119).to({regX:66,regY:14.3,scaleX:1.1107,scaleY:1.1107,x:-0.05},0).to({regX:1.7,regY:-0.1,scaleX:1.0044,scaleY:1.0044,x:0,y:-0.05},28).wait(102).to({regY:0,x:0.05,y:0},0).to({regX:363.8,regY:21.7,scaleX:2.4083,scaleY:2.4083,x:0.15,y:0.15},50).wait(1));

	// Cat_Walking_obj_
	this.Cat_Walking = new lib.Scene_1_Cat_Walking();
	this.Cat_Walking.name = "Cat_Walking";
	this.Cat_Walking.setTransform(0,0,1.452,1.452,0,0,0,380.9,0.8);
	this.Cat_Walking.depth = 0;
	this.Cat_Walking.isAttachedToCamera = 0
	this.Cat_Walking.isAttachedToMask = 0
	this.Cat_Walking.layerDepth = 0
	this.Cat_Walking.layerIndex = 2
	this.Cat_Walking.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.Cat_Walking).wait(97).to({regX:363.8,regY:21.7,scaleX:2.4083,scaleY:2.4083,x:0.15,y:0.15},202,cjs.Ease.none).wait(1));

	// shimmer_obj_
	this.shimmer = new lib.Scene_1_shimmer();
	this.shimmer.name = "shimmer";
	this.shimmer.setTransform(957,569.9,1.452,1.452,0,0,0,1040,393.3);
	this.shimmer.depth = 0;
	this.shimmer.isAttachedToCamera = 0
	this.shimmer.isAttachedToMask = 0
	this.shimmer.layerDepth = 0
	this.shimmer.layerIndex = 3
	this.shimmer.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.shimmer).wait(102).to({regX:892.5,regY:475.4,scaleX:1.287,scaleY:1.287,x:956.95,y:569.85},0).wait(2).to({regX:896.9,regY:481.9,scaleX:1.2617,scaleY:1.2617,x:957},0).wait(3).to({regX:903.5,regY:491.7,scaleX:1.226,scaleY:1.226,y:569.9},0).wait(3).to({regX:910,regY:501.2,scaleX:1.1931,scaleY:1.1931,x:957.1},0).wait(2).to({regX:914.1,regY:507.4,scaleX:1.1726,scaleY:1.1726,x:956.95,y:569.95},0).wait(3).to({regX:920.1,regY:516.3,scaleX:1.1442,scaleY:1.1442,x:957,y:569.9},0).wait(3).to({regX:925.8,regY:524.8,scaleX:1.1187,scaleY:1.1187,y:569.95},0).wait(3).to({regX:931.1,regY:532.5,scaleX:1.0958,scaleY:1.0958,y:569.85},0).wait(2).to({regX:934.4,regY:537.5,scaleX:1.082,scaleY:1.082,y:569.9},0).wait(3).to({regX:939,regY:544.2,scaleX:1.0635,scaleY:1.0635,x:957.05},0).wait(2).to({regX:941.8,regY:548.4,scaleX:1.0527,scaleY:1.0527,y:569.95},0).wait(3).to({regX:945.5,regY:553.8,scaleX:1.0385,scaleY:1.0385,y:569.9},0).wait(3).to({regX:948.6,regY:558.4,scaleX:1.0268,scaleY:1.0268,y:569.85},0).wait(2).to({regX:950.4,regY:561,scaleX:1.0204,scaleY:1.0204,y:569.9},0).wait(3).to({regX:952.3,regY:564.1,scaleX:1.0128,scaleY:1.0128,x:956.95},0).wait(3).to({regX:953.9,regY:566.2,scaleX:1.0077,scaleY:1.0077,x:957.05},0).wait(3).to({regX:954.6,regY:567.4,scaleX:1.0049,scaleY:1.0049,x:957},0).wait(2).to({scaleX:1.0044,scaleY:1.0044,x:957.05},0).wait(103).to({regX:954.4,regY:567.1,scaleX:1.0049,scaleY:1.0049},0).wait(1).to({regX:953.8,regY:566.1,scaleX:1.0067,scaleY:1.0067,y:569.85},0).wait(2).to({regX:951.5,regY:562.6,scaleX:1.0137,scaleY:1.0137,y:569.95},0).wait(3).to({regX:945.3,regY:552.7,scaleX:1.0331,scaleY:1.0331,x:957,y:569.9},0).wait(3).to({regX:936.1,regY:537.9,scaleX:1.0636,scaleY:1.0636,x:956.95},0).wait(2).to({regX:928.3,regY:525.5,scaleX:1.0905,scaleY:1.0905,x:957,y:569.85},0).wait(3).to({regX:914.7,regY:503.8,scaleX:1.1415,scaleY:1.1415,y:569.95},0).wait(2).to({regX:904.4,regY:487.4,scaleX:1.1831,scaleY:1.1831,x:956.95,y:569.9},0).wait(2).to({regX:893.5,regY:469.9,scaleX:1.2311,scaleY:1.2311,x:957.05,y:569.95},0).wait(3).to({regX:876.1,regY:441.9,scaleX:1.3161,scaleY:1.3161,y:569.9},0).wait(3).to({regX:858,regY:413,scaleX:1.4176,scaleY:1.4176,x:957},0).wait(2).to({regX:845.9,regY:393.7,scaleX:1.4946,scaleY:1.4946,y:570},0).wait(2).to({regX:834,regY:374.6,scaleX:1.5791,scaleY:1.5791,x:957.05,y:569.95},0).wait(3).to({regX:816.8,regY:347.2,scaleX:1.7186,scaleY:1.7186,x:956.95,y:569.85},0).wait(2).to({regX:806.3,regY:330.3,scaleX:1.8184,scaleY:1.8184,x:957.05,y:569.9},0).wait(3).to({regX:791.9,regY:307.3,scaleX:1.9734,scaleY:1.9734,x:957.1},0).wait(3).to({regX:779.9,regY:288.1,scaleX:2.1248,scaleY:2.1248,x:957},0).wait(2).to({regX:773.4,regY:277.8,scaleX:2.2167,scaleY:2.2167,x:956.95,y:570.05},0).wait(2).to({regX:768.2,regY:269.5,scaleX:2.2957,scaleY:2.2957,y:569.95},0).wait(3).to({regX:763.1,regY:261.4,scaleX:2.379,scaleY:2.379,x:956.85,y:570},0).wait(4));

	// detail_obj_
	this.detail = new lib.Scene_1_detail();
	this.detail.name = "detail";
	this.detail.setTransform(643.35,627.7,1.452,1.452,0,0,0,824,433.1);
	this.detail.depth = 0;
	this.detail.isAttachedToCamera = 0
	this.detail.isAttachedToMask = 0
	this.detail.layerDepth = 0
	this.detail.layerIndex = 4
	this.detail.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.detail).wait(300));

	// ground_obj_
	this.ground = new lib.Scene_1_ground();
	this.ground.name = "ground";
	this.ground.setTransform(639.85,620,1.452,1.452,0,0,0,821.6,427.8);
	this.ground.depth = 0;
	this.ground.isAttachedToCamera = 0
	this.ground.isAttachedToMask = 0
	this.ground.layerDepth = 0
	this.ground.layerIndex = 5
	this.ground.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.ground).wait(300));

	// mountains_obj_
	this.mountains = new lib.Scene_1_mountains();
	this.mountains.name = "mountains";
	this.mountains.setTransform(638.3,341.2,1.452,1.452,0,0,0,820.5,235.8);
	this.mountains.depth = 0;
	this.mountains.isAttachedToCamera = 0
	this.mountains.isAttachedToMask = 0
	this.mountains.layerDepth = 0
	this.mountains.layerIndex = 6
	this.mountains.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.mountains).wait(299).to({regX:628.8,regY:163.3,scaleX:2.4083,scaleY:2.4083,x:638.35},0).wait(1));

	// moon_obj_
	this.moon = new lib.Scene_1_moon();
	this.moon.name = "moon";
	this.moon.setTransform(1118,135.05,1.452,1.452,0,0,0,1150.9,93.8);
	this.moon.depth = 0;
	this.moon.isAttachedToCamera = 0
	this.moon.isAttachedToMask = 0
	this.moon.layerDepth = 0
	this.moon.layerIndex = 7
	this.moon.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.moon).wait(100).to({regX:1010.6,regY:137.7,scaleX:1.3135,scaleY:1.3135,y:134.95},0).wait(1).to({regX:1014.1,regY:137.6,scaleX:1.3001,scaleY:1.3001,y:135},0).wait(1).to({regX:1017.6,scaleX:1.287,scaleY:1.287,x:1117.95,y:135.1},0).wait(1).to({regX:1021.1,regY:137.4,scaleX:1.2742,scaleY:1.2742,x:1118,y:135.05},0).wait(1).to({regX:1024.5,regY:137.2,scaleX:1.2617,scaleY:1.2617,y:134.9},0).wait(1).to({regX:1028,scaleX:1.2495,scaleY:1.2495,y:135.05},0).wait(1).to({regX:1031.4,regY:137.1,scaleX:1.2376,scaleY:1.2376,x:1117.95},0).wait(1).to({regX:1034.8,regY:137,scaleX:1.226,scaleY:1.226},0).wait(1).to({regX:1038.2,regY:136.9,scaleX:1.2147,scaleY:1.2147,x:1117.9,y:135},0).wait(1).to({regX:1041.5,regY:136.8,scaleX:1.2038,scaleY:1.2038,x:1117.95},0).wait(1).to({regX:1044.9,regY:136.7,scaleX:1.1931,scaleY:1.1931,x:1118,y:135.05},0).wait(1).to({regX:1048.2,regY:136.6,scaleX:1.1827,scaleY:1.1827,x:1118.05,y:135},0).wait(1).to({regX:1051.4,regY:136.4,scaleX:1.1726,scaleY:1.1726,x:1117.95,y:134.95},0).wait(1).to({regX:1054.5,scaleX:1.1628,scaleY:1.1628,x:1117.9,y:135},0).wait(1).to({regX:1057.8,regY:136.3,scaleX:1.1534,scaleY:1.1534,x:1118.05,y:134.95},0).wait(1).to({regX:1060.8,regY:136.2,scaleX:1.1442,scaleY:1.1442,x:1118,y:135},0).wait(1).to({regX:1063.8,regY:136.1,scaleX:1.1354,scaleY:1.1354,x:1117.95},0).wait(1).to({regX:1066.8,scaleX:1.1269,scaleY:1.1269,y:135.05},0).wait(1).to({regX:1069.7,regY:135.9,scaleX:1.1187,scaleY:1.1187,y:134.9},0).wait(1).to({regX:1072.6,regY:135.8,scaleX:1.1107,scaleY:1.1107,x:1118,y:134.95},0).wait(181));

	// mask_idn (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_0 = new cjs.Graphics().p("EBlqBRrMAAAijVIAOAAMAAACjVg");
	var mask_graphics_1 = new cjs.Graphics().p("EBlqBRrMAAAijVIAOAAMAAACjVg");
	var mask_graphics_2 = new cjs.Graphics().p("EBlqBRrMAAAijVIAOAAMAAACjVg");
	var mask_graphics_3 = new cjs.Graphics().p("EBlqBRrMAAAijVIAOAAMAAACjVg");
	var mask_graphics_4 = new cjs.Graphics().p("EBlqBRrMAAAijVIAOAAMAAACjVg");
	var mask_graphics_5 = new cjs.Graphics().p("EBlqBRrMAAAijVIAOAAMAAACjVg");
	var mask_graphics_6 = new cjs.Graphics().p("EBlqBRrMAAAijVIAOAAMAAACjVg");
	var mask_graphics_7 = new cjs.Graphics().p("EBlqBRrMAAAijVIAOAAMAAACjVg");
	var mask_graphics_8 = new cjs.Graphics().p("EBlqBRrMAAAijVIAOAAMAAACjVg");
	var mask_graphics_9 = new cjs.Graphics().p("EBlqBRrMAAAijVIAOAAMAAACjVg");
	var mask_graphics_10 = new cjs.Graphics().p("EBlqBRrMAAAijVIAOAAMAAACjVg");
	var mask_graphics_11 = new cjs.Graphics().p("EBlqBRrMAAAijVIAOAAMAAACjVg");
	var mask_graphics_12 = new cjs.Graphics().p("EBlqBRrMAAAijVIAOAAMAAACjVg");
	var mask_graphics_13 = new cjs.Graphics().p("EBlqBRrMAAAijVIAOAAMAAACjVg");
	var mask_graphics_14 = new cjs.Graphics().p("EBlqBRrMAAAijVIAOAAMAAACjVg");
	var mask_graphics_15 = new cjs.Graphics().p("EBlqBRrMAAAijVIAOAAMAAACjVg");
	var mask_graphics_16 = new cjs.Graphics().p("EBlqBRrMAAAijVIAOAAMAAACjVg");
	var mask_graphics_17 = new cjs.Graphics().p("EBlqBRrMAAAijVIAOAAMAAACjVg");
	var mask_graphics_18 = new cjs.Graphics().p("EBlqBRrMAAAijVIAOAAMAAACjVg");
	var mask_graphics_19 = new cjs.Graphics().p("EBlqBRrMAAAijVIAOAAMAAACjVg");
	var mask_graphics_20 = new cjs.Graphics().p("EBlqBRrMAAAijVIAOAAMAAACjVg");
	var mask_graphics_21 = new cjs.Graphics().p("EBlqBRrMAAAijVIAOAAMAAACjVg");
	var mask_graphics_22 = new cjs.Graphics().p("EBlqBRrMAAAijVIAOAAMAAACjVg");
	var mask_graphics_23 = new cjs.Graphics().p("EBlqBRrMAAAijVIAOAAMAAACjVg");
	var mask_graphics_24 = new cjs.Graphics().p("EBlqBRrMAAAijVIAOAAMAAACjVg");
	var mask_graphics_25 = new cjs.Graphics().p("EBlqBRrMAAAijVIAOAAMAAACjVg");
	var mask_graphics_26 = new cjs.Graphics().p("EBlqBRrMAAAijVIAOAAMAAACjVg");
	var mask_graphics_27 = new cjs.Graphics().p("EBlqBRrMAAAijVIAOAAMAAACjVg");
	var mask_graphics_28 = new cjs.Graphics().p("EBlqBRrMAAAijVIAOAAMAAACjVg");
	var mask_graphics_29 = new cjs.Graphics().p("EBlqBRrMAAAijVIAOAAMAAACjVg");
	var mask_graphics_30 = new cjs.Graphics().p("EBlqBRrMAAAijVIAOAAMAAACjVg");
	var mask_graphics_31 = new cjs.Graphics().p("EBlqBRrMAAAijVIAOAAMAAACjVg");
	var mask_graphics_32 = new cjs.Graphics().p("EBlqBRrMAAAijVIAOAAMAAACjVg");
	var mask_graphics_33 = new cjs.Graphics().p("EBlqBRrMAAAijVIAOAAMAAACjVg");
	var mask_graphics_34 = new cjs.Graphics().p("EBlqBRrMAAAijVIAOAAMAAACjVg");
	var mask_graphics_35 = new cjs.Graphics().p("EBlqBRrMAAAijVIAOAAMAAACjVg");
	var mask_graphics_36 = new cjs.Graphics().p("EBlqBRrMAAAijVIAOAAMAAACjVg");
	var mask_graphics_37 = new cjs.Graphics().p("EBlqBRrMAAAijVIAOAAMAAACjVg");
	var mask_graphics_38 = new cjs.Graphics().p("EBlqBRrMAAAijVIAOAAMAAACjVg");
	var mask_graphics_39 = new cjs.Graphics().p("EBlqBRrMAAAijVIAOAAMAAACjVg");
	var mask_graphics_40 = new cjs.Graphics().p("EBlqBRrMAAAijVIAOAAMAAACjVg");
	var mask_graphics_41 = new cjs.Graphics().p("EBlqBRrMAAAijVIAOAAMAAACjVg");
	var mask_graphics_42 = new cjs.Graphics().p("EBlqBRrMAAAijVIAOAAMAAACjVg");
	var mask_graphics_43 = new cjs.Graphics().p("EBlqBRrMAAAijVIAOAAMAAACjVg");
	var mask_graphics_44 = new cjs.Graphics().p("EBlqBRrMAAAijVIAOAAMAAACjVg");
	var mask_graphics_45 = new cjs.Graphics().p("EBlqBRrMAAAijVIAOAAMAAACjVg");
	var mask_graphics_46 = new cjs.Graphics().p("EBlqBRrMAAAijVIAOAAMAAACjVg");
	var mask_graphics_47 = new cjs.Graphics().p("EBlqBRrMAAAijVIAOAAMAAACjVg");
	var mask_graphics_48 = new cjs.Graphics().p("EBlqBRrMAAAijVIAOAAMAAACjVg");
	var mask_graphics_49 = new cjs.Graphics().p("EBlqBRrMAAAijVIAOAAMAAACjVg");
	var mask_graphics_50 = new cjs.Graphics().p("EBlqBRrMAAAijVIAOAAMAAACjVg");
	var mask_graphics_51 = new cjs.Graphics().p("EBlqBRrMAAAijVIAOAAMAAACjVg");
	var mask_graphics_52 = new cjs.Graphics().p("EBlqBRrMAAAijVIAOAAMAAACjVg");
	var mask_graphics_53 = new cjs.Graphics().p("EBlqBRrMAAAijVIAOAAMAAACjVg");
	var mask_graphics_54 = new cjs.Graphics().p("EBlqBRrMAAAijVIAOAAMAAACjVg");
	var mask_graphics_55 = new cjs.Graphics().p("EBlqBRrMAAAijVIAOAAMAAACjVg");
	var mask_graphics_56 = new cjs.Graphics().p("EBlqBRrMAAAijVIAOAAMAAACjVg");
	var mask_graphics_57 = new cjs.Graphics().p("EBlqBRrMAAAijVIAOAAMAAACjVg");
	var mask_graphics_58 = new cjs.Graphics().p("EBlqBRrMAAAijVIAOAAMAAACjVg");
	var mask_graphics_59 = new cjs.Graphics().p("EBlqBRrMAAAijVIAOAAMAAACjVg");
	var mask_graphics_60 = new cjs.Graphics().p("EBlqBRrMAAAijVIAOAAMAAACjVg");
	var mask_graphics_61 = new cjs.Graphics().p("EBlqBRrMAAAijVIAOAAMAAACjVg");
	var mask_graphics_62 = new cjs.Graphics().p("EBlqBRrMAAAijVIAOAAMAAACjVg");
	var mask_graphics_63 = new cjs.Graphics().p("EBlqBRrMAAAijVIAOAAMAAACjVg");
	var mask_graphics_64 = new cjs.Graphics().p("EBlqBRrMAAAijVIAOAAMAAACjVg");
	var mask_graphics_65 = new cjs.Graphics().p("EBlqBRrMAAAijVIAOAAMAAACjVg");
	var mask_graphics_66 = new cjs.Graphics().p("EgAJBRrMAAAijVIAUAAMAAACjVg");
	var mask_graphics_67 = new cjs.Graphics().p("EgATBRrMAAAijVIAnAAMAAACjVg");
	var mask_graphics_68 = new cjs.Graphics().p("EgAjBRrMAAAijVIBHAAMAAACjVg");
	var mask_graphics_69 = new cjs.Graphics().p("EgA5BRrMAAAijVIBzAAMAAACjVg");
	var mask_graphics_70 = new cjs.Graphics().p("EgBVBRrMAAAijVICrAAMAAACjVg");
	var mask_graphics_71 = new cjs.Graphics().p("EgB4BRrMAAAijVIDyAAMAAACjVg");
	var mask_graphics_72 = new cjs.Graphics().p("EgCiBRrMAAAijVIFFAAMAAACjVg");
	var mask_graphics_73 = new cjs.Graphics().p("EgDSBRrMAAAijVIGlAAMAAACjVg");
	var mask_graphics_74 = new cjs.Graphics().p("EgEHBRrMAAAijVIIPAAMAAACjVg");
	var mask_graphics_75 = new cjs.Graphics().p("EgFEBRrMAAAijVIKJAAMAAACjVg");
	var mask_graphics_76 = new cjs.Graphics().p("EgGHBRrMAAAijVIMPAAMAAACjVg");
	var mask_graphics_77 = new cjs.Graphics().p("EgHQBRrMAAAijVIOhAAMAAACjVg");
	var mask_graphics_78 = new cjs.Graphics().p("EgIfBRrMAAAijVIQ/AAMAAACjVg");
	var mask_graphics_79 = new cjs.Graphics().p("EgJ1BRrMAAAijVITrAAMAAACjVg");
	var mask_graphics_80 = new cjs.Graphics().p("EgLRBRrMAAAijVIWjAAMAAACjVg");
	var mask_graphics_81 = new cjs.Graphics().p("EgM0BRrMAAAijVIZpAAMAAACjVg");
	var mask_graphics_82 = new cjs.Graphics().p("EgOcBRrMAAAijVIc5AAMAAACjVg");
	var mask_graphics_83 = new cjs.Graphics().p("EgQMBRrMAAAijVMAgZAAAMAAACjVg");
	var mask_graphics_84 = new cjs.Graphics().p("EgSBBRrMAAAijVMAkDAAAMAAACjVg");
	var mask_graphics_85 = new cjs.Graphics().p("EgT9BRrMAAAijVMAn7AAAMAAACjVg");
	var mask_graphics_86 = new cjs.Graphics().p("EgV/BRrMAAAijVMAr/AAAMAAACjVg");
	var mask_graphics_87 = new cjs.Graphics().p("EgYIBRrMAAAijVMAwRAAAMAAACjVg");
	var mask_graphics_88 = new cjs.Graphics().p("EgaXBRrMAAAijVMA0vAAAMAAACjVg");
	var mask_graphics_89 = new cjs.Graphics().p("EgctBRrMAAAijVMA5bAAAMAAACjVg");
	var mask_graphics_90 = new cjs.Graphics().p("EgfIBRrMAAAijVMA+RAAAMAAACjVg");
	var mask_graphics_91 = new cjs.Graphics().p("EghqBRrMAAAijVMBDVAAAMAAACjVg");
	var mask_graphics_92 = new cjs.Graphics().p("EgkTBRrMAAAijVMBInAAAMAAACjVg");
	var mask_graphics_93 = new cjs.Graphics().p("EgnCBRrMAAAijVMBOEAAAMAAACjVg");
	var mask_graphics_94 = new cjs.Graphics().p("Egp2BRrMAAAijVMBTtAAAMAAACjVg");
	var mask_graphics_95 = new cjs.Graphics().p("EgszBRrMAAAijVMBZmAAAMAAACjVg");
	var mask_graphics_96 = new cjs.Graphics().p("Egv0BRrMAAAijVMBfpAAAMAAACjVg");
	var mask_graphics_97 = new cjs.Graphics().p("Egy8BRrMAAAijVMBl5AAAMAAACjVg");
	var mask_graphics_98 = new cjs.Graphics().p("Eg2LBRrMAAAijVMBsXAAAMAAACjVg");
	var mask_graphics_99 = new cjs.Graphics().p("Eg5gBRrMAAAijVMBzBAAAMAAACjVg");
	var mask_graphics_100 = new cjs.Graphics().p("Eg3HBJ5MAAAiTxMBuPAAAMAAACTxg");
	var mask_graphics_101 = new cjs.Graphics().p("Eg5tBJJMAAAiSQMBzbAAAMAAACSQg");
	var mask_graphics_102 = new cjs.Graphics().p("Eg8VBIZMAAAiQxMB4rAAAMAAACQxg");
	var mask_graphics_103 = new cjs.Graphics().p("Eg/ABHrMAAAiPVMB+BAAAMAAACPVg");
	var mask_graphics_104 = new cjs.Graphics().p("EhBtBG+MAAAiN7MCDbAAAMAAACN7g");
	var mask_graphics_105 = new cjs.Graphics().p("EhEcBGSMAAAiMjMCI5AAAMAAACMjg");
	var mask_graphics_106 = new cjs.Graphics().p("EhHPBFoMAAAiLOMCOeAAAMAAACLOg");
	var mask_graphics_107 = new cjs.Graphics().p("EhKCBE+MAAAiJ7MCUFAAAMAAACJ7g");
	var mask_graphics_108 = new cjs.Graphics().p("EhM5BEVMAAAiIpMCZzAAAMAAACIpg");
	var mask_graphics_109 = new cjs.Graphics().p("EhPxBDuMAAAiHaMCfjAAAMAAACHag");
	var mask_graphics_110 = new cjs.Graphics().p("EhSsBDHMAAAiGNMClZAAAMAAACGNg");
	var mask_graphics_111 = new cjs.Graphics().p("EhVqBCiMAAAiFDMCrVAAAMAAACFDg");
	var mask_graphics_112 = new cjs.Graphics().p("EhYqBB9MAAAiD6MCxUAAAMAAACD6g");
	var mask_graphics_113 = new cjs.Graphics().p("EhbsBBaMAAAiCzMC3ZAAAMAAACCzg");
	var mask_graphics_114 = new cjs.Graphics().p("EhexBA4MAAAiBvMC9jAAAMAAACBvg");
	var mask_graphics_115 = new cjs.Graphics().p("Ehh5BAXMAAAiAtMDDzAAAMAAACAtg");
	var mask_graphics_116 = new cjs.Graphics().p("EhlEA/3MAAAh/tMDKIAAAMAAAB/tg");
	var mask_graphics_117 = new cjs.Graphics().p("EhoRA/ZMAAAh+xMDQjAAAMAAAB+xg");
	var mask_graphics_118 = new cjs.Graphics().p("EhrhA+7MAAAh91MDXDAAAMAAAB91g");
	var mask_graphics_119 = new cjs.Graphics().p("Ehu1A+fMAAAh89MDdrAAAMAAAB89g");
	var mask_graphics_120 = new cjs.Graphics().p("EhuEA+DMAAAh8FMDcJAAAMAAAB8Fg");
	var mask_graphics_121 = new cjs.Graphics().p("EhtVA9pMAAAh7RMDarAAAMAAAB7Rg");
	var mask_graphics_122 = new cjs.Graphics().p("EhspA9PMAAAh6dMDZTAAAMAAAB6dg");
	var mask_graphics_123 = new cjs.Graphics().p("Ehr9A83MAAAh5tMDX7AAAMAAAB5tg");
	var mask_graphics_124 = new cjs.Graphics().p("EhrUA8gMAAAh4/MDWpAAAMAAAB4/g");
	var mask_graphics_125 = new cjs.Graphics().p("EhqtA8KMAAAh4TMDVbAAAMAAAB4Tg");
	var mask_graphics_126 = new cjs.Graphics().p("EhqIA71MAAAh3pMDURAAAMAAAB3pg");
	var mask_graphics_127 = new cjs.Graphics().p("EhpkA7hMAAAh3BMDTJAAAMAAAB3Bg");
	var mask_graphics_128 = new cjs.Graphics().p("EhpCA7OMAAAh2bMDSFAAAMAAAB2bg");
	var mask_graphics_129 = new cjs.Graphics().p("EhoiA68MAAAh13MDRFAAAMAAAB13g");
	var mask_graphics_130 = new cjs.Graphics().p("EhoEA6rMAAAh1VMDQJAAAMAAAB1Vg");
	var mask_graphics_131 = new cjs.Graphics().p("EhnoA6bMAAAh01MDPRAAAMAAAB01g");
	var mask_graphics_132 = new cjs.Graphics().p("EhnNA6MMAAAh0XMDObAAAMAAAB0Xg");
	var mask_graphics_133 = new cjs.Graphics().p("Ehm0A5+MAAAhz7MDNpAAAMAAABz7g");
	var mask_graphics_134 = new cjs.Graphics().p("EhmdA5xMAAAhzhMDM7AAAMAAABzhg");
	var mask_graphics_135 = new cjs.Graphics().p("EhmIA5lMAAAhzJMDMRAAAMAAABzJg");
	var mask_graphics_136 = new cjs.Graphics().p("Ehl0A5aMAAAhyyMDLpAAAMAAAByyg");
	var mask_graphics_137 = new cjs.Graphics().p("EhliA5QMAAAhyeMDLFAAAMAAAByeg");
	var mask_graphics_138 = new cjs.Graphics().p("EhlSA5GMAAAhyLMDKlAAAMAAAByLg");
	var mask_graphics_139 = new cjs.Graphics().p("EhlEA4+MAAAhx7MDKJAAAMAAABx7g");
	var mask_graphics_140 = new cjs.Graphics().p("Ehk3A43MAAAhxtMDJvAAAMAAABxtg");
	var mask_graphics_141 = new cjs.Graphics().p("EhksA4xMAAAhxhMDJZAAAMAAABxhg");
	var mask_graphics_142 = new cjs.Graphics().p("EhkjA4sMAAAhxXMDJHAAAMAAABxXg");
	var mask_graphics_143 = new cjs.Graphics().p("EhkbA4nMAAAhxNMDI3AAAMAAABxNg");
	var mask_graphics_144 = new cjs.Graphics().p("EhkVA4kMAAAhxHMDIrAAAMAAABxHg");
	var mask_graphics_145 = new cjs.Graphics().p("EhkQA4iMAAAhxDMDIjAAAMAAABxDg");
	var mask_graphics_146 = new cjs.Graphics().p("EhkNA4gMAAAhw/MDIeAAAMAAABw/g");
	var mask_graphics_147 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_148 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_149 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_150 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_151 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_152 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_153 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_154 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_155 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_156 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_157 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_158 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_159 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_160 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_161 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_162 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_163 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_164 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_165 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_166 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_167 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_168 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_169 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_170 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_171 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_172 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_173 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_174 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_175 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_176 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_177 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_178 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_179 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_180 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_181 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_182 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_183 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_184 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_185 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_186 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_187 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_188 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_189 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_190 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_191 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_192 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_193 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_194 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_195 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_196 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_197 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_198 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_199 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_200 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_201 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_202 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_203 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_204 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_205 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_206 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_207 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_208 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_209 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_210 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_211 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_212 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_213 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_214 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_215 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_216 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_217 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_218 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_219 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_220 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_221 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_222 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_223 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_224 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_225 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_226 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_227 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_228 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_229 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_230 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_231 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_232 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_233 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_234 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_235 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_236 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_237 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_238 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_239 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_240 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_241 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_242 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_243 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_244 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_245 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_246 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_247 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_248 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIcAAAMAAABw/g");
	var mask_graphics_249 = new cjs.Graphics().p("EhkKA4gMAAAhw/MDIdAAAMAAABw/g");
	var mask_graphics_250 = new cjs.Graphics().p("EhkPA4iMAAAhxDMDIjAAAMAAABxDg");
	var mask_graphics_251 = new cjs.Graphics().p("EhkcA4oMAAAhxPMDI5AAAMAAABxPg");
	var mask_graphics_252 = new cjs.Graphics().p("EhkvA4zMAAAhxkMDJfAAAMAAABxkg");
	var mask_graphics_253 = new cjs.Graphics().p("EhlJA5BMAAAhyBMDKTAAAMAAAByBg");
	var mask_graphics_254 = new cjs.Graphics().p("EhlqA5UMAAAhynMDLVAAAMAAAByng");
	var mask_graphics_255 = new cjs.Graphics().p("EhmUA5rMAAAhzVMDMpAAAMAAABzVg");
	var mask_graphics_256 = new cjs.Graphics().p("EhnFA6HMAAAh0NMDOLAAAMAAAB0Ng");
	var mask_graphics_257 = new cjs.Graphics().p("Ehn+A6nMAAAh1NMDP9AAAMAAAB1Ng");
	var mask_graphics_258 = new cjs.Graphics().p("Eho/A7MMAAAh2XMDR/AAAMAAAB2Xg");
	var mask_graphics_259 = new cjs.Graphics().p("EhqIA71MAAAh3pMDURAAAMAAAB3pg");
	var mask_graphics_260 = new cjs.Graphics().p("EhrZA8jMAAAh5FMDWzAAAMAAAB5Fg");
	var mask_graphics_261 = new cjs.Graphics().p("Ehs0A9WMAAAh6rMDZpAAAMAAAB6rg");
	var mask_graphics_262 = new cjs.Graphics().p("EhuXA+OMAAAh8bMDcvAAAMAAAB8bg");
	var mask_graphics_263 = new cjs.Graphics().p("EhwEA/LMAAAh+VMDgJAAAMAAAB+Vg");
	var mask_graphics_264 = new cjs.Graphics().p("Ehx6BAOMAAAiAbMDj1AAAMAAACAbg");
	var mask_graphics_265 = new cjs.Graphics().p("Ehz5BBWMAAAiCrMDnzAAAMAAACCrg");
	var mask_graphics_266 = new cjs.Graphics().p("Eh2DBCjMAAAiFFMDsHAAAMAAACFFg");
	var mask_graphics_267 = new cjs.Graphics().p("Eh4XBD3MAAAiHtMDwvAAAMAAACHtg");
	var mask_graphics_268 = new cjs.Graphics().p("Eh62BFQMAAAiKfMD1tAAAMAAACKfg");
	var mask_graphics_269 = new cjs.Graphics().p("Eh9gBGwMAAAiNfMD7BAAAMAAACNfg");
	var mask_graphics_270 = new cjs.Graphics().p("EiAUBIWMAAAiQrMEApAAAMAAACQrg");
	var mask_graphics_271 = new cjs.Graphics().p("EiDVBKCMAAAiUDMEGrAAAMAAACUDg");
	var mask_graphics_272 = new cjs.Graphics().p("EiGhBL1MAAAiXpMENDAAAMAAACXpg");
	var mask_graphics_273 = new cjs.Graphics().p("EiJ5BNvMAAAibdMETzAAAMAAACbdg");
	var mask_graphics_274 = new cjs.Graphics().p("EiNdBPvMAAAifdMEa7AAAMAAACfdg");
	var mask_graphics_275 = new cjs.Graphics().p("EiRNBR3MAAAijtMEibAAAMAAACjtg");
	var mask_graphics_276 = new cjs.Graphics().p("EiVJBUFMAAAioJMEqTAAAMAAACoJg");
	var mask_graphics_277 = new cjs.Graphics().p("EiZRBWaMAAAiszMEyjAAAMAAACszg");
	var mask_graphics_278 = new cjs.Graphics().p("EidkBY1MAAAixpME7JAAAMAAACxpg");
	var mask_graphics_279 = new cjs.Graphics().p("EiiDBbWMAAAi2rMFEHAAAMAAAC2rg");
	var mask_graphics_280 = new cjs.Graphics().p("EimtBd+MAAAi77MFNbAAAMAAAC77g");
	var mask_graphics_281 = new cjs.Graphics().p("EirfBgrMAAAjBVMFW/AAAMAAADBVg");
	var mask_graphics_282 = new cjs.Graphics().p("EiwbBjdMAAAjG5MFg3AAAMAAADG5g");
	var mask_graphics_283 = new cjs.Graphics().p("Ei1dBmSMAAAjMjMFq7AAAMAAADMjg");
	var mask_graphics_284 = new cjs.Graphics().p("Ei6lBpLMAAAjSVMF1LAAAMAAADSVg");
	var mask_graphics_285 = new cjs.Graphics().p("Ei/vBsFMAAAjYJMF/fAAAMAAADYJg");
	var mask_graphics_286 = new cjs.Graphics().p("EjE6BvAMAAAjd/MGJ1AAAMAAADd/g");
	var mask_graphics_287 = new cjs.Graphics().p("EjKDBx5MAAAjjxMGUHAAAMAAADjxg");
	var mask_graphics_288 = new cjs.Graphics().p("EjPHB0wMAAAjpfMGePAAAMAAADpfg");
	var mask_graphics_289 = new cjs.Graphics().p("EjUBB3hMAAAjvBMGoDAAAMAAADvBg");
	var mask_graphics_290 = new cjs.Graphics().p("EjYvB6LMAAAj0VMGxfAAAMAAAD0Vg");
	var mask_graphics_291 = new cjs.Graphics().p("EjdNB8sMAAAj5XMG6bAAAMAAAD5Xg");
	var mask_graphics_292 = new cjs.Graphics().p("EjhWB/CMAAAj+DMHCtAAAMAAAD+Dg");
	var mask_graphics_293 = new cjs.Graphics().p("EjlFCBJMAAAkCRMHKLAAAMAAAECRg");
	var mask_graphics_294 = new cjs.Graphics().p("EjoYCDAMAAAkF/MHQxAAAMAAAEF/g");
	var mask_graphics_295 = new cjs.Graphics().p("EjrKCEkMAAAkJHMHWVAAAMAAAEJHg");
	var mask_graphics_296 = new cjs.Graphics().p("EjtZCF0MAAAkLnMHazAAAMAAAELng");
	var mask_graphics_297 = new cjs.Graphics().p("EjvBCGvMAAAkNdMHeDAAAMAAAENdg");
	var mask_graphics_298 = new cjs.Graphics().p("EjwACHTMAAAkOlMHgBAAAMAAAEOlg");
	var mask_graphics_299 = new cjs.Graphics().p("EjwUCHeMAAAkO7MHgpAAAMAAAEO7g");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:mask_graphics_0,x:652.0115,y:521.5575}).wait(1).to({graphics:mask_graphics_1,x:652.0115,y:521.5575}).wait(1).to({graphics:mask_graphics_2,x:652.0115,y:521.5575}).wait(1).to({graphics:mask_graphics_3,x:652.0115,y:521.5575}).wait(1).to({graphics:mask_graphics_4,x:652.0115,y:521.5575}).wait(1).to({graphics:mask_graphics_5,x:652.0115,y:521.5575}).wait(1).to({graphics:mask_graphics_6,x:652.0115,y:521.5575}).wait(1).to({graphics:mask_graphics_7,x:652.0115,y:521.5575}).wait(1).to({graphics:mask_graphics_8,x:652.0115,y:521.5575}).wait(1).to({graphics:mask_graphics_9,x:652.0115,y:521.5575}).wait(1).to({graphics:mask_graphics_10,x:652.0115,y:521.5575}).wait(1).to({graphics:mask_graphics_11,x:652.0115,y:521.5575}).wait(1).to({graphics:mask_graphics_12,x:652.0115,y:521.5575}).wait(1).to({graphics:mask_graphics_13,x:652.0115,y:521.5575}).wait(1).to({graphics:mask_graphics_14,x:652.0115,y:521.5575}).wait(1).to({graphics:mask_graphics_15,x:652.0115,y:521.5575}).wait(1).to({graphics:mask_graphics_16,x:652.0115,y:521.5575}).wait(1).to({graphics:mask_graphics_17,x:652.0115,y:521.5575}).wait(1).to({graphics:mask_graphics_18,x:652.0115,y:521.5575}).wait(1).to({graphics:mask_graphics_19,x:652.0115,y:521.5575}).wait(1).to({graphics:mask_graphics_20,x:652.0115,y:521.5575}).wait(1).to({graphics:mask_graphics_21,x:652.0115,y:521.5575}).wait(1).to({graphics:mask_graphics_22,x:652.0115,y:521.5575}).wait(1).to({graphics:mask_graphics_23,x:652.0115,y:521.5575}).wait(1).to({graphics:mask_graphics_24,x:652.0115,y:521.5575}).wait(1).to({graphics:mask_graphics_25,x:652.0115,y:521.5575}).wait(1).to({graphics:mask_graphics_26,x:652.0115,y:521.5575}).wait(1).to({graphics:mask_graphics_27,x:652.0115,y:521.5575}).wait(1).to({graphics:mask_graphics_28,x:652.0115,y:521.5575}).wait(1).to({graphics:mask_graphics_29,x:652.0115,y:521.5575}).wait(1).to({graphics:mask_graphics_30,x:652.0115,y:521.5575}).wait(1).to({graphics:mask_graphics_31,x:652.0115,y:521.5575}).wait(1).to({graphics:mask_graphics_32,x:652.0115,y:521.5575}).wait(1).to({graphics:mask_graphics_33,x:652.0115,y:521.5575}).wait(1).to({graphics:mask_graphics_34,x:652.0115,y:521.5575}).wait(1).to({graphics:mask_graphics_35,x:652.0115,y:521.5575}).wait(1).to({graphics:mask_graphics_36,x:652.0115,y:521.5575}).wait(1).to({graphics:mask_graphics_37,x:652.0115,y:521.5575}).wait(1).to({graphics:mask_graphics_38,x:652.0115,y:521.5575}).wait(1).to({graphics:mask_graphics_39,x:652.0115,y:521.5575}).wait(1).to({graphics:mask_graphics_40,x:652.0115,y:521.5575}).wait(1).to({graphics:mask_graphics_41,x:652.0115,y:521.5575}).wait(1).to({graphics:mask_graphics_42,x:652.0115,y:521.5575}).wait(1).to({graphics:mask_graphics_43,x:652.0115,y:521.5575}).wait(1).to({graphics:mask_graphics_44,x:652.0115,y:521.5575}).wait(1).to({graphics:mask_graphics_45,x:652.0115,y:521.5575}).wait(1).to({graphics:mask_graphics_46,x:652.0115,y:521.5575}).wait(1).to({graphics:mask_graphics_47,x:652.0115,y:521.5575}).wait(1).to({graphics:mask_graphics_48,x:652.0115,y:521.5575}).wait(1).to({graphics:mask_graphics_49,x:652.0115,y:521.5575}).wait(1).to({graphics:mask_graphics_50,x:652.0115,y:521.5575}).wait(1).to({graphics:mask_graphics_51,x:652.0115,y:521.5575}).wait(1).to({graphics:mask_graphics_52,x:652.0115,y:521.5575}).wait(1).to({graphics:mask_graphics_53,x:652.0115,y:521.5575}).wait(1).to({graphics:mask_graphics_54,x:652.0115,y:521.5575}).wait(1).to({graphics:mask_graphics_55,x:652.0115,y:521.5575}).wait(1).to({graphics:mask_graphics_56,x:652.0115,y:521.5575}).wait(1).to({graphics:mask_graphics_57,x:652.0115,y:521.5575}).wait(1).to({graphics:mask_graphics_58,x:652.0115,y:521.5575}).wait(1).to({graphics:mask_graphics_59,x:652.0115,y:521.5575}).wait(1).to({graphics:mask_graphics_60,x:652.0115,y:521.5575}).wait(1).to({graphics:mask_graphics_61,x:652.0115,y:521.5575}).wait(1).to({graphics:mask_graphics_62,x:652.0115,y:521.5575}).wait(1).to({graphics:mask_graphics_63,x:652.0115,y:521.5575}).wait(1).to({graphics:mask_graphics_64,x:652.0115,y:521.5575}).wait(1).to({graphics:mask_graphics_65,x:652.0115,y:521.5575}).wait(1).to({graphics:mask_graphics_66,x:1302.95,y:521.55}).wait(1).to({graphics:mask_graphics_67,x:1302,y:521.55}).wait(1).to({graphics:mask_graphics_68,x:1300.425,y:521.55}).wait(1).to({graphics:mask_graphics_69,x:1298.2,y:521.55}).wait(1).to({graphics:mask_graphics_70,x:1295.375,y:521.55}).wait(1).to({graphics:mask_graphics_71,x:1291.85,y:521.55}).wait(1).to({graphics:mask_graphics_72,x:1287.7,y:521.55}).wait(1).to({graphics:mask_graphics_73,x:1282.95,y:521.55}).wait(1).to({graphics:mask_graphics_74,x:1277.575,y:521.5}).wait(1).to({graphics:mask_graphics_75,x:1271.575,y:521.5}).wait(1).to({graphics:mask_graphics_76,x:1264.925,y:521.5}).wait(1).to({graphics:mask_graphics_77,x:1257.6,y:521.5}).wait(1).to({graphics:mask_graphics_78,x:1249.675,y:521.5}).wait(1).to({graphics:mask_graphics_79,x:1241.075,y:521.5}).wait(1).to({graphics:mask_graphics_80,x:1231.9,y:521.4}).wait(1).to({graphics:mask_graphics_81,x:1222.025,y:521.4}).wait(1).to({graphics:mask_graphics_82,x:1211.575,y:521.4}).wait(1).to({graphics:mask_graphics_83,x:1200.475,y:521.4}).wait(1).to({graphics:mask_graphics_84,x:1188.725,y:521.4}).wait(1).to({graphics:mask_graphics_85,x:1176.35,y:521.35}).wait(1).to({graphics:mask_graphics_86,x:1163.325,y:521.35}).wait(1).to({graphics:mask_graphics_87,x:1149.675,y:521.35}).wait(1).to({graphics:mask_graphics_88,x:1135.425,y:521.25}).wait(1).to({graphics:mask_graphics_89,x:1120.5,y:521.25}).wait(1).to({graphics:mask_graphics_90,x:1104.925,y:521.25}).wait(1).to({graphics:mask_graphics_91,x:1088.725,y:521.2}).wait(1).to({graphics:mask_graphics_92,x:1071.925,y:521.2}).wait(1).to({graphics:mask_graphics_93,x:1054.45,y:521.2}).wait(1).to({graphics:mask_graphics_94,x:1036.35,y:521.125}).wait(1).to({graphics:mask_graphics_95,x:1017.65,y:521.125}).wait(1).to({graphics:mask_graphics_96,x:998.275,y:521.05}).wait(1).to({graphics:mask_graphics_97,x:978.275,y:521.05}).wait(1).to({graphics:mask_graphics_98,x:957.675,y:521.05}).wait(1).to({graphics:mask_graphics_99,x:936.375,y:520.975}).wait(1).to({graphics:mask_graphics_100,x:1118.175,y:426.425}).wait(1).to({graphics:mask_graphics_101,x:1093.425,y:423.55}).wait(1).to({graphics:mask_graphics_102,x:1068.625,y:420.75}).wait(1).to({graphics:mask_graphics_103,x:1043.75,y:418.025}).wait(1).to({graphics:mask_graphics_104,x:1018.975,y:415.375}).wait(1).to({graphics:mask_graphics_105,x:993.95,y:412.75}).wait(1).to({graphics:mask_graphics_106,x:969.05,y:410.15}).wait(1).to({graphics:mask_graphics_107,x:944,y:407.725}).wait(1).to({graphics:mask_graphics_108,x:918.875,y:405.2}).wait(1).to({graphics:mask_graphics_109,x:893.825,y:402.9}).wait(1).to({graphics:mask_graphics_110,x:868.575,y:400.6}).wait(1).to({graphics:mask_graphics_111,x:843.4,y:398.325}).wait(1).to({graphics:mask_graphics_112,x:818.05,y:396.25}).wait(1).to({graphics:mask_graphics_113,x:792.75,y:394.075}).wait(1).to({graphics:mask_graphics_114,x:767.275,y:392.05}).wait(1).to({graphics:mask_graphics_115,x:741.825,y:390.125}).wait(1).to({graphics:mask_graphics_116,x:716.15,y:388.175}).wait(1).to({graphics:mask_graphics_117,x:690.425,y:386.325}).wait(1).to({graphics:mask_graphics_118,x:664.65,y:384.55}).wait(1).to({graphics:mask_graphics_119,x:638.7414,y:382.8584}).wait(1).to({graphics:mask_graphics_120,x:638.9963,y:381.2618}).wait(1).to({graphics:mask_graphics_121,x:639.2263,y:379.7751}).wait(1).to({graphics:mask_graphics_122,x:639.4207,y:378.2482}).wait(1).to({graphics:mask_graphics_123,x:639.6658,y:376.8203}).wait(1).to({graphics:mask_graphics_124,x:639.8293,y:375.3967}).wait(1).to({graphics:mask_graphics_125,x:639.9571,y:374.1829}).wait(1).to({graphics:mask_graphics_126,x:640.2426,y:372.9235}).wait(1).to({graphics:mask_graphics_127,x:640.3463,y:371.7685}).wait(1).to({graphics:mask_graphics_128,x:640.4833,y:370.6069}).wait(1).to({graphics:mask_graphics_129,x:640.6522,y:369.6606}).wait(1).to({graphics:mask_graphics_130,x:640.8544,y:368.6078}).wait(1).to({graphics:mask_graphics_131,x:640.9249,y:367.6593}).wait(1).to({graphics:mask_graphics_132,x:641.0855,y:366.7596}).wait(1).to({graphics:mask_graphics_133,x:641.1536,y:365.9644}).wait(1).to({graphics:mask_graphics_134,x:641.2983,y:365.157}).wait(1).to({graphics:mask_graphics_135,x:641.4073,y:364.4595}).wait(1).to({graphics:mask_graphics_136,x:641.4428,y:363.7999}).wait(1).to({graphics:mask_graphics_137,x:641.6035,y:363.2501}).wait(1).to({graphics:mask_graphics_138,x:641.6799,y:362.7382}).wait(1).to({graphics:mask_graphics_139,x:641.7964,y:362.1752}).wait(1).to({graphics:mask_graphics_140,x:641.7568,y:361.7556}).wait(1).to({graphics:mask_graphics_141,x:641.8749,y:361.4404}).wait(1).to({graphics:mask_graphics_142,x:641.8588,y:361.1131}).wait(1).to({graphics:mask_graphics_143,x:641.9327,y:360.8346}).wait(1).to({graphics:mask_graphics_144,x:641.9682,y:360.655}).wait(1).to({graphics:mask_graphics_145,x:641.879,y:360.5133}).wait(1).to({graphics:mask_graphics_146,x:641.7366,y:360.476}).wait(1).to({graphics:mask_graphics_147,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_148,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_149,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_150,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_151,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_152,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_153,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_154,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_155,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_156,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_157,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_158,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_159,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_160,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_161,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_162,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_163,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_164,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_165,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_166,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_167,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_168,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_169,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_170,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_171,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_172,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_173,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_174,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_175,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_176,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_177,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_178,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_179,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_180,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_181,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_182,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_183,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_184,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_185,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_186,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_187,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_188,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_189,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_190,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_191,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_192,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_193,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_194,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_195,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_196,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_197,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_198,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_199,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_200,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_201,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_202,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_203,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_204,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_205,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_206,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_207,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_208,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_209,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_210,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_211,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_212,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_213,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_214,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_215,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_216,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_217,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_218,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_219,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_220,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_221,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_222,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_223,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_224,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_225,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_226,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_227,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_228,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_229,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_230,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_231,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_232,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_233,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_234,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_235,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_236,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_237,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_238,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_239,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_240,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_241,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_242,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_243,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_244,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_245,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_246,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_247,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_248,x:641.822,y:360.621}).wait(1).to({graphics:mask_graphics_249,x:641.8608,y:360.5765}).wait(1).to({graphics:mask_graphics_250,x:642.0146,y:360.7798}).wait(1).to({graphics:mask_graphics_251,x:642.2674,y:361.356}).wait(1).to({graphics:mask_graphics_252,x:642.3647,y:362.2497}).wait(1).to({graphics:mask_graphics_253,x:642.3705,y:363.5664}).wait(1).to({graphics:mask_graphics_254,x:642.5174,y:365.3005}).wait(1).to({graphics:mask_graphics_255,x:642.6064,y:367.3906}).wait(1).to({graphics:mask_graphics_256,x:642.7365,y:369.8482}).wait(1).to({graphics:mask_graphics_257,x:642.8563,y:372.6952}).wait(1).to({graphics:mask_graphics_258,x:643.0667,y:375.9701}).wait(1).to({graphics:mask_graphics_259,x:643.2019,y:379.6455}).wait(1).to({graphics:mask_graphics_260,x:643.5103,y:383.7933}).wait(1).to({graphics:mask_graphics_261,x:643.7794,y:388.3409}).wait(1).to({graphics:mask_graphics_262,x:644.0203,y:393.283}).wait(1).to({graphics:mask_graphics_263,x:644.3099,y:398.7469}).wait(1).to({graphics:mask_graphics_264,x:644.6575,y:404.7046}).wait(1).to({graphics:mask_graphics_265,x:645.0062,y:411.1006}).wait(1).to({graphics:mask_graphics_266,x:645.4439,y:418.057}).wait(1).to({graphics:mask_graphics_267,x:645.7542,y:425.5066}).wait(1).to({graphics:mask_graphics_268,x:646.3154,y:433.455}).wait(1).to({graphics:mask_graphics_269,x:646.6585,y:441.9686}).wait(1).to({graphics:mask_graphics_270,x:647.1686,y:451.1084}).wait(1).to({graphics:mask_graphics_271,x:647.7941,y:460.7964}).wait(1).to({graphics:mask_graphics_272,x:648.3013,y:471.1101}).wait(1).to({graphics:mask_graphics_273,x:648.9658,y:481.9384}).wait(1).to({graphics:mask_graphics_274,x:649.5202,y:493.3759}).wait(1).to({graphics:mask_graphics_275,x:650.248,y:505.4556}).wait(1).to({graphics:mask_graphics_276,x:650.8923,y:518.1719}).wait(1).to({graphics:mask_graphics_277,x:651.6441,y:531.4529}).wait(1).to({graphics:mask_graphics_278,x:652.4288,y:545.3375}).wait(1).to({graphics:mask_graphics_279,x:653.1698,y:559.6984}).wait(1).to({graphics:mask_graphics_280,x:654.0183,y:574.6636}).wait(1).to({graphics:mask_graphics_281,x:654.9763,y:590.1506}).wait(1).to({graphics:mask_graphics_282,x:655.7386,y:606.0264}).wait(1).to({graphics:mask_graphics_283,x:656.6122,y:622.1313}).wait(1).to({graphics:mask_graphics_284,x:657.4572,y:638.5713}).wait(1).to({graphics:mask_graphics_285,x:658.4623,y:655.3822}).wait(1).to({graphics:mask_graphics_286,x:659.4913,y:671.9644}).wait(1).to({graphics:mask_graphics_287,x:660.3699,y:688.4874}).wait(1).to({graphics:mask_graphics_288,x:661.2594,y:704.7802}).wait(1).to({graphics:mask_graphics_289,x:662.0138,y:720.5621}).wait(1).to({graphics:mask_graphics_290,x:663.0379,y:735.7464}).wait(1).to({graphics:mask_graphics_291,x:663.6699,y:750.0749}).wait(1).to({graphics:mask_graphics_292,x:664.4645,y:763.5608}).wait(1).to({graphics:mask_graphics_293,x:665.1193,y:775.4575}).wait(1).to({graphics:mask_graphics_294,x:665.7665,y:786.1002}).wait(1).to({graphics:mask_graphics_295,x:666.2004,y:795.0417}).wait(1).to({graphics:mask_graphics_296,x:666.538,y:802.2282}).wait(1).to({graphics:mask_graphics_297,x:666.787,y:807.4839}).wait(1).to({graphics:mask_graphics_298,x:667.0574,y:810.71}).wait(1).to({graphics:mask_graphics_299,x:667.9554,y:812.5026}).wait(1));

	// stars_obj_
	this.stars = new lib.Scene_1_stars();
	this.stars.name = "stars";
	this.stars.setTransform(673,237.4,1.452,1.452,0,0,0,844.4,164.3);
	this.stars.depth = 0;
	this.stars.isAttachedToCamera = 0
	this.stars.isAttachedToMask = 0
	this.stars.layerDepth = 0
	this.stars.layerIndex = 8
	this.stars.maskLayerName = 0

	var maskedShapeInstanceList = [this.stars];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.stars).wait(300));

	// Sky_obj_
	this.Sky = new lib.Scene_1_Sky();
	this.Sky.name = "Sky";
	this.Sky.setTransform(640,360.1,1.452,1.452,0,0,0,821.7,248.8);
	this.Sky.depth = 0;
	this.Sky.isAttachedToCamera = 0
	this.Sky.isAttachedToMask = 0
	this.Sky.layerDepth = 0
	this.Sky.layerIndex = 9
	this.Sky.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.Sky).wait(300));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(425,358.9,967.5,367.20000000000005);
// library properties:
lib.properties = {
	id: '326C41FC9C919C4EB646036A21FF4CE2',
	width: 1280,
	height: 720,
	fps: 30,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/CachedBmp_120.png", id:"CachedBmp_120"},
		{src:"images/CachedBmp_119.png", id:"CachedBmp_119"},
		{src:"images/elmarAnimation_interactive_atlas_1.png", id:"elmarAnimation_interactive_atlas_1"},
		{src:"images/elmarAnimation_interactive_atlas_2.png", id:"elmarAnimation_interactive_atlas_2"},
		{src:"images/elmarAnimation_interactive_atlas_3.png", id:"elmarAnimation_interactive_atlas_3"},
		{src:"sounds/AcousticEchoes.mp3", id:"AcousticEchoes"},
		{src:"sounds/hover.mp3", id:"hover"},
		{src:"sounds/press.mp3", id:"press"}
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
an.compositions['326C41FC9C919C4EB646036A21FF4CE2'] = {
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

p._getProjectionMatrix = function(container, totalDepth) {	var focalLength = 528.25;
	var projectionCenter = { x : lib.properties.width/2, y : lib.properties.height/2 };
	var scale = (totalDepth + focalLength)/focalLength;
	var scaleMat = new createjs.Matrix2D;
	scaleMat.a = 1/scale;
	scaleMat.d = 1/scale;
	var projMat = new createjs.Matrix2D;
	projMat.tx = -projectionCenter.x;
	projMat.ty = -projectionCenter.y;
	projMat = projMat.prependMatrix(scaleMat);
	projMat.tx += projectionCenter.x;
	projMat.ty += projectionCenter.y;
	return projMat;
}
p._handleTick = function(event) {
	var cameraInstance = exportRoot.___camera___instance;
	if(cameraInstance !== undefined && cameraInstance.pinToObject !== undefined)
	{
		cameraInstance.x = cameraInstance.pinToObject.x + cameraInstance.pinToObject.pinOffsetX;
		cameraInstance.y = cameraInstance.pinToObject.y + cameraInstance.pinToObject.pinOffsetY;
		if(cameraInstance.pinToObject.parent !== undefined && cameraInstance.pinToObject.parent.depth !== undefined)
		cameraInstance.depth = cameraInstance.pinToObject.parent.depth + cameraInstance.pinToObject.pinOffsetZ;
	}
	stage._applyLayerZDepth(exportRoot);
}
p._applyLayerZDepth = function(parent)
{
	var cameraInstance = parent.___camera___instance;
	var focalLength = 528.25;
	var projectionCenter = { 'x' : 0, 'y' : 0};
	if(parent === exportRoot)
	{
		var stageCenter = { 'x' : lib.properties.width/2, 'y' : lib.properties.height/2 };
		projectionCenter.x = stageCenter.x;
		projectionCenter.y = stageCenter.y;
	}
	for(child in parent.children)
	{
		var layerObj = parent.children[child];
		if(layerObj == cameraInstance)
			continue;
		stage._applyLayerZDepth(layerObj, cameraInstance);
		if(layerObj.layerDepth === undefined)
			continue;
		if(layerObj.currentFrame != layerObj.parent.currentFrame)
		{
			layerObj.gotoAndPlay(layerObj.parent.currentFrame);
		}
		var matToApply = new createjs.Matrix2D;
		var cameraMat = new createjs.Matrix2D;
		var totalDepth = layerObj.layerDepth ? layerObj.layerDepth : 0;
		var cameraDepth = 0;
		if(cameraInstance && !layerObj.isAttachedToCamera)
		{
			var mat = cameraInstance.getMatrix();
			mat.tx -= projectionCenter.x;
			mat.ty -= projectionCenter.y;
			cameraMat = mat.invert();
			cameraMat.prependTransform(projectionCenter.x, projectionCenter.y, 1, 1, 0, 0, 0, 0, 0);
			cameraMat.appendTransform(-projectionCenter.x, -projectionCenter.y, 1, 1, 0, 0, 0, 0, 0);
			if(cameraInstance.depth)
				cameraDepth = cameraInstance.depth;
		}
		if(layerObj.depth)
		{
			totalDepth = layerObj.depth;
		}
		//Offset by camera depth
		totalDepth -= cameraDepth;
		if(totalDepth < -focalLength)
		{
			matToApply.a = 0;
			matToApply.d = 0;
		}
		else
		{
			if(layerObj.layerDepth)
			{
				var sizeLockedMat = stage._getProjectionMatrix(parent, layerObj.layerDepth);
				if(sizeLockedMat)
				{
					sizeLockedMat.invert();
					matToApply.prependMatrix(sizeLockedMat);
				}
			}
			matToApply.prependMatrix(cameraMat);
			var projMat = stage._getProjectionMatrix(parent, totalDepth);
			if(projMat)
			{
				matToApply.prependMatrix(projMat);
			}
		}
		layerObj.transformMatrix = matToApply;
	}
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

// Virtual camera API : 

an.VirtualCamera = new function() {
var _camera = new Object();
function VC(timeline) {
	this.timeline = timeline;
	this.camera = timeline.___camera___instance;
	this.centerX = lib.properties.width / 2;
	this.centerY = lib.properties.height / 2;
	this.camAxisX = this.camera.x;
	this.camAxisY = this.camera.y;
	if(timeline.___camera___instance == null || timeline.___camera___instance == undefined ) {
		timeline.___camera___instance = new cjs.MovieClip();
		timeline.___camera___instance.visible = false;
		timeline.___camera___instance.parent = timeline;
		timeline.___camera___instance.setTransform(this.centerX, this.centerY);
	}
	this.camera = timeline.___camera___instance;
}

VC.prototype.moveBy = function(x, y, z) {
z = typeof z !== 'undefined' ? z : 0;
	var position = this.___getCamPosition___();
	var rotAngle = this.getRotation()*Math.PI/180;
	var sinTheta = Math.sin(rotAngle);
	var cosTheta = Math.cos(rotAngle);
	var offX= x*cosTheta + y*sinTheta;
	var offY = y*cosTheta - x*sinTheta;
	this.camAxisX = this.camAxisX - x;
	this.camAxisY = this.camAxisY - y;
	var posX = position.x + offX;
	var posY = position.y + offY;
	this.camera.x = this.centerX - posX;
	this.camera.y = this.centerY - posY;
	this.camera.depth += z;
};

VC.prototype.setPosition = function(x, y, z) {
	z = typeof z !== 'undefined' ? z : 0;

	const MAX_X = 10000;
	const MIN_X = -10000;
	const MAX_Y = 10000;
	const MIN_Y = -10000;
	const MAX_Z = 10000;
	const MIN_Z = -5000;

	if(x > MAX_X)
	  x = MAX_X;
	else if(x < MIN_X)
	  x = MIN_X;
	if(y > MAX_Y)
	  y = MAX_Y;
	else if(y < MIN_Y)
	  y = MIN_Y;
	if(z > MAX_Z)
	  z = MAX_Z;
	else if(z < MIN_Z)
	  z = MIN_Z;

	var rotAngle = this.getRotation()*Math.PI/180;
	var sinTheta = Math.sin(rotAngle);
	var cosTheta = Math.cos(rotAngle);
	var offX= x*cosTheta + y*sinTheta;
	var offY = y*cosTheta - x*sinTheta;
	
	this.camAxisX = this.centerX - x;
	this.camAxisY = this.centerY - y;
	this.camera.x = this.centerX - offX;
	this.camera.y = this.centerY - offY;
	this.camera.depth = z;
};

VC.prototype.getPosition = function() {
	var loc = new Object();
	loc['x'] = this.centerX - this.camAxisX;
	loc['y'] = this.centerY - this.camAxisY;
	loc['z'] = this.camera.depth;
	return loc;
};

VC.prototype.resetPosition = function() {
	this.setPosition(0, 0);
};

VC.prototype.zoomBy = function(zoom) {
	this.setZoom( (this.getZoom() * zoom) / 100);
};

VC.prototype.setZoom = function(zoom) {
	const MAX_zoom = 10000;
	const MIN_zoom = 1;
	if(zoom > MAX_zoom)
	zoom = MAX_zoom;
	else if(zoom < MIN_zoom)
	zoom = MIN_zoom;
	this.camera.scaleX = 100 / zoom;
	this.camera.scaleY = 100 / zoom;
};

VC.prototype.getZoom = function() {
	return 100 / this.camera.scaleX;
};

VC.prototype.resetZoom = function() {
	this.setZoom(100);
};

VC.prototype.rotateBy = function(angle) {
	this.setRotation( this.getRotation() + angle );
};

VC.prototype.setRotation = function(angle) {
	const MAX_angle = 180;
	const MIN_angle = -179;
	if(angle > MAX_angle)
		angle = MAX_angle;
	else if(angle < MIN_angle)
		angle = MIN_angle;
	this.camera.rotation = -angle;
};

VC.prototype.getRotation = function() {
	return -this.camera.rotation;
};

VC.prototype.resetRotation = function() {
	this.setRotation(0);
};

VC.prototype.reset = function() {
	this.resetPosition();
	this.resetZoom();
	this.resetRotation();
	this.unpinCamera();
};
VC.prototype.setZDepth = function(zDepth) {
	const MAX_zDepth = 10000;
	const MIN_zDepth = -5000;
	if(zDepth > MAX_zDepth)
		zDepth = MAX_zDepth;
	else if(zDepth < MIN_zDepth)
		zDepth = MIN_zDepth;
	this.camera.depth = zDepth;
}
VC.prototype.getZDepth = function() {
	return this.camera.depth;
}
VC.prototype.resetZDepth = function() {
	this.camera.depth = 0;
}

VC.prototype.pinCameraToObject = function(obj, offsetX, offsetY, offsetZ) {

	offsetX = typeof offsetX !== 'undefined' ? offsetX : 0;

	offsetY = typeof offsetY !== 'undefined' ? offsetY : 0;

	offsetZ = typeof offsetZ !== 'undefined' ? offsetZ : 0;
	if(obj === undefined)
		return;
	this.camera.pinToObject = obj;
	this.camera.pinToObject.pinOffsetX = offsetX;
	this.camera.pinToObject.pinOffsetY = offsetY;
	this.camera.pinToObject.pinOffsetZ = offsetZ;
};

VC.prototype.setPinOffset = function(offsetX, offsetY, offsetZ) {
	if(this.camera.pinToObject != undefined) {
	this.camera.pinToObject.pinOffsetX = offsetX;
	this.camera.pinToObject.pinOffsetY = offsetY;
	this.camera.pinToObject.pinOffsetZ = offsetZ;
	}
};

VC.prototype.unpinCamera = function() {
	this.camera.pinToObject = undefined;
};
VC.prototype.___getCamPosition___ = function() {
	var loc = new Object();
	loc['x'] = this.centerX - this.camera.x;
	loc['y'] = this.centerY - this.camera.y;
	loc['z'] = this.depth;
	return loc;
};

this.getCamera = function(timeline) {
	timeline = typeof timeline !== 'undefined' ? timeline : null;
	if(timeline === null) timeline = exportRoot;
	if(_camera[timeline] == undefined)
	_camera[timeline] = new VC(timeline);
	return _camera[timeline];
}

this.getCameraAsMovieClip = function(timeline) {
	timeline = typeof timeline !== 'undefined' ? timeline : null;
	if(timeline === null) timeline = exportRoot;
	return this.getCamera(timeline).camera;
}
}


// Layer depth API : 

an.Layer = new function() {
	this.getLayerZDepth = function(timeline, layerName)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline." + layerName + ".depth; else 0;";
		return eval(script);
	}
	this.setLayerZDepth = function(timeline, layerName, zDepth)
	{
		const MAX_zDepth = 10000;
		const MIN_zDepth = -5000;
		if(zDepth > MAX_zDepth)
			zDepth = MAX_zDepth;
		else if(zDepth < MIN_zDepth)
			zDepth = MIN_zDepth;
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline." + layerName + ".depth = " + zDepth + ";";
		eval(script);
	}
	this.removeLayer = function(timeline, layerName)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline.removeChild(timeline." + layerName + ");";
		eval(script);
	}
	this.addNewLayer = function(timeline, layerName, zDepth)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		zDepth = typeof zDepth !== 'undefined' ? zDepth : 0;
		var layer = new createjs.MovieClip();
		layer.name = layerName;
		layer.depth = zDepth;
		layer.layerIndex = 0;
		timeline.addChild(layer);
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