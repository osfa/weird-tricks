import { randomFromPalette } from "~/assets/colors/palette1";

import { iconList } from "~/assets/icons";

import { cb_run2_temp075 } from "~/data/cb_run2_temp075";
import { cb_run2_temp2 } from "~/data/cb_run2_temp2";
import { cb_run2_temp3 } from "~/data/cb_run2_temp3";

export const randomMaterialColor = randomFromPalette;

export const randomIcon = () => {
  return iconList[Math.floor(Math.random() * iconList.length)];
};

// export const Zindices Colors = Object.freeze({
//   TOP_NAV:   Symbol("red"),
//   TRANSP_IMAGE:
//   CLOUDS:  Symbol("blue"),
//   CARD: Symbol("green")
// });

export const random = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

export const randomFloat = (min, max) => {
  return Math.random() * (max - min) + min;
};

export const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

export const randomAnimation = (array) => {
  return [
    "bounce",
    "bounceDown",
    "bounceLeft",
    "bounceRight",
    "bounceUp",
    "fade",
    "fadeDown",
    "fadeDownBig",
    "fadeLeft",
    "fadeLeftBig",
    "fadeRight",
    "fadeRightBig",
    "fadeUp",
    "fadeUpBig",
    "rotate",
    "rotateDownLeft",
    "rotateDownRight",
    "rotateUpLeft",
    "rotateUpRight",
    "slideDown",
    "slideUp",
    "slideLeft",
    "slideRight",
    "zoom",
    "zoomDown",
    "zoomUp",
    "zoomLeft",
    "zoomRight",
  ].sample();
};

export const randomElevation = (array) => {
  return random(0, 24);
};

const cb_arrays = [cb_run2_temp2, cb_run2_temp3, cb_run2_temp075];
export const generateAlphaChars = (targetLength) => {
  const chars = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"];
  const charCount = targetLength;
  return [...Array(charCount)].map(
    (i) => chars[(Math.random() * chars.length) | 0]
  ).join``;
};

export const generateChars = (targetLength) => {
  const weirdChar = ["*"];
  const selectedChar = weirdChar.sample();
  const charCount = targetLength;
  return [...Array(charCount)].map((i) => selectedChar).join``;
};

export const randomClickBait = (targetLength) => {
  if (random(0, 10) > 8) {
    return generateAlphaChars(targetLength);
  }

  if (random(0, 10) > 8) {
    return generateChars(targetLength);
  }

  const chosen = cb_arrays.sample().sample();
  if (chosen.length <= targetLength) {
    return chosen;
  }
  const split = chosen.split(" ");
  let str = "";
  let i = 0;
  while (str.length < targetLength) {
    i += 1;
    str += split[i] + " ";
  }
  return str;
};

export const randomText = (configuration) => {
  switch (configuration.type) {
    case "clickbait":
      return randomClickBait(configuration.length);
      break;
    case "sentence":
      return randomClickBait(random(30, 50));
      break;
    case "title":
      return randomClickBait(random(15, 30));
      break;
    default:
      return "default";
  }
};

export const generateRandomStyle = () => {
  const scheme = [
    {
      elementType: "geometry",
      stylers: [
        {
          color: randomFromPalette(),
        },
      ],
    },
    {
      elementType: "labels",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      elementType: "labels.text.fill",
      stylers: [
        {
          color: randomFromPalette(),
        },
      ],
    },
    {
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: randomFromPalette(),
        },
      ],
    },
    {
      featureType: "administrative",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: randomFromPalette(),
        },
      ],
    },
    {
      featureType: "administrative.land_parcel",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: randomFromPalette(),
        },
      ],
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: randomFromPalette(),
        },
      ],
    },
    {
      featureType: "administrative.neighborhood",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "landscape.natural",
      elementType: "geometry",
      stylers: [
        {
          color: randomFromPalette(),
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [
        {
          color: randomFromPalette(),
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.text",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: randomFromPalette(),
        },
      ],
    },
    {
      featureType: "poi.business",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "geometry.fill",
      stylers: [
        {
          color: randomFromPalette(),
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: randomFromPalette(),
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        {
          color: randomFromPalette(),
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off", //!!!
        },
      ],
    },
    {
      featureType: "road.arterial",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road.arterial",
      elementType: "geometry",
      stylers: [
        {
          color: "#fdfcf8",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [
        {
          color: randomFromPalette(),
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: randomFromPalette(),
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "labels",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road.highway.controlled_access",
      elementType: "geometry",
      stylers: [
        {
          color: randomFromPalette(),
        },
      ],
    },
    {
      featureType: "road.highway.controlled_access",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: randomFromPalette(),
        },
      ],
    },
    {
      featureType: "road.local",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road.local",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: randomFromPalette(),
        },
      ],
    },
    {
      featureType: "transit",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "transit.line",
      elementType: "geometry",
      stylers: [
        {
          color: randomFromPalette(),
        },
      ],
    },
    {
      featureType: "transit.line",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: randomFromPalette(),
        },
      ],
    },
    {
      featureType: "transit.line",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: randomFromPalette(),
        },
      ],
    },
    {
      featureType: "transit.station",
      elementType: "geometry",
      stylers: [
        {
          color: randomFromPalette(),
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry.fill",
      stylers: [
        {
          color: randomFromPalette(),
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: randomFromPalette(),
        },
      ],
    },
  ];
  return scheme;
};

export const generateTestStyle = () => {
  return [
    {
      elementType: "geometry",
      stylers: [
        {
          color: "#ebe3cd",
        },
      ],
    },
    {
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#523735",
        },
      ],
    },
    {
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#f5f1e6",
        },
      ],
    },
    {
      featureType: "administrative",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#c9b2a6",
        },
      ],
    },
    {
      featureType: "administrative.land_parcel",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#dcd2be",
        },
      ],
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#ae9e90",
        },
      ],
    },
    {
      featureType: "administrative.neighborhood",
      stylers: [
        {
          color: "#ffeb3b",
        },
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "administrative.neighborhood",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#ffeb3b",
        },
      ],
    },
    {
      featureType: "landscape.natural",
      elementType: "geometry",
      stylers: [
        {
          color: "#dfd2ae",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [
        {
          color: "#dfd2ae",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#93817c",
        },
      ],
    },
    {
      featureType: "poi.attraction",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#a5b076",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#447530",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        {
          color: "#f5f1e6",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road.arterial",
      elementType: "geometry",
      stylers: [
        {
          color: "#fdfcf8",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [
        {
          color: "#f8c967",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#e9bc62",
        },
      ],
    },
    {
      featureType: "road.highway.controlled_access",
      elementType: "geometry",
      stylers: [
        {
          color: "#e98d58",
        },
      ],
    },
    {
      featureType: "road.highway.controlled_access",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#db8555",
        },
      ],
    },
    {
      featureType: "road.local",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#806b63",
        },
      ],
    },
    {
      featureType: "transit.line",
      elementType: "geometry",
      stylers: [
        {
          color: "#dfd2ae",
        },
      ],
    },
    {
      featureType: "transit.line",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#8f7d77",
        },
      ],
    },
    {
      featureType: "transit.line",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#ebe3cd",
        },
      ],
    },
    {
      featureType: "transit.station",
      elementType: "geometry",
      stylers: [
        {
          color: "#dfd2ae",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#b9d3c2",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#92998d",
        },
      ],
    },
  ];
};
