<template>
  <div class="cloudContainer" v-if="cloudBase">
    <div class="cloudBase" :style="cloudBaseStyle">
      <img
        v-for="(c, index) in cloudBase.cloudLayers"
        :key="index"
        :src="c.src"
        :class="c.className"
        :style="[
          { transform: c.transform, opacity: c.opacity },
          cloudLayerStyle,
        ]"
      />
    </div>
  </div>
</template>

<script>
import { random } from "~/util";
export default {
  data: () => ({
    id: undefined,
    top: random(-20, 50),
    left: random(-50, 20),
    objects: [],
    computedWeights: [],
    cloudBase: undefined,
    width: 1024,
    height: 1024,
    dims: 512,
    speed: 100,
    layerCount: 3,
    textures: [
      {
        name: "white cloud",
        file: require("~/assets/imgs/cloud.png"),
        // opacity: 1,
        weight: 1,
      },
      {
        name: "dark cloud",
        file: require("~/assets/imgs/darkCloud.png"),
        // opacity: 0.5,
        weight: 1,
      },
      {
        name: "smoke cloud",
        file: require("~/assets/imgs/smoke.png"),
        // opacity: 1,
        weight: 0,
      },
      { name: "explosion", file: "explosion.png", opacity: 1, weight: 0 },
      { name: "explosion 2", file: "explosion2.png", opacity: 1, weight: 0 },
    ],
  }),
  props: {},
  mounted() {
    this.generate();
  },
  methods: {
    createCloud() {
      console.log("createCloud");
      this.cloudBase = {};
      var x = this.dims / 2 - Math.random() * this.dims;
      var y = this.dims / 2 - Math.random() * this.dims;
      var z = this.dims / 2 - Math.random() * this.dims;

      this.cloudBase.transform = `translate3d(${x}px,${y}px,${z}px)`;
      this.cloudBase.cloudLayers = [];

      for (var j = 0; j < this.layerCount; j++) {
        const cloud = {};
        var r = Math.random();
        var src = "";
        for (var k = 0; k < this.computedWeights.length; k++) {
          if (
            r >= this.computedWeights[k].min &&
            r <= this.computedWeights[k].max
          ) {
            src = this.computedWeights[k].src;
          }
        }
        cloud.opacity = Math.random() * (1.0 - 0.5) + 0.6;
        cloud.src = src;
        cloud.className = "cloudLayer";

        var x = this.dims / 2 - Math.random() * this.dims;
        var y = this.dims / 2 - Math.random() * this.dims;
        var z = 100 - Math.random() * 200;
        var a = Math.random() * 360;
        var s = 0.25 + Math.random();
        x *= 0.2;
        y *= 0.2;
        cloud.data = {
          x: x,
          y: y,
          z: z,
          a: a,
          s: s,
          speed: 0.1 * Math.random(),
        };
        cloud.transform = `translate3d(${x}px,${y}px,${z}px) rotateZ(${a}deg) scale(${s})`;
        this.cloudBase.cloudLayers.push(cloud);
      }
      return this.cloudBase;
    },
    generate() {
      var total = 0;
      for (var j = 0; j < this.textures.length; j++) {
        for (var j = 0; j < this.textures.length; j++) {
          if (this.textures[j].weight > 0) {
            total += this.textures[j].weight;
          }
        }
        var accum = 0;
        for (var j = 0; j < this.textures.length; j++) {
          if (this.textures[j].weight > 0) {
            var w = this.textures[j].weight / total;
            this.computedWeights.push({
              src: this.textures[j].file,
              min: accum,
              max: accum + w,
            });
            accum += w;
          }
        }
        console.log(this.createCloud());
      }
    },
  },
  computed: {
    filterId() {
      return `cf-${this.seedVal}`;
    },
    cloudBaseStyle() {
      return {
        width: `${this.width}px`,
        height: `${this.height}px`,
        animation: `movecloud ${this.speed * 3}s linear infinite`,
        top: `${this.top}vh`,
        left: `${this.left}vw`,
      };
    },
    cloudLayerStyle() {
      return {
        width: `${this.width}px`,
        height: `${this.height}px`,
        marginLeft: `-${this.height / 2}px`,
        marginTop: `-${this.width / 2}px`,
      };
    },
  },
};
</script>

<style>
@keyframes movecloud {
  0% {
    transform: translate3d(50vw, 0, 0);
  }
  100% {
    transform: translate3d(-50vw, 0, 0);
  }
}
.cloudContainer {
  width: 100%;
  height: 100%;
  z-index: 3;
  pointer-events: none;
  position: fixed;
}

.cloudBase {
  position: absolute;
  width: 20px;
  height: 20px;
  margin-left: -10px;
  margin-top: -10px;
  /* opacity: 0.5; */
}

.cloudLayer {
  position: absolute;
  left: 50%;
  top: 50%;
  transition: opacity 0.5s ease-out;

  /* animation-name: spinner;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-duration: 60s; */
}

@keyframes spinner {
  from {
    /* transform: rotateZ(0deg); */
  }
  to {
    transform: rotateZ(-360deg);
  }
}
</style>
