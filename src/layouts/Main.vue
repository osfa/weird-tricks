<template>
  <div>
    <GmapMap
      v-if="true"
      ref="mapRef"
      :options="{
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: true,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: true,
        disableDefaultUi: false,
        scrollwheel: true,
        styles: mapStyles,
        minZoom: 6,
      }"
      :center="center"
      :zoom="zoom"
      :map-type-id="mapType"
      @click="mark"
      style="
        width: 100%;
        height: 100%;
        will-change: transform;
        transform: translateZ(0);
        position: fixed;
        z-index: 1;
      "
    >
      <ground-overlay
        v-if="groundOverlayBounds"
        :source="groundOverlaySource"
        :bounds="groundOverlayBounds"
        :opacity="1.0"
      >
      </ground-overlay>

      <gmap-polyline
        v-if="false"
        v-bind:path.sync="path"
        v-bind:options="{ strokeColor: strokeColor() }"
      >
      </gmap-polyline>

      <GmapMarker
        :key="`cloud-${index}`"
        v-for="(m, index) in cloudMarkers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        :icon="m.icon"
        :label="m.label"
        @click="markerClick(m)"
      />

      <!-- <gmap-custom-marker
        :key="index"
        v-for="(m, index) in richFormatMarkers"
        :marker="m"
      >
        <img src="http://lorempixel.com/50/50/nature/" />
        <span v-if="m.label">{{ m.label }}</span>
      </gmap-custom-marker> -->

      <GmapMarker
        :key="`circle-${index}`"
        v-for="(m, index) in circleMarkers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        :icon="m.icon"
        :label="m.label"
        @click="markerClick(m)"
      />
    </GmapMap>

    <slot />

    <CloudDisplay v-if="true" />
  </div>
</template>

<static-query>
  query Node {
    nodes: allContentfulNode(sortBy: "published_at", order: DESC) {
      edges {
        node {
          id
          title
          heroImage {
            file {
              url
            }
          },
        }
      }
    }
  }
</static-query>

<script>
import CloudDisplay from "~/components/CloudDisplay.vue";

import RegularNav from "~/components/nav/RegularNav.vue";
import GmapCustomMarker from "vue2-gmap-custom-marker";
import {
  generateRandomStyle,
  randomMaterialColor,
  random,
  randomIcon,
} from "~/util";
import { customStyle } from "~/mapStyler";
import { cloudMarkers, getTileBounds, getCircleMarkers } from "~/map-util";
import { gmapApi } from "gmap-vue";

import { data as allLeyLinesData } from "~/data/geo/Leylines";

const stockholm = { lat: 59.32181269185499, lng: 18.05670232773647 };
const leyline1 = { lat: 25.489491583308883, lng: -4.7713413023755225 };
const something = { lat: -28, lng: 137 };

// import * as GmapVue from "gmap-vue";
// import DirectionsRenderer from './DirectionsRenderer.js'

const centerStart = leyline1;
const tilt = 90;

export default {
  components: {
    CloudDisplay,
    RegularNav,
    "gmap-custom-marker": GmapCustomMarker,
  },
  data: () => ({
    map: undefined,
    zoom: 8,
    currentMapType: "terrain",
    imgMarkers: [],
    cloudMarkers: [],
    circleMarkers: [],
    richFormatMarkers: [],
    center: centerStart,
    groundOverlayBounds: undefined,
    groundOverlaySource: "https://khms1.google.com/kh/v=908?x=36&y=17&z=6",
    currentStyle: customStyle(),
    leyLinesColor: "#FFFFFF", //randomMaterialColor(),
    path: [
      // line 1
      { lat: centerStart.lat, lng: centerStart.lng },
      { lat: tilt, lng: centerStart.lng },

      // line 2
      { lat: tilt, lng: -(180 - centerStart.lng) }, //     og: antonode  { lat: -centerStart.lat, lng: -(180 - centerStart.lng) },
      { lat: -tilt, lng: -(180 - centerStart.lng) },

      // line 3
      { lat: -tilt, lng: centerStart.lng },
      { lat: centerStart.lat, lng: centerStart.lng },
    ],
  }),
  async mounted() {
    console.log("main mount");
    this.$store.commit("setMainContent", this.$static.nodes.edges);
    await this.$gmapApiPromiseLazy();

    this.drawPatternMarkers(this.center.lat, this.center.lng);

    this.$refs.mapRef.$mapPromise.then((map) => {
      this.map = map;

      this.map.data.addGeoJson(allLeyLinesData);

      var featureStyle = {
        strokeColor: this.leyLinesColor,
        strokeWeight: 1, // rand?
        strokeOpacity: 0.5, // rand?
      };

      map.data.setStyle(featureStyle);
      map.data.setStyle((feature) => {
        let color = this.leyLinesColor;
        let strokeWeight = 0.5;
        const leyLineLayers = [
          ["Octahedrons", randomMaterialColor()],
          ["Rhombic Dodec", randomMaterialColor()],
          ["Alison", randomMaterialColor()],
          ["Icosahedron", randomMaterialColor()],
          ["Dodecahedron", randomMaterialColor()],
          ["I_Octahedron", randomMaterialColor()],
          ["Cube", randomMaterialColor()],
          ["Tetrahedron", randomMaterialColor()],
          ["Triacontahedron", randomMaterialColor()],
          ["--", randomMaterialColor()], // haagens
        ];

        leyLineLayers.forEach((leylineType) => {
          if (feature.getProperty("Name").includes(leylineType[0])) {
            color = leylineType[1];
          }
        });

        if (feature.getProperty("Name").includes("Yang")) {
          color = "black";
          strokeWeight = 1.5;
        }

        if (feature.getProperty("Name").includes("Yin")) {
          color = "white";
          strokeWeight = 1.5;
        }

        return {
          strokeColor: color,
          strokeWeight: strokeWeight,
          strokeOpacity: 0.5, // rand?
        };
      });
    });

    var startLatLng = new google.maps.LatLng(
      this.path[1].lat,
      this.path[1].lng
    );
    var endLatLng = new google.maps.LatLng(this.path[0].lat, this.path[0].lng);

    // normal middle
    // var normalPolyline = new google.maps.Polyline({
    //   path: [startLatLng, endLatLng],
    //   strokeColor: "#0000FF",
    //   strokeOpacity: 0.5,
    //   strokeWeight: 2,
    //   map: this.map,
    // });
    // console.log(startLatLng);

    // var normalCenterPoint = normalPolyline.GetPointAtDistance(
    //   startLatLng.distanceFrom(endLatLng) / 2
    // );
    // console.log("normalCenterPoint: ", normalCenterPoint);

    // this.cloudMarkers = [
    //   {
    //     position: {
    //       lat: normalCenterPoint.lat(),
    //       lng: normalCenterPoint.lng(),
    //     },
    //   },
    // ];

    // var geodesicPoly = new google.maps.Polyline({
    //   path: [startLatLng, endLatLng],
    //   strokeColor: "#00FF00",
    //   strokeOpacity: 0.5,
    //   strokeWeight: 2,
    //   geodesic: true,
    //   map: this.map,
    // });

    // var geodesicCenterPoint = calcGeodesicPolyline.GetPointAtDistance(
    //   startLatLng.distanceFrom(endLatLng) / 2
    // );

    // var projection = map.getProjection();
    // var startPoint = projection.fromLatLngToPoint(startLatLng);
    // var endPoint = projection.fromLatLngToPoint(endLatLng);

    // var midPoint = new google.maps.Point(
    //   (startPoint.x + endPoint.x) / 2,
    //   (startPoint.y + endPoint.y) / 2
    // );
    // var midLatLng = projection.fromPointToLatLng(midPoint);
    // console.log(midLatLng);
  },
  computed: {
    mapStyles() {
      return this.currentStyle;
    },
    mapType() {
      return this.currentMapType;
    },
    google() {
      return gmapApi;
    },
  },
  methods: {
    markerClick(marker) {
      this.center = marker.position;
      this.$emit("markerClicked");
    },
    mark(event) {
      console.log("click at:", event.latLng.lat(), event.latLng.lng());
    },
    drawPatternMarkers(lat, lng) {
      const offset = 1;
      this.circleMarkers = getCircleMarkers(
        lat - offset,
        lng - offset,
        random(1, this.zoom * 4), // radius, base on zoom level?
        random(15, 30) // ring count
      );
    },
    strokeColor() {
      return randomMaterialColor();
    },
  },
  watch: {
    $route: function () {
      function getRandomInRange(from, to, fixed) {
        return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
      }

      let lat = getRandomInRange(-90, 90, 3);
      let lng = getRandomInRange(-180, 180, 3);
      console.log("random pos currently at:", lat, lng);

      this.currentStyle = generateRandomStyle();
      this.zoom = random(6, 15);
      const availableMapTypes = ["roadmap", "satellite", "hybrid", "terrain"];
      this.currentMapType =
        availableMapTypes[Math.floor(Math.random() * availableMapTypes.length)];

      const somePositions = [
        [8.725, -72.901],
        [55.191, 131.915],
        [59.65, 61.412],
        [69.737, -131.859],
        [18.939, 84.554],
        [-30.878, 119.985],
        [45.872, 110.432],
        [61.905, 6.805],
        [-76.61854793101789, -146.12874166143615],
        [-76.6633538306274, -145.91635401881496],
        [38.29694761047134, 45.42145298326993],
        [33.862490337877226, 73.90984347581889],
      ];
      this.$nextTick(() => {
        if (this.$refs.mapRef) {
          this.$refs.mapRef.$mapPromise.then((map) => {
            let chosen =
              somePositions[Math.floor(Math.random() * somePositions.length)];
            lat = chosen[0];
            lng = chosen[1];
            console.log("moving to:", lat, lng);
            map.panTo({
              lat,
              lng,
            });
            // this.center = { position: { lat: lat, lng: lng } };
            this.drawPatternMarkers(lat, lng);
          });
        }
      });
    },
  },
};
</script>

<style></style>
