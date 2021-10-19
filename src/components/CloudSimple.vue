<template>
  <div class="cloud-container">
    <div class="cloud" id="cloud-base" :style="[cloudStyles]"></div>
    <svg width="0" height="0">
      <filter :id="filterId">
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
import { random } from "~/util";
export default {
  data: () => ({
    seedVal: random(0, 10000),
  }),
  props: {
    speed: { type: Number, default: 120 },
    top: { type: Number, default: 10 },
    left: { type: Number, default: 10 },

    width: { type: Number, default: 500 },
    height: { type: Number, default: 100 },

    opacity: { type: Number, default: 0.9 },

    // box shadow vals
    // blurVal: { type: Number, default: 19 },
    // spreadVal: { type: Number, default: 40 },

    //
    // scaleVal: { type: Number, default: 120 },
    // numOctavesVal: { type: Number, default: 5 },
    // baseFrequencyVal: { type: Number, default: 0.011 },
    // seedVal: { type: Number, default: 8517 },

    // hazy
    blurVal: { type: Number, default: 100 },
    spreadVal: { type: Number, default: 50 },

    scaleVal: { type: Number, default: 220 },
    numOctavesVal: { type: Number, default: 8 },
    baseFrequencyVal: { type: Number, default: 0.01 },
    // seedVal: { type: Number, default: 0 },
  },
  methods: {},
  computed: {
    filterId() {
      return `cloud-filter-${this._uid}`;
    },
    cloudStyles() {
      console.log(this.blurVal);
      return {
        top: `${this.top}vh`,
        left: `${this.left}vw`,
        marginTop: `${-this.height - 150}px`, // offset handle for boxshadow
        width: `${this.width}px`,
        height: `${this.height}px`,

        animation: `movecloud ${this.speed}s linear infinite`,

        filter: `url(#${this.filterId})`,

        // 200x, 170px original : given 500 and 100.
        boxShadow: `200px ${this.height + 150}px ${this.blurVal}px ${
          this.spreadVal
        }px rgba(255, 255, 255, ${this.opacity})`,
      };
    },
  },
};
</script>

<style>
.cloud {
  border-radius: 50%;
  position: absolute;
}

/* translate more efficient? */
@keyframes movecloud {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(-250vw, 0);
  }
}
</style>
