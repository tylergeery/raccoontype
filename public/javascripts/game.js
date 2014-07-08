/* Select canvas for easy reuse */
var canvas = document.getElementById('gameCanvas');

/* Resize the canvas to get as much screen space as possible */
if (document.height > 700) {
	canvas.height = 700;
}

var context = canvas.getContext('2d');
var img = new Image();

img.onload = function() {
  context.drawImage(img, 525, 400, 150, 150);
};

img.src = 'images/raccooon_first.png';

var errors = 0, 
	correct = 0,
	count = 0,
	wpm = 0,
	spot = 1,
	gameStart = false;

var typeString = "This is a wild raccoon adventure. Stay out of the garbage! This is a wild raccoon adventure. Stay out of the garbage! This is a wild raccoon adventure. Stay out of the garbage! blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah";
document.getElementById('typeString').innerHTML = typeString;

var timer = setInterval(function() {
		count++;
		wpm = Math.floor((correct-errors)/5);
		document.getElementById('wpm').innerHTML = wpm > 0 ? wpm : 0;
		if(timer >= 120) {
			clearInterval(timer);
		}
	}, 1000);

/* Start the keydown detections */
window.onkeypress = function(key) {
	if (key.keyCode == 8) {
        return false;
    }
	var attempt = String.fromCharCode(key.keyCode);
	var expected = typeString[0];

	if(attempt === expected) {
		correctString(typeString);
	} else {
		errors++;
		wrongString();
	}

};

var correctString = function() {
	correct++;
	typeString = typeString.substr(1);
	document.getElementById("correct").innerHTML = correct;
	document.getElementById('typeString').innerHTML = typeString;

	/* Set the next picture determined by if odd or even correct count */
	img.src = correct % 2 ? 'images/raccooon_second.png' : 'images/raccooon_first.png';


};

var wrongString = function() {
	errors++;
	document.getElementById("errors").innerHTML = errors;
}