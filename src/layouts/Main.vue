<template>
  <div>
    <GmapMap
      v-if="true"
      ref="mapRef"
      :options="{
        zoomControl: false,
        mapTypeControl: true,
        scaleControl: true,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: true,
        disableDefaultUi: false,
        scrollwheel: true,
        styles: mapStyles,
        //minZoom: 5,
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

      <!-- <google-kml-layer
        :key="`kml-${index}`"
        v-for="(l, index) in kmlLayers"
        :url="l.url"
        :clickable="true"
      ></google-kml-layer> -->

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

import { data as yin } from "~/assets/geo/Yin_Lines";
import { data as rhombic } from "~/assets/geo/Rhombic_Dodecahedron";

const stockholm = { lat: 59.32181269185499, lng: 18.05670232773647 };
const something = { lat: -28, lng: 137 };
// import * as GmapVue from "gmap-vue";
// import DirectionsRenderer from './DirectionsRenderer.js'

const centerStart = stockholm;
const tilt = 90;

export default {
  components: {
    RegularNav,
    "gmap-custom-marker": GmapCustomMarker,
  },
  data: () => ({
    map: undefined,
    zoom: 10,
    currentMapType: "terrain",
    imgMarkers: [],
    cloudMarkers: [],
    circleMarkers: [],
    richFormatMarkers: [],
    kmlLayers: [
      {
        // url: "https://developers.google.com/maps/documentation/javascript/examples/kml/westcampus.kml",
        // url: "http://drive.google.com/uc?id=12nOsw-xWiu1yNRKzLwauTS82Ba_DsBGd", //leylines.kml'
        // url: "http://drive.google.com/uc?id=1Pjob1Xz1vIBb6NLC-9hBAgHhxjhqXbiN", // UV kmz
        // url: "http://drive.google.com/uc?id=1tRpEmpognGp_ExbaCpbvdoNOcO4wjvUG", // yinlines
      },
    ],
    center: centerStart,
    groundOverlayBounds: undefined,
    groundOverlaySource: "https://khms1.google.com/kh/v=908?x=36&y=17&z=6",
    currentStyle: customStyle(),
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
    // let recaptchaScript = document.createElement("script");
    // recaptchaScript.setAttribute(
    //   "src",
    //   "http://www.geocodezip.com/scripts/v3_epoly.js"
    // );
    // document.head.appendChild(recaptchaScript);

    console.log("main mount");
    this.$store.commit("setMainContent", this.$static.nodes.edges);
    await this.$gmapApiPromiseLazy();

    // this.circleMarkers = getCircleMarkers(
    //   this.center.lat,
    //   this.center.lng,
    //   0.5, // radius, base on zoom level?
    //   25 // ring count
    // );

    this.$refs.mapRef.$mapPromise.then((map) => {
      this.map = map;

      this.map.data.addGeoJson(yin);
      this.map.data.addGeoJson(rhombic);

      var featureStyle = {
        strokeColor: "#ff0000", //randomMaterialColor(),
        strokeWeight: 1,
      };

      map.data.setStyle(featureStyle);

      // this.map.data.loadGeoJson(
      //   "https://storage.googleapis.com/mapsdevsite/json/google.json"
      // );

      // this.zoom = 5;
      // let kml = new google.maps.KmlLayer({
      //   url: "http://drive.google.com/uc?id=12nOsw-xWiu1yNRKzLwauTS82Ba_DsBGd", //leylines.kml'
      //   // url: "http://drive.google.com/uc?id=1Pjob1Xz1vIBb6NLC-9hBAgHhxjhqXbiN", // UV kmz
      //   // url: "http://drive.google.com/uc?id=1tRpEmpognGp_ExbaCpbvdoNOcO4wjvUG", // yinlines
      //   preserveViewport: true,
      //   map: this.map,
      // });
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
    redrawPatternMarkers() {
      this.circleMarkers = getCircleMarkers(
        this.center.lat,
        this.center.lng,
        0.5, // radius, base on zoom level?
        25 // ring count
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
      const availableMapTypes = ["terrain"]; // ["roadmap", "satellite", "hybrid", "terrain"];
      this.currentMapType =
        availableMapTypes[Math.floor(Math.random() * availableMapTypes.length)];

      const somePositions = [
        [8.725, -72.901],
        [55.191, 131.915],
        [59.65, 61.412],
        [69.737, -131.859],
        // [30.807, -11.996],
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
            this.center = { position: { lat, lng } };
            this.redrawPatternMarkers();
          });
        }
      });
    },
  },
};
</script>

<style></style>
