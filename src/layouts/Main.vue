<template>
  <div>
    <GmapMap
      v-if="true"
      ref="mapRef"
      :options="{
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        disableDefaultUi: false,
        scrollwheel: true,
        styles: mapStyles,
        minZoom: 4,
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
        v-for="(o, index) in groundOverlays"
        :key="`bound-${index}`"
        :source="o.source"
        :bounds="o.bounds"
        :opacity="o.opacity"
      >
      </ground-overlay>

      <!-- <gmap-polyline
        v-bind:path.sync="path"
        v-bind:options="{ strokeColor: strokeColor(), geodesic: true }"
      >
      </gmap-polyline> -->

      <!-- <GmapMarker
        :key="`cloud-${index}`"
        v-for="(m, index) in cloudMarkers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        :icon="m.icon"
        :label="m.label"
        @click="markerClick(m)"
      /> -->

      <GmapMarker
        :key="`center-${index}`"
        v-for="(m, index) in centerMarkers"
        :position="m.position"
        :clickable="true"
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
        :clickable="false"
        :draggable="false"
        :icon="m.icon"
        :label="m.label"
      />
    </GmapMap>

    <slot />
  </div>
</template>

<script>
import GmapCustomMarker from "vue2-gmap-custom-marker";
import {
  generateRandomStyle,
  randomMaterialColor,
  random,
  randomIcon,
  randomFloat,
} from "~/util";
import { customStyle } from "~/mapStyler";
import { cloudMarkers, getTileBounds, getCircleMarkers } from "~/map-util";
import { gmapApi } from "gmap-vue";
import ActionBar from "~/components/ActionBar.vue";

import { data as allLeyLinesData } from "~/data/geo/Leylines";
import { data as currys } from "~/data/geo/Currys";

// if (feature.getGeometry().getType() === "Point") {
//       console.log("sync?");
//       this.curryPointsGLatLng.push(feature.getGeometry().g);
//     }
const stockholm = { lat: 59.32181269185499, lng: 18.05670232773647 };
const leyline1 = { lat: 25.489491583308883, lng: -4.7713413023755225 };
const something = { lat: -28, lng: 137 };

// import * as GmapVue from "gmap-vue";
// import DirectionsRenderer from './DirectionsRenderer.js'

const centerStart = leyline1;
const tilt = 90;

export default {
  components: {
    "gmap-custom-marker": GmapCustomMarker,
    // ActionBar,
  },
  data: () => ({
    map: undefined,
    zoom: 8,
    currentMapType: "terrain",
    imgMarkers: [],
    // cloudMarkers: [],
    centerMarkers: [],
    circleMarkers: [],
    availableOverlays: [
      require("~/assets/tiles/complete1.png"),
      require("~/assets/tiles/complete2.png"),
      require("~/assets/tiles/complete3.png"),
      // "https://khms3.google.com/kh/v=908?x=164&y=395&z=10", // cupertino
    ],
    curryPoints: currys.map((e) => [
      e.geometry.coordinates[1],
      e.geometry.coordinates[0],
    ]),
    center: centerStart, // move to vuex?
    groundOverlays: [],
    currentStyle: customStyle(),
    leyLinesColor: "#FFFFFF", //randomMaterialColor(),
    lastPos: undefined,
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

    // await this.$gmapApiPromiseLazy();

    this.$refs.mapRef.$mapPromise.then((map) => {
      this.$store.commit("setIsLoading", false);
      this.setCenter(this.center);

      this.map = map;
      this.drawLeyLines();
      // this.drawLocationArrows();
      this.drawPatternMarkers(this.center.lat, this.center.lng);
      this.drawOverlay();
    });
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
      this.setCenter(marker.position);
      this.$emit("markerClicked");
    },
    setCenter(center) {
      this.center = center;
      this.$store.commit("setCenter", this.center);

      var icon = {
        path: "M-20,0a20,20 0 1,0 40,0a20,20 0 1,0 -40,0",
        fillColor: "#FFFFFF",
        fillOpacity: 0.9,
        anchor: new google.maps.Point(0, 0),
        strokeWeight: 0,
        scale: 0.5,
      };
      var centerMarker = new google.maps.Marker({
        position: { lat: this.center.lat, lng: this.center.lng },
        draggable: false,
        icon: icon,
      });
      // this.centerMarkers.push(centerMarker);
    },
    mark(event) {
      console.log("click at:", event.latLng.lat(), event.latLng.lng());
    },
    drawPatternMarkers(lat, lng) {
      this.circleMarkers = getCircleMarkers(
        lat || this.center.lat,
        lng || this.center.lng,
        this.zoom,
        random(3, 8) // ring count
      );
    },
    mapNav() {
      this.zoom = random(4, 12);
      let sampled = this.curryPoints.sample();
      this.map.panTo({
        lat: sampled[0],
        lng: sampled[1],
      });
      this.setCenter({ lat: sampled[0], lng: sampled[1] });
    },
    drawOverlay() {
      console.log("draw at:", this.center);
      const tileExtent = random(0, 3);

      console.log("tilextent: ", tileExtent);
      const tileSource = `https://khms3.google.com/kh/v=908?x=${random(
        140,
        164
      )}&y=${random(380, 400)}&z=${random(9, 10)}`;

      this.groundOverlays.push({
        // source: this.availableOverlays.sample(),
        source: tileSource,
        bounds: getTileBounds(this.center, this.zoom, tileExtent),
        opacity: randomFloat(0.8, 1.0),
      });
      // https://khms3.google.com/kh/v=908?x=164&y=395&z=10 cupertino
    },
    drawLocationArrows() {
      // draw new arrow for each moevemnt? diff color diff pattern?
      let lineCoordinates = [
        new google.maps.LatLng(53.215556, 56.949219),
        new google.maps.LatLng(75.797201, 125.003906),
        new google.maps.LatLng(37.7833, 144.9667),
        new google.maps.LatLng(-24.797201, 26.003906),
        new google.maps.LatLng(27.797201, -101.003906),
      ];

      // https://developers.google.com/maps/documentation/javascript/symbols#predefined
      const lineSymbol = {
        path: google.maps.SymbolPath.FORWARD_OPEN_ARROW,
      };

      const curryPointsGLatLng = this.curryPoints.map(
        (c) => new google.maps.LatLng(c[0], c[1])
      );
      lineCoordinates = curryPointsGLatLng;
      lineCoordinates = [this.lastPos];

      const gCenter = new google.maps.LatLng(this.center.lat, this.center.lng);
      lineCoordinates.forEach((l) => {
        const line = new google.maps.Polyline({
          path: [l, gCenter],
          strokeOpacity: 1,
          strokeWeight: 2,
          strokeColor: "#ff0000",
          geodesic: true,
          map: this.map,
          icons: [
            {
              icon: lineSymbol,
              offset: "80%",
              repeat: "30px",
            },
          ],
        });
      });
    },
    async drawLeyLines() {
      this.map.data.addListener("addfeature", function (e) {
        const isYinYang =
          e.feature.getProperty("Name").includes("Yang") ||
          e.feature.getProperty("Name").includes("Yin");
        if (e.feature.getGeometry().getType() === "LineString" && !isYinYang) {
          this.map.data.overrideStyle(e.feature, { visible: false });
          new google.maps.Polyline({
            path: e.feature.getGeometry().getArray(),
            map: this.map,
            geodesic: true,
            strokeColor: randomMaterialColor(),
            strokeWeight: 1,
            strokeOpacity: 1,
          });
        }
      });

      this.map.data.addGeoJson(allLeyLinesData);

      var featureStyle = {
        strokeColor: this.leyLinesColor,
        strokeWeight: 1, // rand?
        strokeOpacity: 0.5, // rand?
      };

      this.map.data.setStyle(featureStyle);
      this.map.data.setStyle((feature) => {
        let color = this.leyLinesColor;
        let strokeWeight = random(1, 2);
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
          strokeWeight = 1;
        }

        if (feature.getProperty("Name").includes("Yin")) {
          color = "white";
          strokeWeight = 1;
        }

        return {
          strokeColor: color,
          strokeWeight: strokeWeight,
          strokeOpacity: 0.5, // rand?
        };
      });
    },
    strokeColor() {
      return randomMaterialColor();
    },
  },
  watch: {
    "$store.state.mapIdx": function () {
      console.log(this.$store.state.mapIdx);
      this.mapNav();
    },
    $route: function () {
      this.$store.commit("addPoints");
      this.$store.commit("setIsLoading", true);

      function getRandomInRange(from, to, fixed) {
        return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
      }

      let lat = getRandomInRange(-90, 90, 3);
      let lng = getRandomInRange(-180, 180, 3);
      console.log("random pos currently at:", lat, lng);

      this.currentStyle = generateRandomStyle();
      this.zoom = random(4, 15);
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
        ...this.curryPoints,
      ];

      this.$nextTick(() => {
        if (this.$refs.mapRef) {
          this.$refs.mapRef.$mapPromise.then((map) => {
            this.lastPos = this.center;
            let chosen =
              somePositions[Math.floor(Math.random() * somePositions.length)];
            lat = chosen[0];
            lng = chosen[1];
            console.log("moving to:", lat, lng);
            map.panTo({
              lat,
              lng,
            });

            this.setCenter({ lat, lng });

            this.drawPatternMarkers(lat, lng);
            this.drawLocationArrows();
            this.drawOverlay();
          });
        }
        this.$store.commit("setIsLoading", false);
      });
    },
  },
};
</script>

<style></style>
