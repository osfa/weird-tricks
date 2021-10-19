<template>
  <div
    id="cloud-overlay"
    :style="[
      {
        zIndex: 3,
      },
    ]"
  >
    <CloudSimple
      :top="randPosVal()"
      :left="randPosVal()"
      :width="randWidthVal()"
      :height="randHeightVal()"
      :speed="100"
    />
    <CloudSimple
      :top="randPosVal()"
      :left="randPosVal()"
      :width="randWidthVal()"
      :height="randHeightVal()"
      :speed="200"
    />
    <CloudSimple
      :top="randPosVal()"
      :left="randPosVal()"
      :width="randWidthVal()"
      :height="randHeightVal()"
      :speed="200"
    />
  </div>
</template>

<script>
import CloudSimple from "~/components/CloudSimple.vue";
import { random } from "~/util";

export default {
  components: { CloudSimple },
  data: () => ({
    speed: 200,
  }),
  methods: {
    randPosVal() {
      return random(-30, 100);
    },
    randWidthVal() {
      return random(500, 1000);
    },
    randHeightVal() {
      return random(200, 600);
    },
  },
};
</script>

<style>
#cloud-overlay {
  pointer-events: none;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0.8;
  /* background: blue; need sky? */
}
</style>
