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
        fullscreenControl: true,
        disableDefaultUi: false,
        scrollwheel: false,
      }"
      :center="center"
      :zoom="7"
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

    // this.$refs.mapRef.$mapPromise.then((map) => {
    //   map.panTo({ lat: 1.38, lng: 103.8 });
    // });

    // await this.$gmapApiPromiseLazy();
    // this.markers = [
    //   {
    //     location: new google.maps.LatLng({ lat: 4.5, lng: 99 }),
    //     weight: 100,
    //   },
    //   {
    //     location: new google.maps.LatLng({ lat: 5, lng: 99 }),
    //     weight: 50,
    //   },
    //   {
    //     location: new google.maps.LatLng({ lat: 6, lng: 97 }),
    //     weight: 80,
    //   },
    // ];
  },
  methods: {
    markerClick(marker) {
      console.log("potato");
      this.center = marker.position;
      this.$emit("markerClicked");
    },
  },
};
</script>

<style></style>
