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
      :speed="300"
    />
    <CloudSimple
      :top="randPosVal()"
      :left="randPosVal()"
      :width="randWidthVal()"
      :height="randHeightVal()"
      :speed="400"
    />
    <CloudSimple
      :top="randPosVal()"
      :left="randPosVal()"
      :width="randWidthVal()"
      :height="randHeightVal()"
      :speed="500"
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
      return random(300, 800);
    },
    randHeightVal() {
      return random(100, 400);
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
  opacity: 0.75;
  /* background: blue; need sky? */
}
</style>
