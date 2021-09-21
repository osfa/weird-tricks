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
        scrollwheel: false,
      }"
      :center="center"
      :zoom="zoom"
      map-type-id="terrain"
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
        @click="markerClick(m)"
      />
    </GmapMap>
    <slot />
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>
<script>
import RegularNav from "~/components/RegularNav.vue";

export default {
  components: {
    RegularNav,
  },
  data: () => ({
    zoom: 10,
    markers: [
      {
        position: {
          lat: 15.0,
          lng: 15.0,
        },
        weight: 100,
      },
      {
        position: {
          lat: 14.0,
          lng: 13.0,
        },
        weight: 50,
      },
    ],
    center: { lat: 10, lng: 10 },
  }),
  async mounted() {
    console.log(process.env.NODE_ENV);

    await this.$gmapApiPromiseLazy();
  },
  methods: {
    markerClick(marker) {
      console.log("potato");
      this.center = marker.position;
      this.$emit("markerClicked");
    },
  },
  watch: {
    $route: function () {
      function getRandomInRange(from, to, fixed) {
        return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
      }

      this.$refs.mapRef.$mapPromise.then((map) => {
        map.panTo({
          lat: getRandomInRange(-90, 90, 3),
          lng: getRandomInRange(-180, 180, 3),
        });
      });
    },
  },
};
</script>

<style></style>
