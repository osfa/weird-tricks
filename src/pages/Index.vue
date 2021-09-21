<template>
  <v-app id="inspire">
    <SidebarHover></SidebarHover>
    <v-main>index</v-main>
  </v-app>
</template>

<script>
import BaseWireFrameLayout from "~/layouts/BaseWireFrameLayout.vue";
import SidebarHover from "~/components/SidebarHover.vue";

export default {
  components: {
    BaseWireFrameLayout,
    SidebarHover,
  },
  data: () => ({ drawer: false }),
};
</script>
