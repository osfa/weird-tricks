<template>
  <div>
    <GmapMap
      v-if="true"
      ref="mapRef"
      :options="{
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: true,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        disableDefaultUi: false,
        scrollwheel: true,
        styles: mapStyle.styles,
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
      <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        :icon="m.icon"
        :label="m.label"
        @click="markerClick(m)"
      />

      <gmap-custom-marker :marker="customMarker">
        <img src="http://lorempixel.com/50/50/nature/" />
        <span>WAZZZAP</span>
      </gmap-custom-marker>

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

const mapMarker = "http://lorempixel.com/100/100/nature/"; // require if assets

export default {
  components: {
    RegularNav,
    "gmap-custom-marker": GmapCustomMarker,
  },
  data: () => ({
    zoom: 7,
    mapType: "terrain",
    mapStyle: {
      // other properties...
      styles: [
        { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
        {
          featureType: "administrative.locality",
          elementType: "labels.text.fill",
          stylers: [{ color: "#d59563" }],
        },
        {
          featureType: "poi",
          elementType: "labels.text.fill",
          stylers: [{ color: "#d59563" }],
        },
        {
          featureType: "poi.park",
          elementType: "geometry",
          stylers: [{ color: "#263c3f" }],
        },
        {
          featureType: "poi.park",
          elementType: "labels.text.fill",
          stylers: [{ color: "#6b9a76" }],
        },
        {
          featureType: "road",
          elementType: "geometry",
          stylers: [{ color: "#38414e" }],
        },
        {
          featureType: "road",
          elementType: "geometry.stroke",
          stylers: [{ color: "#212a37" }],
        },
        {
          featureType: "road",
          elementType: "labels.text.fill",
          stylers: [{ color: "#9ca5b3" }],
        },
        {
          featureType: "road.highway",
          elementType: "geometry",
          stylers: [{ color: "#746855" }],
        },
        {
          featureType: "road.highway",
          elementType: "geometry.stroke",
          stylers: [{ color: "#1f2835" }],
        },
        {
          featureType: "road.highway",
          elementType: "labels.text.fill",
          stylers: [{ color: "#f3d19c" }],
        },
        {
          featureType: "transit",
          elementType: "geometry",
          stylers: [{ color: "#2f3948" }],
        },
        {
          featureType: "transit.station",
          elementType: "labels.text.fill",
          stylers: [{ color: "#d59563" }],
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [{ color: "#17263c" }],
        },
        {
          featureType: "water",
          elementType: "labels.text.fill",
          stylers: [{ color: "#515c6d" }],
        },
        {
          featureType: "water",
          elementType: "labels.text.stroke",
          stylers: [{ color: "#17263c" }],
        },
      ],
    },
    markers: [
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
    ],
    circleMarkers: [],
    customMarker: {
      lat: 10,
      lng: 10,
    },
    center: { lat: 10, lng: 10 },
  }),
  async mounted() {
    this.$store.commit("setMainContent", this.$static.blogPosts.edges);
    await this.$gmapApiPromiseLazy();
    const circleCoords = [
      ...this.drawCircle(new google.maps.LatLng(10, 10), 100, 1),
      ...this.drawCircle(new google.maps.LatLng(10, 10), 200, 1),
    ];
    this.circleMarkers = circleCoords.map((m) => {
      return {
        position: {
          lat: m.lat(),
          lng: m.lng(),
        },
      };
    });
    console.log(potato);
    // this.circleMarkers =
  },
  methods: {
    markerClick(marker) {
      console.log("potato");
      this.center = marker.position;
      this.$emit("markerClicked");
    },
    drawCircle(point, radius, dir) {
      console.log("drawcircle1");

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
    },
  },
  watch: {
    $route: function () {
      function getRandomInRange(from, to, fixed) {
        return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
      }
      const lat = getRandomInRange(-90, 90, 3);
      const lng = getRandomInRange(-180, 180, 3);
      console.log(lat, lng);
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
