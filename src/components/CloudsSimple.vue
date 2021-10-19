<template>
  <div id="cloud-overlay">
    <div class="cloud-container">
      <div
        class="cloud"
        id="cloud-base"
        :style="[baseStyles, boxShadowStyle]"
      ></div>
    </div>
    <svg width="0" height="0">
      <filter id="cloud-filter">
        <feTurbulence
          type="fractalNoise"
          :baseFrequency="baseFrequencyVal"
          :numOctaves="numOctavesVal"
          :seed="seedVal"
        />
        <feDisplacementMap in="SourceGraphic" :scale="scaleVal" />
      </filter>
    </svg>
  </div>
</template>

<script>
export default {
  data: () => ({
    baseStyles: {
      // transform: "translate(-40vw, -45vh)", // better to animate then maring?
    },
  }),
  props: {
    width: { type: Number, default: 500 },
    height: { type: Number, default: 100 },

    // box shadow vals
    blurVal: { type: Number, default: 19 },
    spreadVal: { type: Number, default: 40 },
    opacity: { type: Number, default: 0.9 },

    // svg vals
    scaleVal: { type: Number, default: 120 },
    numOctavesVal: { type: Number, default: 5 },
    baseFrequencyVal: { type: Number, default: 0.011 },
    seedVal: { type: Number, default: 8517 },
  },
  computed: {
    boxShadowStyle() {
      console.log(this.blurVal);
      return {
        // transform: "translate(-40vw, -45vh)",
        boxShadow: `200px 170px ${this.blurVal}px ${this.spreadVal}px rgba(255, 255, 255, ${this.opacity})`, // opac?
      };
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
  /* background: blue; need sky? */
  z-index: 1000;
}

.cloud {
  width: 500px;
  height: 100px;

  border-radius: 50%;
  position: absolute;
  /* top: 30%;
  left: 30%; */

  animation: movecloud 60s linear infinite;
}

#cloud-base {
  filter: url(#cloud-filter);
}

/* translate more efficient? */
@keyframes movecloud {
  0% {
    margin-left: 0;
  }
  100% {
    margin-left: -300vw;
  }
}
</style>
