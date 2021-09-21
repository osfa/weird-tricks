<template>
  <v-app id="about">
    <SidebarHover></SidebarHover>

    <v-main>
      <GmapMap
        :center="{ lat: 10, lng: 10 }"
        :zoom="7"
        map-type-id="terrain"
        style="width: 500px; height: 300px"
      >
        <GmapMarker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          :clickable="true"
          :draggable="true"
          @click="center = m.position"
        />
      </GmapMap>
    </v-main>
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
  data: () => ({ drawer: false }, { markers: [] }),
};
</script>
