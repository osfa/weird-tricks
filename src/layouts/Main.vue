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
        minZoom: 5,
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

      <GmapMarker
        :key="index"
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
        :key="index"
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
import { generateRandomStyle, generateTestStyle } from "~/util";
import { customStyle } from "~/mapStyler";
import { cloudMarkers, getTileBounds } from "~/map-util";
import { gmapApi } from "gmap-vue";

// import { randomWords } from "random-words";
// import * as GmapVue from "gmap-vue";
// import DirectionsRenderer from './DirectionsRenderer.js'

export default {
  // mixins: [GmapVue.MapElementMixin],
  components: {
    RegularNav,
    "gmap-custom-marker": GmapCustomMarker,
  },
  data: () => ({
    map: undefined,
    zoom: 15,
    currentMapType: "terrain",
    imgMarkers: [],
    cloudMarkers: cloudMarkers,
    circleMarkers: [],
    richFormatMarkers: [],
    // center: { lat: 62.323907, lng: -150.109291 },
    center: { lat: 59.32181269185499, lng: 18.05670232773647 },
    groundOverlayBounds: undefined,
    groundOverlaySource: "https://khms1.google.com/kh/v=908?x=36&y=17&z=6",
    currentStyle: customStyle(),
  }),
  async mounted() {
    console.log("main mount");
    console.log(customStyle());
    this.$store.commit("setMainContent", this.$static.nodes.edges);
    await this.$gmapApiPromiseLazy();
    // this.groundOverlayBounds = getTileBounds(google, this.center, this.zoom);
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
          });
        }
      });
    },
  },
};
</script>

<style></style>
