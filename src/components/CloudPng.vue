<template>
  <div class="cloud-container"></div>
</template>

<script>
import { random } from "~/util";
export default {
  data: () => ({
    id: undefined,
    seedVal: undefined,
    objects: [],
    computedWeights: [],
    layers: [],
    textures: [
      {
        name: "white cloud",
        file: require("~/assets/imgs/cloud.png"),
        opacity: 1,
        weight: 1,
      },
      {
        name: "dark cloud",
        file: require("~/assets/imgs/explosion.png"),
        opacity: 1,
        weight: 1,
      },
      { name: "smoke cloud", file: "smoke.png", opacity: 1, weight: 0 },
      { name: "explosion", file: "explosion.png", opacity: 1, weight: 0 },
      { name: "explosion 2", file: "explosion2.png", opacity: 1, weight: 0 },
      { name: "box", file: "box.png", opacity: 1, weight: 0 },
    ],
  }),
  props: {},
  mounted() {
    this.seedVal = random(0, 10000);
    this.generate();
  },
  methods: {
    createCloud() {
      var div = document.createElement("div");
      div.className = "cloudBase";
      var x = 256 - Math.random() * 512;
      var y = 256 - Math.random() * 512;
      var z = 256 - Math.random() * 512;
      var t =
        "translateX( " +
        x +
        "px ) translateY( " +
        y +
        "px ) translateZ( " +
        z +
        "px )";
      div.style.transform = t;
      document.body.appendChild(div);

      for (var j = 0; j < 5 + Math.round(Math.random() * 10); j++) {
        var cloud = document.createElement("img");
        cloud.style.opacity = 0;
        var r = Math.random();
        var src = "";
        for (var k = 0; k < this.computedWeights.length; k++) {
          if (
            r >= this.computedWeights[k].min &&
            r <= this.computedWeights[k].max
          ) {
            (function (img) {
              img.addEventListener("load", function () {
                img.style.opacity = 0.8;
              });
            })(cloud);
            src = this.computedWeights[k].src;
          }
        }
        if (this.computedWeights.length === 0) {
          cloud.style.opacity = 0.8;
        }
        cloud.setAttribute("src", src);
        cloud.className = "cloudLayer";

        var x = 256 - Math.random() * 512;
        var y = 256 - Math.random() * 512;
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
        var t =
          "translateX( " +
          x +
          "px ) translateY( " +
          y +
          "px ) translateZ( " +
          z +
          "px ) rotateZ( " +
          a +
          "deg ) scale( " +
          s +
          " )";

        cloud.style.transform = t;

        div.appendChild(cloud);
        this.layers.push(cloud);
      }

      return div;
    },
    generate() {
      this.objects = [];
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
        for (var j = 0; j < 1; j++) {
          this.objects.push(this.createCloud());
        }
      }
    },
    update() {
      for (var j = 0; j < this.layers.length; j++) {
        var layer = this.layers[j];
        layer.data.a += layer.data.speed;
        var t =
          "translateX( " +
          layer.data.x +
          "px ) translateY( " +
          layer.data.y +
          "px ) translateZ( " +
          layer.data.z +
          "px ) rotateZ( " +
          layer.data.a +
          "deg ) scale( " +
          layer.data.s +
          ")";
        // console.log(t);
        console.log(layer.style);
        layer.style.transform = t;
        //layer.style.webkitFilter = 'blur(5px)';
      }
    },
  },
  created() {
    // this.id = window.requestAnimationFrame(this.update);
  },

  destroyed() {
    // window.cancelAnimationFrame(this.id);
    // this.id = undefined;
  },
  computed: {
    filterId() {
      return `cf-${this.seedVal}`;
    },
    cloudStyles() {
      console.log(this.blurVal);
      return {
        top: `${this.top}vh`,
        left: `${this.left}vw`,
        marginTop: `${-this.height - 150}px`, // offset handle for boxshadow
        width: `${this.width}px`,
        height: `${this.height}px`,

        // animation: `movecloud ${this.speed / 2}s ease infinite`,
        boxShadow: `200px ${this.height + 150}px ${this.blurVal}px ${
          this.spreadVal
        }px rgba(255, 255, 255, ${this.opacity})`,
      };
    },
  },
};
</script>

<style>
/* .cloud {
  border-radius: 50%;
  position: absolute;
} */

/* translate more efficient? */
@keyframes movecloud {
  0% {
    transform: translate(0vw, 0);
  }
  100% {
    transform: translate(-100vw, 0);
  }
}

.cloudBase {
  border: 1px solid #ff00ff;
  position: absolute;
  left: 256px;
  top: 256px;
  width: 20px;
  height: 20px;
  margin-left: -10px;
  margin-top: -10px;
  z-index: 10;
  /* opacity: 0.5; */
}

.cloudLayer {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 256px;
  height: 256px;
  margin-left: -128px;
  margin-top: -128px;
  transition: opacity 0.5s ease-out;

  animation-name: spinner;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-duration: 6s;
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
