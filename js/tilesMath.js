function tile2long(x,z) {
	var  n = math.pow(2, z);
	return x / n * 360.0 - 180.0;
	//return (x/Math.pow(2,z)*360-180);
}

function tile2lat(y,z) {
	var n = math.pow(2, z);
	return (math.atan(math.sinh(math.PI * (1 - 2 * y/n)))) * 57.29577951308232;
	/*var n=math.PI-2*math.PI*y/math.pow(2,z);
	return (180/math.PI*math.atan(0.5*(math.exp(n)-math.exp(-n))));*/
}

/***
 * Detect if the box is in straight
 * straight line is when (diffX > 0 & diffY == 0) || (diffX == 0 & diffY > 0) 
 */
function isStraight(start, end) {

	var tiles = [];

	diffX = math.abs(start.x - end.x);
	diffY = math.abs(end.x - end.y);

	var start = 0;
	var end = 0;

	var bIsHorizontal = false;

	// horizontal
	if(diffX > 0 & diffY == 0) {
		
		if(start.x > end.x) {
			start = end.x;
		} else {
			start = start.x;
		}	 

		end = diffX;

		bIsHorizontal = true;

	} else if(diffX == 0 & diffY > 0) { // vertical

		if(start.y > end.y) {
			start = end.y;
		} else {
			start = start.y;
		}

		end = diffY;
	}

	// Loop
	for(i = start; i <= end; i++) {
		var tile = [];

		if(bIsHorizontal) {
			tile["x"] = i;
			tile["y"] = start.y; // y will always be the same
		} else {
			tile["x"] = start.x; // x will always be the same
			tile["y"] = i;
		}
	}

	return tile;
}
