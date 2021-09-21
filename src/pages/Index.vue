<template>
  <Layout>
    <g-link to="/blog">Blog</g-link>
    <Inbox class="mt-6"></Inbox>
  </Layout>
</template>

<script>
import Inbox from "~/components/Inbox.vue";

export default {
  components: {
    Inbox,
  },
  data: () => ({}),
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
