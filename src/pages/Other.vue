<template>
  <v-app id="inspire">
    <!-- <v-navigation-drawer v-model="drawer" app>
      <g-link to="/about/">About us</g-link>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>You wont believe it</v-toolbar-title>
    </v-app-bar> -->

    <SidebarHover></SidebarHover>

    <v-main>other</v-main>
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
