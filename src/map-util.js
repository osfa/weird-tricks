// import { gmapApi as google } from 'gmap-vue';

const mapMarker = "http://lorempixel.com/100/100/nature/"; // require if assets
const cloudAsset1 = require("~/assets/imgs/cloud1.png"); // require if assets
const cloudAsset2 = require("~/assets/imgs/cloud2.png"); // require if assets
const cloudAsset3 = require("~/assets/imgs/cloud3.png"); // require if assets
const heavyScaler = 12;
const midSCaler = 4;
const googleMarkers = [
  { url: require("~/assets/markers/blue-dot.png"), width: 32, height: 32 },
  { url: require("~/assets/markers/green-dot.png"), width: 32, height: 32 },
  { url: require("~/assets/markers/ltblue-dot.png"), width: 32, height: 32 },
  { url: require("~/assets/markers/orange-dot.png"), width: 32, height: 32 },
  { url: require("~/assets/markers/pink-dot.png"), width: 32, height: 32 },
  { url: require("~/assets/markers/purple-dot.png"), width: 32, height: 32 },
  { url: require("~/assets/markers/red-dot.png"), width: 32, height: 32 },
  { url: require("~/assets/markers/yellow-dot.png"), width: 32, height: 32 },
  // current
  {
    url: require("~/assets/markers/current-pin.svg"),
    width: 20 * 2,
    height: 35 * 2,
  },
  {
    url: require("~/assets/markers/current-pin.svg"),
    width: 20 * 3,
    height: 35 * 3,
  },
  {
    url: require("~/assets/markers/base-marker-color.png"),
    width: 54,
    height: 86,
  },

  // off brand
  {
    url: require("~/assets/markers/black-pin.png"),
    width: 512 / heavyScaler,
    height: 512 / heavyScaler,
  },
  { url: require("~/assets/markers/blue-pin.svg"), width: 64, height: 64 },
  {
    url: require("~/assets/markers/google-logo-pin.svg"),
    width: 64,
    height: 64,
  },
  {
    url: require("~/assets/markers/google-maps-grey-marker-w-shadow-th.png"),
    width: 100,
    height: 79,
  },
  {
    url: require("~/assets/markers/green-pin1.png"),
    width: 400 / heavyScaler,
    height: 512 / heavyScaler,
  },
  {
    url: require("~/assets/markers/green-pin2.png"),
    width: 570 / heavyScaler,
    height: 870 / heavyScaler,
  },
  { url: require("~/assets/markers/green-pin3.png"), width: 22, height: 40 },
  { url: require("~/assets/markers/marker.png"), width: 20, height: 34 },

  {
    url: require("~/assets/markers/orange-pin1.png"),
    width: 545 / heavyScaler,
    height: 638 / heavyScaler,
  },

  {
    url: require("~/assets/markers/red-pin1.png"),
    width: 366 / heavyScaler,
    height: 591 / heavyScaler,
  },
  {
    url: require("~/assets/markers/red-pin2.png"),
    width: 512 / heavyScaler,
    height: 512 / heavyScaler,
  },
  {
    url: require("~/assets/markers/red-pin3.png"),
    width: 512 / heavyScaler,
    height: 512 / heavyScaler,
  },
  {
    url: require("~/assets/markers/red-pin4-hi.png"),
    width: 372 / heavyScaler,
    height: 594 / heavyScaler,
  },
  {
    url: require("~/assets/markers/white-pin.png"),
    width: 512 / heavyScaler,
    height: 512 / heavyScaler,
  },
  {
    url: require("~/assets/markers/yellow-pin1.png"),
    width: 372 / heavyScaler,
    height: 594 / heavyScaler,
  },
  {
    url: require("~/assets/markers/yellow-pin2.png"),
    width: 515 / heavyScaler,
    height: 769 / heavyScaler,
  },
  {
    url: require("~/assets/markers/yellow-pin3.png"),
    width: 685 / heavyScaler,
    height: 1025 / heavyScaler,
  },
];

// https://khms1.google.com/kh/v=908?x=36&y=17&z=6
// https://www.maptiler.com/google-maps-coordinates-tile-bounds-projection/

export const tile2long = (x, z) => {
  return (x / Math.pow(2, z)) * 360 - 180;
};

export const tile2lat = (y, z) => {
  var n = Math.PI - (2 * Math.PI * y) / Math.pow(2, z);
  return (180 / Math.PI) * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n)));
};

// The mapping between latitude, longitude and pixels is defined by the web
// mercator projection.
export const project = (latLng, tileSize) => {
  let siny = Math.sin((latLng.lat() * Math.PI) / 180);
  // Truncating to 0.9999 effectively limits latitude to 89.189. This is
  // about a third of a tile past the edge of the world tile.
  siny = Math.min(Math.max(siny, -0.9999), 0.9999);
  return new google.maps.Point(
    tileSize * (0.5 + latLng.lng() / 360),
    tileSize * (0.5 - Math.log((1 + siny) / (1 - siny)) / (4 * Math.PI))
  );
};

export const getTileBounds = (google, center, zoomLevel, tileExtent = 1) => {
  const TILE_SIZE = 256;
  const currentZoom = zoomLevel;
  const scale = 1 << zoomLevel;

  const gLatLng = new google.maps.LatLng(center.lat, center.lng);
  const worldCoordinate = project(gLatLng, TILE_SIZE);

  const tileCoordinate = new google.maps.Point(
    Math.floor((worldCoordinate.x * scale) / TILE_SIZE),
    Math.floor((worldCoordinate.y * scale) / TILE_SIZE)
  );

  return {
    north: tile2lat(tileCoordinate.y, currentZoom),
    south: tile2lat(tileCoordinate.y + tileExtent, currentZoom),
    east: tile2long(tileCoordinate.x + tileExtent, currentZoom),
    west: tile2long(tileCoordinate.x, currentZoom),
  };
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

function getCircleCoordinates(point, radius, dir, point_count = 64) {
  var d2r = Math.PI / 180; // degrees to radians
  var r2d = 180 / Math.PI; // radians to degrees
  var earthsradius = 3963; // 3963 is the radius of the earth in miles

  var points = point_count; // !!!

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
  currentZoom = 5,
  ringCount = 3,
  point_count = 8
) => {
  const circleCoords = [...Array(ringCount).keys()].map((i) => {
    return getCircleCoordinates(
      new google.maps.LatLng(startLat, startLong),
      i * Math.pow(16 - currentZoom + 2, 2), // maxzoom 15
      1,
      point_count * i * 3
    );
  });

  var merged = [].concat.apply([], circleCoords);
  return merged.map((m, idx) => {
    const marker = googleMarkers.sample();
    return {
      position: {
        id: idx,
        lat: m.lat(),
        lng: m.lng(),
      },
      icon: {
        url: marker.url,
        scaledSize: {
          width: marker.width / 2,
          height: marker.height / 2,
          f: "px",
          b: "px",
        },
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
