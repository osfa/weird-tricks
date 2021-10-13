import { randomFromPalette } from "~/assets/colors/palette1";

const features = [
  {
    name: "administrative",
    children: [
      "country",
      "province",
      "locality",
      "neighborhood",
      "land_parcel",
    ],
  },
  {
    name: "landscape",
    children: ["man_made", "natural.terrain", "natural.landcover"],
  },
  {
    name: "poi",
    children: [
      "attraction",
      "business",
      "government",
      "medical",
      "park",
      "place_of_worship",
      "school",
      "place_of_worship",
      "sports_complex",
    ],
  },
  {
    name: "road",
    children: ["highway.controlled_access", "arterial", "local"],
  },
  {
    name: "transit",
    children: ["line", "station.airport", "station.bus", "station.rail"],
  },
  {
    name: "water",
    children: [],
  },
];

const elements = ["geometry"];
const elementsAdvanced = ["geometry.fill", "geometry.stroke"];

const defaultStylers = [
  {
    visibility: "on",
  },
  {
    color: randomFromPalette(),
  },
];

export const customStyle = () => {
  let scheme = [
    {
      featureType: "all",
      elementType: "labels.text",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "all",
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off",
        },
        {
          color: randomFromPalette(), // hmm
        },
      ],
    },
  ];

  // console.log("==== CUSTOM STYLE");

  for (let feature of features) {
    // console.log(feature);
    if (!feature["children"]) {
      const styleObject = {
        featureType: feature["name"],
        elementType: "geometry.fill",
        stylers: defaultStylers,
      };
      scheme.push(styleObject);
    }
    for (let c of feature["children"]) {
      const featureName = `${feature["name"]}.${c}`;
      const styleObject = {
        featureType: featureName,
        elementType: "geometry.fill",
        stylers: defaultStylers,
      };
      scheme.push(styleObject);
    }
  }

  return scheme;
};
