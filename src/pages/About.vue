<template>
  <v-app id="about">
    <SidebarHover></SidebarHover>

    <v-main>
      <GmapMap
        ref="mapRef"
        :center="{ lat: 10, lng: 10 }"
        :zoom="7"
        map-type-id="terrain"
        style="width: 100%; height: 300px"
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
  mounted: function () {
    console.log(process.env.NODE_ENV);
    console.log(process.env.GRIDSOME_MAPS_KEY);
    this.$refs.mapRef.$mapPromise.then((map) => {
      map.panTo({ lat: 1.38, lng: 103.8 });
    });
  },
};
</script>
