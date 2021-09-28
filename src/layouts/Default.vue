<template>
  <v-main style="z-index: 5; pointer-events: none">
    <slot />
  </v-main>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>
<script>
import RegularNav from "~/components/nav/RegularNav.vue";

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
    // console.log(process.env.NODE_ENV);
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
