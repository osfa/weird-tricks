<template>
  <Layout>
    <FloatingAction class="mt-6"></FloatingAction>
  </Layout>
</template>
<script>
import FloatingAction from "~/components/FloatingAction.vue";

export default {
  components: {
    FloatingAction,
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
  async mounted() {},
  methods: {
    markerClick(marker) {
      console.log("potato");
      this.center = marker.position;
      this.$emit("markerClicked");
    },
  },
};
</script>
