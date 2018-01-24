  var colors = ["#FFFFFF"];var restaurants = ["Community Service Award","Environmental Action\/Awareness Award","Safety Awareness Award","Service Learning Individual Award","Special Olympics Award","BPA Marketing and Public Relations","BPA Merit Scholar","Chapter Activities Award of Excellence","Recruiter of the Year Award","Membership Explosion Award","Social Media Award","The Professional Cup","Advisor of the Year Award","Emerging Advisor of the Year Award","Emerging Professional of the Year Award","Hall of Fame Award","Outstanding Service Award","Student of the Year"];var weights = [];		
        function setWeightedVariables() {
            numOptionsWeighted = restaurants.length;
            if (weights.length > 0) {
                for (var i = 0; i < weights.length; i++) {
                    numOptionsWeighted += weights[i] - 1;
                }
            }
            arc = Math.PI / (numOptionsWeighted / 2);
            wedgeAngle = Math.PI * 2 / numOptionsWeighted;
            
            var desChoice = -1;
            desChoiceWeighted = desChoice;
            for (var i = 0; i < weights.length && i < desChoice; i++) {
                desChoiceWeighted += weights[i] - 1;
            }
            halfDesChoiceWeight = 0.5;
            if (weights.length > desChoice) {
                halfDesChoiceWeight = weights[desChoice] * 0.5;
            }
                            
        }        
                
	var numcolors = colors.length;
	var numoptions = restaurants.length;
        
        var numOptionsWeighted;
        var arc;
        var desChoiceWeighted;
        var halfDesChoiceWeight;
        
        setWeightedVariables();
    
        if (numOptionsWeighted % 2 == 1) {
            isOddNumberOfChoices = true;
            isFirstSpinCycle = true;
        }
	
  var isCustomWidth = false;  
  var canv = document.getElementById("wheelcanvas");
  var canvTop = document.getElementById("wheelcanvastop");
  

var isMobile = false;
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
 isMobile = true;
}
	var minDimension = 500;
	if (isMobile) {
		canvasWidth = canv.width;
		var mutebutton = document.getElementById('mutebutton');
		toggleMute(mutebutton);
	}
	try {
		//if (window.frameElement) {
			//maxWidth = window.frameElement.offsetWidth;
			//maxHeight = window.frameElement.offsetHeight;
                        maxWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
                        maxHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
		//}
		minDimension = Math.min(maxWidth, maxHeight);
	} catch(err) {
        
    }
	
  
  var canvasWidth = minDimension;		canv.width = canvasWidth;
		canv.height = canvasWidth;
		wheelSize = canvasWidth;
		canvTop.width = canvasWidth;
		canvTop.height = canvasWidth;
		
		var context = canvTop.getContext('2d');
        var imageObj = new Image();

        imageObj.onload = function() {
        context.drawImage(imageObj, 0, 0, canvasWidth, canvasWidth);
      };
      imageObj.src = '/images/WD-Click-to-Spin.png';
  
  var wheelRadius = wheelSize * 0.5;
  var outsideRadius = wheelRadius;
  var textRadius = wheelRadius * 0.9;
  var insideRadius = wheelRadius *0.1;
  
  function wheelMouseDown(e) {
    clearTopCanvas();
	drawArrow();
	 var wheeldiv = document.getElementById("wheelcanvastop");
    midX = wheeldiv.offsetLeft+wheelRadius+wheeldiv.offsetParent.offsetLeft;
	 midY = wheeldiv.offsetTop+wheelRadius+wheeldiv.offsetParent.offsetTop;
	 lastX=e.clientX;
	 lastY=e.clientY;
    isMouseDown = true;
  }
  
  function drawRouletteWheel() {
    var canvas = document.getElementById("wheelcanvas");
    if (canvas.getContext) {
    
      ctx = canvas.getContext("2d");
      ctx.setTransform(1, 0, 0, 1, 0, 0);
	  ctx.clearRect(0,0,canv.width,canv.height);
	  ctx.strokeStyle = "black";
      ctx.lineWidth = 0;
      ctx.translate( canvas.width/2 , canvas.height/2 );
      ctx.font = 'bold 12px sans-serif';
      var weightedIndex = 0;
      for(var i = 0; i < numoptions; i++) {
          var weightedArc = arc;
          var weight = 1;
          if (weights.length > i) {
              weight = weights[i];
              weightedArc = arc * weight;
          }
         
        var angle = startAngle + weightedIndex * arc;
        ctx.fillStyle = colors[i%numcolors];
        
        ctx.beginPath();
        var endAngle = angle + weightedArc;
        // Chrome 43.0.2357.81 m arc issue
        if (endAngle > 6.282 && endAngle < 6.284) {
            endAngle = 6.282;
        }
        ctx.arc(0,0, outsideRadius, angle, endAngle, false);
        ctx.arc(0,0, insideRadius, endAngle, angle, true);
        ctx.fill();
        
        ctx.save();
		  
		  
		  ctx.fillStyle = "black";			var angHalfArc = angle + weightedArc * 0.5 - 0.04;
        ctx.translate(Math.cos(angHalfArc) * textRadius, Math.sin(angHalfArc) * textRadius);
        ctx.rotate(angHalfArc + Math.PI);
        var text = restaurants[i];
		  
		  ctx.font = 'bold '+choiceTextSize[i]+'px sans-serif';
		 
		 textHWidth = ctx.measureText(text).width;
		if (textHWidth > textRadius - 30) {
				text = text.substring(0,27) + "...";	
		}
		 
		 
		  ctx.fillText(text, 0, 0);
        ctx.restore();
        weightedIndex += weight;
      } 
      
	  drawArrow();
    }
  }
    
  function spin() {
    clearTopCanvas();
	drawArrow();
    var minTimeToSpin = 5;
    var timeRange = 4;
	 var minAngleToStartRotating = 20;
	 var angleRange = 30;
    spinTime = 0;
    spinTimeTotal = minTimeToSpin * 1000;
	//playSound();
    angleSinceBeep = 0;
	timeSinceBeep = 0;
	 slowDown = false;
	 var desChoice = -1;
	 if (desChoice == -1) {
	    spinAngleStart = Math.random() * angleRange + minAngleToStartRotating; 
		setWheelImageSource();
		rotateWheelImage();
	 } else {
	    spinAngleStart = 45;
		setWheelImageSource();
		rotateWheelPreset();
	}

  }
  
  
  
  
  function setChoiceFontSizes() {
  // get the font size of each choice
	 var canvas = document.getElementById("wheelcanvas");
    if (canvas.getContext) {
      ctx = canvas.getContext("2d");
		choiceTextSize = [];
		for(var i = 0; i < numoptions; i++) {
			var text = restaurants[i];
			ctx.font = 'bold 18px sans-serif'; 
			var textHWidth = ctx.measureText(text).width;
			if (textHWidth > textRadius - 30) {
				ctx.font = 'bold 15px sans-serif';
				textHWidth = ctx.measureText(text).width;
				if (textHWidth > textRadius - 30) {
					choiceTextSize.push("12");
				} else {
					choiceTextSize.push("15");
				}
			} else {
				choiceTextSize.push("18");
			}
		}
		
				  		
		
	}
  }
  
function rotateWheelPreset() {
    spinTime += 30;
    if(spinTime >= spinTimeTotal) {
      stopRotateWheelImage();
      return;
	} else if (slowDown) {
		var spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
		startAngle += (spinAngle * Math.PI / 180);
		drawRouletteWheel(); 
		spinTimeout = setTimeout('rotateWheelPreset()', 30);
	} else {
		var spinAngle = 20;
		startAngle += (spinAngle * Math.PI / 180);
		if (spinTime >= spinTimeTotal - 3600)  {
			var desChoice = -1;
			var desAngle;
                        
                        if (weights.length > 0) {
                            desAngle = (numOptionsWeighted - desChoiceWeighted - halfDesChoiceWeight) / numOptionsWeighted * 2*Math.PI;
                        } else {
                            desAngle = (numoptions - desChoice - halfDesChoiceWeight) / numoptions * 2*Math.PI;
                        }
                        
			var modAngle = startAngle % 2*Math.PI;
			var minAngle, maxAngle;
			var isWithin = false;
                        minAngle = desAngle - 0.1;
                        maxAngle = desAngle + 0.1;
                        if (modAngle < maxAngle && modAngle > minAngle) {
                            isWithin = true;
                        }
			if (isWithin) {
                            startAngle = desAngle;
                            spinTime = spinTimeTotal - 3677;
                            slowDown = true;
			}
		}
		drawRouletteWheelImage(spinAngle);
		spinTimeout = setTimeout('rotateWheelPreset()', 30);
	}
  }
 

  
      

  
  function stopRotateWheelImage() {
    clearTimeout(spinTimeout);
	
	var choice = getCurrentChoiceWithWeights();
	var text = choice.text;
	var index = choice.index;
	 
	var canvasTop = document.getElementById("wheelcanvastop");
	if (canvasTop.getContext) {
		
		ctxTop = canvasTop.getContext("2d");
		 
		ctxTop.font = 'bold 30px sans-serif';
		var textHWidth = ctxTop.measureText(text).width*0.5;
		if (textHWidth > wheelRadius) {
		  ctxTop.font = 'bold 12px sans-serif';
		  textHWidth = ctxTop.measureText(text).width*0.5;
		}
		
                var imageObj = new Image();

                imageObj.onload = function() {
                       ctxTop.drawImage(imageObj, 0, 0, canvasWidth, canvasWidth);
                       ctxTop.fillStyle = "white";
                       ctxTop.fillText(text, canvasWidth/2 - textHWidth, canvasWidth/2 + 10);
                };
                imageObj.src = '/images/stop-message-gradient-500.png';
                if (!isMuted) {
                    var audioFinal = document.getElementById("wheelAudioFinal");
                    audioFinal.play();
                }
	}
	
	
	            }
  

  addTouchEventListeners();
  draw();
  
  function listener(event){
	if (event.data == "spin") {
	  spin();
	  }
  }

	try {
		if (window.addEventListener){
			addEventListener("message", listener, false)
		} else {
			attachEvent("onmessage", listener)
		}
	} catch(err) {
        
	}