"use strict";
/******
 * OVERLAY
 * 1. coreTiles() - Tiles
 * 1. () - Get Tiles center lat/lon
 * 2. dataOverlay() - Data from server
 */
function coreTiles(map, index) {

	var getTile = function(coord, zoom, ownerDocument) {

      var div = ownerDocument.createElement('div');
      div.innerHTML = coord;
      div.style.width = this.tileSize.width + 'px';
      div.style.height = this.tileSize.height + 'px';
      div.style.fontFamily = 'Roboto','sans-serif';
      div.style.fontSize = '20px';
      div.style.fontWeight = 'bolder';
      div.style.color = "red"
      div.style.border = 'dotted 1px #aaa';
      div.style.textAlign = 'center';
      div.style.lineHeight = this.tileSize.height + 'px';
      div.style.background = 'rgba(250, 250, 250, 0.35)';          

      return div;
  	}
   
	map.addOverlayMapType({
	  index: index,
	  tileSize: new google.maps.Size(256, 256),
	  getTile: getTile
	});

}

function centerPointOverlay(map, index) {

	var getTile = function(coord, zoom, ownerDocument) {

      var div = ownerDocument.createElement('div');
      div.style.width = this.tileSize.width + 'px';
      div.style.height = this.tileSize.height + 'px';
      div.style.fontFamily = 'Roboto','sans-serif';
      div.style.fontSize = '16px';
      div.style.fontWeight = 'bolder';
      div.style.color = "blue"
      div.style.border = 'dotted 1px #aaa';
      div.style.textAlign = 'center';
      div.style.lineHeight = this.tileSize.height + 'px'; 
      div.style.margin = "20px 0px";        
      div.style.background = 'rgba(250, 250, 250, 0.35)'; 

      // calculate center point
      var lat = tile2lat((coord.y)+0.5, zoom);
      var lon = tile2long(coord.x+0.5, zoom);
      div.innerHTML =  lat.toFixed(6) + "," + lon.toFixed(6);
      console.log(coord + ":" + lat, lon);

      map.drawCircle({
      	lat: lat,
      	lng: lon,
      	radius: 100,
      	strokeWeight: 0,
      	fillColor: "#F00"
      });

      return div;
  	}
   
	map.addOverlayMapType({
	  index: index,
	  tileSize: new google.maps.Size(256, 256),
	  getTile: getTile
	});

}

function removeCenterPoint(map) {
	map.removePolylines();
}

// data overlay
function dataOverlay(map, index, serverPath) {

	var tiles = [];
	var dataTiles = [];

	$.getJSON(serverPath + '/categories/tiles', function(json){
        
        var ct = 0;
        $.each(json, function(i, tile){
            tiles[ct] = tile.tile;
            dataTiles[ct] = tile.coord;

            ct++;
        });

        var getTile = function(coord, zoom, ownerDocument) {
          var centerCoord = "";

          var div = ownerDocument.createElement('div');
          div.style.width = this.tileSize.width + 'px';
          div.style.height = this.tileSize.height + 'px';

          if(tiles.indexOf(coord.x + "," + coord.y) > -1 ){
              div.style.background = 'rgba(0, 250, 0, 0.35)';
          }              

          return div;
        };

        map.addOverlayMapType({
		  index: index,
		  tileSize: new google.maps.Size(256, 256),
		  getTile: getTile
		});
    });
}

// data overlay
function dataOverlay(map, index, serverPath) {

	var tiles = [];
	var dataTiles = [];

	$.getJSON(serverPath + '/categories/tiles', function(json){
        
        var ct = 0;
        $.each(json, function(i, tile){
            tiles[ct] = tile.tile;
            dataTiles[ct] = tile.coord;

            ct++;
        });

        var getTile = function(coord, zoom, ownerDocument) {
          var centerCoord = "";

          var div = ownerDocument.createElement('div');
          div.style.width = this.tileSize.width + 'px';
          div.style.height = this.tileSize.height + 'px';

          if(tiles.indexOf(coord.x + "," + coord.y) > -1 ){
              div.style.background = 'rgba(0, 250, 0, 0.35)';
          }             

          return div;
        };

        map.addOverlayMapType({
		  index: index,
		  tileSize: new google.maps.Size(256, 256),
		  getTile: getTile
		});
    });
}

function routeOverlay(map, index, stepXYs) {

    var getTile = function(coord, zoom, ownerDocument) {

      var div = ownerDocument.createElement('div');
      div.style.width = this.tileSize.width + 'px';
      div.style.height = this.tileSize.height + 'px';        

      $.each(stepXYs, function(i, stepXY){

      	// convert to x,y
      	
      });

      return div;
    };

    map.addOverlayMapType({
	  index: index,
	  tileSize: new google.maps.Size(256, 256),
	  getTile: getTile
	});
}

function mapClean(map) {
	map.cleanRoute();
	map.removeMarker();
}

/*************************** GOOGLE DIRECTION *******************/
/*function getRouteXY(origin, destination){

	var url = "https://maps.googleapis.com/maps/api/directions/json?";
	url += "origin=" + encodeURIComponent($origin);
	url += "&destination=" + encodeURIComponent($destination);
	url += "&key=AIzaSyBXhGkSYgByF17DhDDJ4xgY4yeA_xqQ07g";

	$.getJSON(url, function(json){

		var steps = json.routes[0].legs[0].steps;

		$.each(steps, function(i, steps)) {
			
		}
	});
}*/

/***************************** NORMAL ***********************/

// load waypoint
function wayPoint(map, startVal, endVal, startText, endText) {


  GMaps.geocode({
    address: startVal,
    callback: function(results, status) {
      
      console.log("val:" + startVal + " - " + status);

      if (status == 'OK') {
        var startLoc = results[0].geometry.location;
        
        GMaps.geocode({
          address: endVal,
          callback: function(results, status) {

          	console.log(status);

            if (status == 'OK') {
              var endLoc = results[0].geometry.location;

              startText.text(startLoc.lat() + "," + startLoc.lng());
              endText.text(startLoc.lat() + "," + startLoc.lng());

              map.drawRoute({
                origin: [startLoc.lat(), startLoc.lng()],
                destination: [endLoc.lat(), endLoc.lng()],
                travelMode: 'driving',
                strokeColor: '#131540',
                strokeOpacity: 0.6,
                strokeWeight: 6
              });
            }
          }
        });
      }
    }
  });

  
}

