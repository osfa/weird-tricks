<template>
  <MainLayout>
    <v-app id="app">
      <CloudPng />
      <RegularNav
        v-show="showHeader"
        @force-nav="forceNav"
        @click.native="toggleAudio"
      ></RegularNav>
      <transition mode="out-in" appear name="bounceLeft">
        <router-view
          :key="$route.fullPath"
          @force-nav="forceNav"
          style="animation-duration: 250ms"
        />
      </transition>

      <v-fab-transition>
        <v-btn
          color="primary"
          :key="muteState.icon"
          fab
          large
          dark
          top
          right
          fixed
          @click.native="toggleAudio"
        >
          <v-icon>{{ muteState.icon }}</v-icon>
        </v-btn>
      </v-fab-transition>
      <FooterNav v-show="showFooter" app @force-nav="forceNav" />
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
import { random, randomIcon, randomMaterialColor } from "~/util";

import MainLayout from "~/layouts/Main.vue";
import RegularNav from "~/components/nav/RegularNav.vue";
import FooterNav from "~/components/nav/FooterNav.vue";
import CloudPng from "~/components/CloudPng.vue";

import * as Tone from "tone";

const INITIAL_FREQ = 2;

export default {
  components: {
    CloudPng,
    MainLayout,
    RegularNav,
    FooterNav,
  },
  data: () => ({
    showHeader: true,
    showFooter: true,
    volume: -30,
    rainVolume: -10,
    leftEar: undefined,
    rightEar: undefined,
    binauralBeat: INITIAL_FREQ,
    audioCtx: undefined,
    isMuted: false,
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
    muteState() {
      return {
        icon: this.isMuted ? "mdi-volume-mute" : "mdi-volume-medium",
        color: randomMaterialColor(),
      }; // mdi-volumne-medium /low
      // switch (this.tabs) {
      //   case 'one': return { color: 'success', icon: 'mdi-share-variant' }
      //   case 'two': return { color: 'red', icon: 'mdi-pencil' }
      //   case 'three': return { color: 'green', icon: 'mdi-chevron-up' }
      //   default: return {}
      // }
    },
  },
  methods: {
    forceNav(backwards) {
      console.log("forceNav main");

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
  },
  created() {
    if (process.isClient) {
      window.addEventListener("keyup", this.nav);
    }
  },

  mounted() {
    console.log("App mount");

    const context = new Tone.Context();
    Tone.setContext(context);
    this.audioCtx = context.rawContext;

    //the AudioContext is "suspended". Invoke Tone.start() from a user action to start the audio.

    const merge = new Tone.Merge().toDestination();

    this.leftEar = new Tone.Oscillator().connect(merge, 0, 0).start();
    this.rightEar = new Tone.Oscillator().connect(merge, 0, 1).start();

    const rainMaker = new Tone.Noise("brown").start().toDestination();

    this.setRainVolume(rainMaker);
    this.setVolume();
    this.setFrequencies();
  },
  destroyed() {
    if (process.isClient) {
      window.removeEventListener("keyup", this.nav);
    }
  },

  //   beforeRouteLeave(to, from, next) {
  //     console.log("main route leave");
  //     // called when the route that renders this component is about to
  //     // be navigated away from.
  //     // has access to `this` component instance.
  //     next();
  //   },
};
</script>

<style></style>
