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
        //minZoom: 5,
      }"
      :center="center"
      :zoom="zoom"
      :map-type-id="mapType"
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
  query BlogPost {
    blogPosts: allContentfulBlogPost(sortBy: "published_at", order: DESC) {
      edges {
        node {
          id
          title
          slug
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
import { generateRandomStyle } from "~/util";
import { cloudMarkers, availableMapTypes, getTileBounds } from "~/map-util";
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
    zoom: 8,
    currentMapType: "terrain",
    imgMarkers: [],
    cloudMarkers: [], //cloudMarkers,
    circleMarkers: [],
    richFormatMarkers: [],
    center: { lat: 62.323907, lng: -150.109291 },
    groundOverlayBounds: undefined,
    groundOverlaySource: "https://khms1.google.com/kh/v=908?x=36&y=17&z=6",
    currentStyle: generateRandomStyle(),
  }),
  async mounted() {
    console.log("main mount");
    this.$store.commit("setMainContent", this.$static.blogPosts.edges);
    await this.$gmapApiPromiseLazy();

    this.groundOverlayBounds = getTileBounds(google, this.center, this.zoom);
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
  },
  watch: {
    $route: function () {
      function getRandomInRange(from, to, fixed) {
        return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
      }
      const lat = getRandomInRange(-90, 90, 3);
      const lng = getRandomInRange(-180, 180, 3);
      console.log("currently at:", lat, lng);

      this.currentStyle = generateRandomStyle();
      this.currentMapType =
        availableMapTypes[Math.floor(Math.random() * availableMapTypes.length)];

      this.$nextTick(() => {
        if (this.$refs.mapRef) {
          this.$refs.mapRef.$mapPromise.then((map) => {
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
