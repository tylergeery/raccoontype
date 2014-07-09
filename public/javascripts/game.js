/* Select canvas for easy reuse */
var canvas = document.getElementById('gameCanvas');

/* Resize the canvas to get as much screen space as possible */
if (document.height > 700) {
	canvas.height = 700;
}

var context = canvas.getContext('2d');
window.img = new Image();

window.img.onload = function() {
  context.drawImage(img, 525, 400, 150, 150);
};

window.img.src = 'images/raccooon_first.png';

var errors = 0, 
	correct = 0,
	count = 0,
	wpm = 0,
	spot = 1,
	level = 1,
	gameStart = false,
	typeString,
	timer;
window.altitude = 400;

var stringArray = [
	"Though previously thought to be solitary, there is now evidence that raccoons engage in gender-specific social behavior. Related females often share a common area, while unrelated males live together in groups of up to four animals to maintain their positions against foreign males during the mating season, and other potential invaders. Home range sizes vary anywhere from 3 hectares for females in cities to 50 km2 (20 sq mi) for males in prairies. After a gestation period of about 65 days, two to five young, known as 'kits', are born in spring. The kits are subsequently raised by their mother until dispersal in late fall. Although captive raccoons have been known to live over 20 years, their average life expectancy in the wild is only 1.8 to 3.1 years. In many areas, hunting and vehicular injury are the two most common causes of death.",
	"In the first decades after its discovery by the members of the expedition of Christopher Columbus, who was the first person to leave a written record about the species, taxonomists thought the raccoon was related to many different species, including dogs, cats, badgers and particularly bears. Carl Linnaeus, the father of modern taxonomy, placed the raccoon in the genus Ursus, first as Ursus cauda elongata in the second edition of his Systema Naturae, then as Ursus Lotor in the tenth edition. In 1780, Gottlieb Conrad Christian Storr placed the raccoon in its own genus Procyon, which can be translated as either 'before the dog' or 'doglike'. It is also possible that Storr had its nocturnal lifestyle in mind and chose the star Procyon as eponym for the species.",
	"Four subspecies of raccoon found only on small Central American and Caribbean islands were often regarded as distinct species after their discovery. These are the Bahaman raccoon and Guadeloupe raccoon, which are very similar to each other; the Tres Marias raccoon, which is larger than average and has an angular skull; and the extinct Barbados raccoon. Studies of their morphological and genetic traits in 1999, 2003 and 2005 led all these island raccoons to be listed as subspecies of the common raccoon in the third edition of Mammal Species of the World. A fifth island raccoon population, the Cozumel raccoon, which weighs only 3 to 4 kg  and has notably small teeth, is still regarded as a separate species.",
	"The four smallest raccoon subspecies, with an average weight of 1.8 to 2.7 kg, are found along the southern coast of Florida and on the adjacent islands; an example is the Ten Thousand Island raccoon. Most of the other 15 subspecies differ only slightly from each other in coat color, size and other physical characteristics. The two most widespread subspecies are the Eastern raccoon and the Upper Mississippi Valley raccoon. Both share a comparatively dark coat with long hairs, but the Upper Mississippi Valley raccoon is larger than the Eastern raccoon. The Eastern raccoon occurs in all U.S. states and Canadian provinces to the north of South Carolina and Tennessee. The adjacent range of the Upper Mississippi Valley raccoon covers all U.S. states and Canadian provinces to the north of Louisiana, Texas and New Mexico.",
	"Only a few studies have been undertaken to determine the mental abilities of raccoons, most of them based on the animal's sense of touch. In a study by the ethologist H. B. Davis in 1908, raccoons were able to open 11 of 13 complex locks in fewer than 10 tries and had no problems repeating the action when the locks were rearranged or turned upside down. Davis concluded they understood the abstract principles of the locking mechanisms and their learning speed was equivalent to that of rhesus macaques. Studies in 1963, 1973, 1975 and 1992 concentrated on raccoon memory showed they can remember the solutions to tasks for up to three years. In a study by B. Pohl in 1992, raccoons were able to instantly differentiate between identical and different symbols three years after the short initial learning phase. Stanislas Dehaene reports in his book The Number Sense raccoons can distinguish boxes containing two or four grapes from those containing three.",
	"Though usually nocturnal, the raccoon is sometimes active in daylight to take advantage of available food sources. Its diet consists of about 40% invertebrates, 33% plant material and 27% vertebrates. Since its diet consists of such a variety of different foods, Zeveloff argues the raccoon 'may well be one of the world\'s most omnivorous animals'. While its diet in spring and early summer consists mostly of insects, worms, and other animals already available early in the year, it prefers fruits and nuts, such as acorns and walnuts, which emerge in late summer and autumn, and represent a rich calorie source for building up fat needed for winter. Contrary to popular belief, raccoons eat active or large prey, such as birds and mammals, only occasionally, since they prefer prey that is easier to catch, specifically fish, amphibians and bird eggs. When food is plentiful, raccoons can develop strong individual preferences for specific foods. In the northern parts of their range, raccoons go into a winter rest, reducing their activity drastically as long as a permanent snow cover makes searching for food impossible.",
	"Raccoons usually mate in a period triggered by increasing daylight between late January and mid-March. However, there are large regional differences which are not completely explicable by solar conditions. For example, while raccoons in southern states typically mate later than average, the mating season in Manitoba also peaks later than usual in March and extends until June. During the mating season, males restlessly roam their home ranges in search of females in an attempt to court them during the three- to four-day period when conception is possible. These encounters will often occur at central meeting places. Copulation, including foreplay, can last over an hour and is repeated over several nights. The weaker members of a male social group also are assumed to get the opportunity to mate, since the stronger ones cannot mate with all available females. In a study in southern Texas during the mating seasons from 1990 to 1992, about one third of all females mated with more than one male. If a female does not become pregnant or if she loses her kits early, she will sometimes become fertile again 80 to 140 days later.",
	"As a result of escapes and deliberate introductions in the mid-20th century, the raccoon is now distributed in several European and Asian countries. Sightings have occurred in all the countries bordering Germany, which hosts the largest population outside of North America. Another stable population exists in northern France, where several pet raccoons were released by members of the U.S. Air Force near the Laon-Couvron Air Base in 1966. About 1,240 animals were released in nine regions of the former Soviet Union between 1936 and 1958 for the purpose of establishing a population to be hunted for their fur. Two of these introductions were successful: one in the south of Belarus between 1954 and 1958, and another in Azerbaijan between 1941 and 1957. With a seasonal harvest of between 1,000 and 1,500 animals, in 1974 the estimated size of the population distributed in the Caucasus region was around 20,000 animals and the density was four animals per square kilometer.",
	"Unlike rabies and at least a dozen other pathogens carried by raccoons, distemper, an epizootic virus, does not affect humans. This disease is the most frequent natural cause of death in the North American raccoon population and affects individuals of all age groups. For example, 94 of 145 raccoons died during an outbreak in Clifton, Ohio, in 1968. It may occur along with a following inflammation of the brain, causing the animal to display rabies-like symptoms. In Germany, the first eight cases of distemper were reported in 2007.",
	"While primarily hunted for their fur, raccoons were also a source of food for Native Americans and early American settlers. American slaves occasionally ate raccoon at Christmas, but it was not necessarily a dish of the poor or rural. The first edition of The Joy of Cooking, released in 1931, contained a recipe for preparing raccoon, and US President Calvin Coolidge's pet raccoon Rebecca was originally sent to be served at the White House Thanksgiving Dinner. Although the idea of eating raccoons seems repulsive to most mainstream consumers since they see them as endearing, cute, and/or varmints, several thousand raccoons are still eaten each year in the United States."
];

document.getElementById('gameStart').onclick = function() { startGame(); };

window.requestAnimFrame = (function(callback) {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback) {
          window.setTimeout(callback, 1000 / 60);
        };
      })();

var startGame = function() {
	document.getElementById('gameStart').style.display = 'none';
	typeString = stringArray[Math.floor(Math.random()*stringArray.length)];
	document.getElementById('typeString').innerHTML = typeString;
	timer = setInterval(function() {
		count++;
		wpm = Math.floor(((correct-(errors*.4))/5)/(count/60));
		document.getElementById('wpm').innerHTML = wpm > 0 ? wpm : 0;
		var change = false;
		if (wpm > 100) {alert("Congrats Trev, you're a stud!");}
		if(wpm > 90) {
			window.altitude = 250;
			if(level!==7) {
				change = true;
				level = 7;
			} 
		} else if (wpm > 80) {
			window.altitude = 275;
			if(level!==6) {
				change = true;
				level = 6;
			} 
		} else if (wpm > 70) {
			window.altitude = 300;
			if(level!==5) {
				change = true;
				level = 5;
			} 
		} else if (wpm > 30) {
			window.altitude = 325;
			if(level!==4) {
				change = true;
				level = 4;
			} 
		} else if (wpm > 20) {
			window.altitude = 350;
			if(level!==3) {
				change = true;
				level = 3;
			} 
		} else if (wpm > 10) {
			window.altitude = 375;
			if(level > 2) {
				change = true;
				level = 2;
			} else if (level !== 2) {
				change = true;
				window.img.src = 'images/raccooon_fly.png';
				level = 2;
			}
		} else {
			window.altitude = 400;
			if(level!==1) {
				change = true;
				level = 1;
			}
		}
		if(change) {
			context.clearRect(0, 0, canvas.width, canvas.height);
    		context.drawImage(window.img, 525, window.altitude, 150, 150);
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
			return correctString(typeString);
		} else {
			errors++;
			return wrongString();
		}
	};
}


var correctString = function() {
	correct++;
	var multiplier = (correct % 20) * (-50);
	typeString = typeString.substr(1) ? typeString.substr(1) : endGame();
	document.getElementById("correct").innerHTML = correct;
	document.getElementById('typeString').innerHTML = typeString;
	document.getElementById('gameCanvas').style["background-position"] = multiplier+"% 0%";

	/* Set the next picture determined by if odd or even correct count */
	if (window.img.src !== 'images/raccooon_fly.png' && level < 2) {
		window.img.src = correct % 2 ? 'images/raccooon_second.png' : 'images/raccooon_first.png';
	}
	return false;
};

var wrongString = function() {
	errors++;
	document.getElementById("errors").innerHTML = errors;
	return false;
}


var endGame = function() {
	clearInterval(timer);
	document.getElementById('hidden').style.display = 'block';
	document.getElementById("correct_result").innerHTML = correct;
	document.getElementById('errors_result').innerHTML = errors;
	document.getElementById('wpm_result').innerHTML = wpm;
}