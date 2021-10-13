
// import { gmapApi as google } from 'gmap-vue';

const mapMarker = "http://lorempixel.com/100/100/nature/"; // require if assets
const cloudAsset1 = require("~/assets/imgs/cloud1.png"); // require if assets
const cloudAsset2 = require("~/assets/imgs/cloud2.png"); // require if assets
const cloudAsset3 = require("~/assets/imgs/cloud3.png"); // require if assets
// https://khms1.google.com/kh/v=908?x=36&y=17&z=6

// https://www.maptiler.com/google-maps-coordinates-tile-bounds-projection/

export const getTileBounds = (google, center, zoomLevel) => {

  console.log('center?', center)
  const TILE_SIZE = 256;
  const currentZoom = zoomLevel;
  const scale = 1 << zoomLevel;

  const gLatLng = new google.maps.LatLng(center.lat, center.lng);
  const worldCoordinate = project(gLatLng, TILE_SIZE);

    console.log("worldCoordinate:",  worldCoordinate)

//   const pixelCoordinate = new google.maps.Point(
//     Math.floor(worldCoordinate.x * scale),
//     Math.floor(worldCoordinate.y * scale)
//   );
//   console.log("worldCoordinate". worldCoordinate)

  function tile2long(x, z) {
    return (x / Math.pow(2, z)) * 360 - 180;
  }

  function tile2lat(y, z) {
    var n = Math.PI - (2 * Math.PI * y) / Math.pow(2, z);
    return (180 / Math.PI) * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n)));
  }

  // The mapping between latitude, longitude and pixels is defined by the web
  // mercator projection.
  function project(latLng, tileSize) {
    let siny = Math.sin((latLng.lat() * Math.PI) / 180);
    // Truncating to 0.9999 effectively limits latitude to 89.189. This is
    // about a third of a tile past the edge of the world tile.
    siny = Math.min(Math.max(siny, -0.9999), 0.9999);
    return new google.maps.Point(
        tileSize * (0.5 + latLng.lng() / 360),
        tileSize * (0.5 - Math.log((1 + siny) / (1 - siny)) / (4 * Math.PI))
    );
  }

  const tileCoordinate = new google.maps.Point(
    Math.floor((worldCoordinate.x * scale) / TILE_SIZE),
    Math.floor((worldCoordinate.y * scale) / TILE_SIZE)
  );
  console.log("worldCoordinate". worldCoordinate)

  return {
    north: tile2lat(tileCoordinate.y, currentZoom),
    south: tile2lat(tileCoordinate.y + 2, currentZoom),
    east: tile2long(tileCoordinate.x + 2, currentZoom),
    west: tile2long(tileCoordinate.x, currentZoom),
  }
};

export const availableMapTypes = ["roadmap", "satellite", "hybrid", "terrain"];
export const cloudMarkers = [
  {
    position: {
      lat: 10.0,
      lng: 10.0,
    },
    icon: {
      url: cloudAsset1,
    },
    weight: 100,
  },
  {
    position: {
      lat: 11.0,
      lng: 11.0,
    },
    icon: {
      url: cloudAsset2,
      //   https://stackoverflow.com/questions/53637422/vue2-google-maps-mark-icon-size-and-use-of-the-google-object-to-resize-dont-wor
      scaledSize: { width: 1202, height: 595, f: "px", b: "px" },
    },
    weight: 100,
  },
  {
    position: {
      lat: 12.0,
      lng: 12.0,
    },
    icon: {
      url: cloudAsset3,
    },
    weight: 100,
  },
];

function getCircleCoordinates(point, radius, dir) {
  var d2r = Math.PI / 180; // degrees to radians
  var r2d = 180 / Math.PI; // radians to degrees
  var earthsradius = 3963; // 3963 is the radius of the earth in miles

  var points = 32;
  // find the raidus in lat/lon
  var rlat = (radius / earthsradius) * r2d;
  var rlng = rlat / Math.cos(point.lat() * d2r);

  var extp = [];
  if (dir == 1) {
    var start = 0;
    var end = points + 1; // one extra here makes sure we connect the path
  } else {
    var start = points + 1;
    var end = 0;
  }
  for (var i = start; dir == 1 ? i < end : i > end; i = i + dir) {
    var theta = Math.PI * (i / (points / 2));
    let ey = point.lng() + rlng * Math.cos(theta); // center a + radius x * cos(theta)
    let ex = point.lat() + rlat * Math.sin(theta); // center b + radius y * sin(theta)
    extp.push(new google.maps.LatLng(ex, ey));
  }
  return extp;
}

export const getCircleMarkers = (
  startLat,
  startLong,
  radiusIncrease = 100,
  ringCount = 15
) => {
  const circleCoords = [...Array(ringCount).keys()].map((i) => {
    return getCircleCoordinates(
      new google.maps.LatLng(10, 10),
      i * radiusIncrease,
      1
    );
  });

  var merged = [].concat.apply([], circleCoords);

  merged.map((m) => {
    return {
      position: {
        lat: m.lat(),
        lng: m.lng(),
      },
    };
  });
};

export const testMarkers = [
  {
    position: {
      lat: 15.0,
      lng: 15.0,
    },
    icon: {
      url: mapMarker,
      // size: { width: 60, height: 90, f: "px", b: "px" },
      // scaledSize: { width: 30, height: 45, f: "px", b: "px" },
    },
    weight: 100,
  },
  {
    position: {
      lat: 14.0,
      lng: 13.0,
    },
    // label: "Potato",

    weight: 50,
  },
];
