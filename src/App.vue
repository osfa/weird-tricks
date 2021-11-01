<template>
  <MainLayout>
    <v-app id="app">
      <Clock />
      <RegularNav
        v-show="showHeader"
        @force-nav="forceNav"
        @click.native="toggleAudio"
        :elevation="randomElevation()"
      ></RegularNav>

      <transition mode="out-in" appear name="bounceLeft">
        <router-view
          :key="$route.fullPath"
          @force-nav="forceNav"
          style="animation-duration: 250ms"
        />
      </transition>

      <ActionBar @map-nav="mapNav" @toggle-audio="toggleAudio" />
      <FooterNav
        v-show="showFooter"
        app
        @force-nav="forceNav"
        :elevation="randomElevation()"
      />
      <transition mode="out-in" appear :name="currentAnimation"
        ><CloudPng v-if="random(0, 4) > 2" :key="$route.fullPath"
      /></transition>
      <transition mode="out-in" appear :name="currentAnimation"
        ><CloudPng v-if="random(0, 4) > 2" :key="$route.fullPath"
      /></transition>
      <!-- <transition mode="out-in" appear :name="currentAnimation"
        ><CloudPng v-if="random(0, 4) > 2" :key="$route.fullPath"
      /></transition> -->
      <!-- <CloudDisplay /> -->
    </v-app>
  </MainLayout>
</template>

<static-query>
  query {
    metadata {
      siteName
      siteDescription
    }
    nodes: allContentfulNode(sortBy: "published_at", order: DESC) {
      edges {
        node {
          id
          title
          heroImage {
            file {
              url
            }
          },
        }
      }
    }
  }
</static-query>

<script>
import {
  random,
  randomIcon,
  randomMaterialColor,
  randomAnimation,
  randomElevation,
} from "~/util";

import MainLayout from "~/layouts/Main.vue";
import RegularNav from "~/components/nav/RegularNav.vue";
import FooterNav from "~/components/nav/FooterNav.vue";
import CloudPng from "~/components/clouds/CloudPng.vue";
import CloudDisplay from "~/components/clouds/CloudDisplay.vue";
import Clock from "~/components/Clock.vue";
import SearchBar from "~/components/SearchBar.vue";
import ActionBar from "~/components/ActionBar.vue";

import { cardMixin } from "~/cardMixin";

import * as Tone from "tone";

const INITIAL_FREQ = 2;

export default {
  mixins: [cardMixin],

  components: {
    ActionBar,
    CloudPng,
    CloudDisplay,
    MainLayout,
    RegularNav,
    FooterNav,
    Clock,
    SearchBar,
  },
  data: () => ({
    showHeader: true,
    showFooter: true,
    volume: -30,
    rainVolume: -5,
    leftEar: undefined,
    rightEar: undefined,
    binauralBeat: INITIAL_FREQ,
    audioCtx: undefined,
    isMuted: false,
    currentAnimation: randomAnimation(),
    crossFade: undefined,
    crossDirection: false,
    crossFadeInterval: undefined,
  }),
  metaInfo() {
    return {
      title: this.$static.metadata.siteName,
      meta: [
        {
          key: "description",
          name: "description",
          content: this.$static.metadata.siteDescription,
        },
      ],
    };
  },
  computed: {
    // switch (this.tabs) {
    //   case 'one': return { color: 'success', icon: 'mdi-share-variant' }
    //   case 'two': return { color: 'red', icon: 'mdi-pencil' }
    //   case 'three': return { color: 'green', icon: 'mdi-chevron-up' }
    //   default: return {}
    // }
    // },
  },
  methods: {
    randomElevation() {
      return randomElevation();
    },
    random(min, max) {
      return random(min, max);
    },
    mapNav() {
      this.$store.commit("mapNav");
    },
    forceNav(backwards) {
      console.log("forceNav main");
      this.currentAnimation = randomAnimation();

      //!!!!!! watch this.$store.state.currentBlockIdx instead?
      if (backwards) {
        this.navigateBack();
      } else {
        this.navigateForward();
      }

      const allNodes = this.$static.nodes.edges;
      // let nextPost = allNodes[this.$store.state.currentBlockIdx];
      let nextPost = allNodes.sample();

      let nextRoutePath = `/nodes/${nextPost.node.id}`;
      this.$router.push({ path: nextRoutePath });
    },
    navigateForward() {
      console.log("navigateForward");
      this.$store.commit("navigateForward");
      console.log(this.$store.state.currentBlockIdx);
    },
    navigateBack() {
      console.log("navigateBack");
      this.$store.commit("navigateBack");
      console.log(this.$store.state.currentBlockIdx);
    },
    nav(e) {
      console.log("nav");
      switch (e.keyCode) {
        case 37: // left
          this.forceNav(true);
          break;
        case 39: // right
          this.forceNav();
          break;
      }
    },
    toggleAudio() {
      console.log("toggleAudio");
      if (this.audioCtx.state === "running") {
        this.audioCtx.suspend().then(function () {
          console.log("suspended audio");
        });
        this.isMuted = true;
      } else if (this.audioCtx.state === "suspended") {
        this.audioCtx.resume().then(function () {
          console.log("resumed audio");
        });
        this.isMuted = false;
      }
    },
    doCrossFade() {
      if (this.crossFade.fade.value === 1.0 || this.crossFade.fade.value <= 0) {
        this.crossDirection = !this.crossDirection;
      }
      if (this.crossDirection) {
        const val = Math.min(parseFloat(this.crossFade.fade.value + 0.1), 1);
        this.crossFade.fade.value = val;
      } else {
        const val = Math.max(parseFloat(this.crossFade.fade.value - 0.1), 0);
        this.crossFade.fade.value = val;
      }
    },
    setVolume() {
      Tone.getDestination().volume.rampTo(
        this.volume === -100 ? -Infinity : this.volume,
        0
      );
    },
    setRainVolume(rainMaker) {
      // rainMaker.volume.value = -Infinity; //.rampTo(-Infinity, 10);
      let volume = this.rainVolume === -100 ? -Infinity : this.rainVolume;
      rainMaker.volume.value = volume;
    },
    setFrequencies() {
      const freqs = this.calculateFrequencies(this.binauralBeat);
      console.log("setting: ", freqs);
      this.leftEar.frequency.value = freqs.leftFrequency;
      this.rightEar.frequency.value = freqs.rightFrequency;
    },
    calculateCarrierFrequency(binauralBeat) {
      // Formula retrieved by using excel on Oster's curve. Can be enhanced with real maths ;)
      // y = -0,2085x2 + 18,341x + 56,31
      return (
        -0.2085 * Math.pow(binauralBeat, 2) + 18.341 * binauralBeat + 56.31
      );
    },
    calculateFrequencies(binauralBeat) {
      const carrierFreq = this.calculateCarrierFrequency(binauralBeat);
      return {
        leftFrequency: carrierFreq + binauralBeat / 2,
        rightFrequency: carrierFreq - binauralBeat / 2,
      };
    },
    handleFrequencyChange(actualFrequency) {
      const { leftFrequency, rightFrequency } =
        this.calculateFrequencies(actualFrequency);
    },
    initAudio() {
      const context = new Tone.Context();
      Tone.setContext(context);
      this.audioCtx = context.rawContext;

      const merge = new Tone.Merge().toDestination();

      this.leftEar = new Tone.Oscillator().connect(merge, 0, 0).start();
      this.rightEar = new Tone.Oscillator().connect(merge, 0, 1).start();

      const rainMaker = new Tone.Noise("brown").start().toDestination();

      this.crossFade = new Tone.CrossFade().toDestination();
      this.crossFade.fade.value = 0.5; // 0-a

      const sample1 = new Tone.Player(
        require("~/assets/audio/tapping2.mp3")
      ).connect(this.crossFade.a);
      sample1.autostart = true;
      sample1.loop = true;

      const sample2 = new Tone.Player(
        require("~/assets/audio/ocean.mp3")
      ).connect(this.crossFade.b);
      sample2.autostart = true;
      sample2.loop = true;

      this.crossFadeInterval = setInterval(this.doCrossFade, 5000);

      this.setRainVolume(rainMaker);
      this.setVolume();
      this.setFrequencies();
    },
  },
  created() {
    if (process.isClient) {
      window.addEventListener("keyup", this.nav);
    }
  },
  mounted() {
    console.log("App mount");
    this.initAudio();
  },
  destroyed() {
    if (process.isClient) {
      window.removeEventListener("keyup", this.nav);
    }
    clearInterval(this.crossFadeInterval);
  },
};
</script>

<style>
html {
  overflow-y: auto;
}
.button-bar {
  position: fixed;
  right: 20px;
  z-index: 1000;
  display: flex;
  height: 100vh;
  justify-content: center;
}
</style>
