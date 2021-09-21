<template>
  <Layout>
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
      console.log("markerClick");
      this.center = marker.position;
      this.$emit("markerClicked");
    },
    // forceNavigate() {
    //   // https://stackoverflow.com/questions/42615445/vuejs-2-0-emit-event-from-grand-child-to-his-grand-parent-component
    //   console.log("emit to all");
    //   this.$emit("force-nav");
    //   let vm = this.$parent;
    //   while (vm) {
    //     vm.$emit("force-nav");
    //     vm = vm.$parent;
    //   }
    // },
  },
  // beforeRouteLeave(to, from, next) {
  //   console.log("index route leave");
  //   // called when the route that renders this component is about to
  //   // be navigated away from.
  //   // has access to `this` component instance.
  // },
};
</script>
