<template>
  <MainLayout>
    <v-app id="app">
      <!-- <Clock v-show="!allHidden" /> -->
      <RegularNav
        v-show="showHeader"
        @force-nav="forceNav"
        :elevation="randomElevation()"
      ></RegularNav>

      <transition mode="out-in" appear name="bounceLeft">
        <router-view
          :key="$route.fullPath"
          @force-nav="forceNav"
          style="animation-duration: 250ms"
        />
      </transition>

      <ActionBar @map-nav="mapNav" />
      <FooterNav
        v-show="showFooter"
        app
        @force-nav="forceNav"
        :elevation="randomElevation()"
      />
      <transition mode="out-in" appear :name="currentAnimation"
        ><CloudPng v-if="random(0, 3) > 2" :key="$route.fullPath"
      /></transition>

      <!-- <transition mode="out-in" appear :name="currentAnimation"
        ><CloudPng v-if="random(0, 4) > 2" :key="$route.fullPath"
      /></transition> -->
      <!-- <CloudDisplay /> -->

      <v-dialog eager height="100vh" v-model="audioDialog" max-width="300">
        <v-card>
          <v-card-title><weird-text /></v-card-title>
          <v-card-text>
            {{ tosBody() }}
          </v-card-text>
          <!-- <v-btn class="mr-2" color="red" @click="audioDialog = false">
            <v-icon x-large>mdi-volume-mute</v-icon>
          </v-btn>
          <v-btn color="green" dark @click="$store.commit('toggleAudio')">
            <v-icon large>mdi-volume-medium</v-icon>
          </v-btn> -->
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" text @click="audioDialog = false">
              <v-icon large>mdi-volume-mute</v-icon> No
            </v-btn>
            <v-btn color="success" text @click="$store.commit('toggleAudio')">
              <v-icon large>mdi-volume-medium</v-icon> I Accept
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
          title,
          name,
          hyperlink,
          archiveLink,
          date,
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
  randomText,
} from "~/util";

import MainLayout from "~/layouts/Main.vue";
import RegularNav from "~/components/nav/RegularNav.vue";
import FooterNav from "~/components/nav/FooterNav.vue";
import CloudPng from "~/components/clouds/CloudPng.vue";
import CloudDisplay from "~/components/clouds/CloudDisplay.vue";
import Clock from "~/components/Clock.vue";
import SearchBar from "~/components/SearchBar.vue";
import ActionBar from "~/components/ActionBar.vue";
import { mapState } from "vuex";

import { cardMixin } from "~/cardMixin";

import * as Tone from "tone";
import WeirdText from "./components/WeirdText.vue";

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
    WeirdText,
  },
  data: () => ({
    showHeader: true,
    showFooter: true,
    volume: -26,
    rainVolume: -5,
    leftEar: undefined,
    rightEar: undefined,
    binauralBeat: INITIAL_FREQ,
    audioCtx: undefined,
    currentAnimation: randomAnimation(),
    crossFade: undefined,
    crossDirection: false,
    crossFadeInterval: undefined,
    rainMaker: undefined,
    audioDialog: true,
    tosPlayer: undefined,
    asmrChannel1: undefined,
    asmrChannel2: undefined,
    availableAsmr1: [
      require("~/assets/audio/tapping1.mp3"),
      require("~/assets/audio/tapping2.mp3"),
      require("~/assets/audio/tapping3.mp3"),
      require("~/assets/audio/server1.mp3"),
      require("~/assets/audio/server2.mp3"),
      require("~/assets/audio/rain1.mp3"),
      require("~/assets/audio/rain2.mp3"),
      require("~/assets/audio/rain3.mp3"),
      require("~/assets/audio/tiktock.mp3"),
    ],
    availableAsmr2: [
      require("~/assets/audio/cave.mp3"),
      require("~/assets/audio/war-propeller.mp3"),
      require("~/assets/audio/tropical.mp3"),
      require("~/assets/audio/wind1.mp3"),
      require("~/assets/audio/wind2.mp3"),
      require("~/assets/audio/airplane1.mp3"),
      require("~/assets/audio/airplane2.mp3"),
      require("~/assets/audio/ocean.mp3"),
      require("~/assets/audio/fireplace.mp3"),
    ],
    availableTos: [
      require("~/assets/audio/tos/homer-facebook.mp3"),
      require("~/assets/audio/tos/krusty-insta.mp3"),
      require("~/assets/audio/tos/scooby-facebook.mp3"),
      require("~/assets/audio/tos/shaggy-instagram.mp3"),
      require("~/assets/audio/tos/sponge-tos-complete.mp3"),
    ],
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
    ...mapState(["allHidden", "isMuted"]),
  },
  methods: {
    mapNav() {
      this.$store.commit("mapNav");
    },
    tosBody() {
      return randomText({
        type: "clickbait",
        length: random(500, 750),
      });
    },
    forceNav() {
      console.log("forceNav main");
      if (this.allHidden) {
        this.$store.commit("toggleHide");
      }

      this.currentAnimation = randomAnimation();
      const allNodes = this.$static.nodes.edges;
      let nextPost = allNodes.sample();
      while (this.$route.fullPath.includes(nextPost.node.title)) {
        nextPost = allNodes.sample();
      }

      let nextRoutePath = `/nodes/${nextPost.node.title}`;
      this.$router.push({ path: nextRoutePath });
      if (!this.isMuted) {
        this.frequencyShift();
        this.rainShift();
        if (this.tosPlayer.state === "stopped" && random(0, 10) > 7) {
          this.tosPlayer.load(this.availableTos.sample());
        }
      }
    },
    navigateForward() {
      console.log("navigateForward");
      this.$store.commit("navigateForward");
      console.log(this.$store.state.currentBlockIdx);
    },
    toggleAudio() {
      console.log("toggleAudio");
      this.audioDialog = false;

      if (!this.audioCtx) {
        this.initAudio();
        return;
      }

      if (this.audioCtx.state === "running") {
        this.audioCtx.suspend().then(function () {
          console.log("suspended audio");
        });
      } else if (this.audioCtx.state === "suspended") {
        this.audioCtx.resume().then(function () {
          console.log("resumed audio");
        });
      }
    },
    doCrossFade() {
      const stepSize = 0.1;
      if (this.crossFade.fade.value === 1.0 || this.crossFade.fade.value <= 0) {
        this.crossDirection = !this.crossDirection;
        if (this.crossFade.fade.value === 1.0) {
          this.asmrChannel1.load(this.availableAsmr1.sample());
        } else {
          this.asmrChannel2.load(this.availableAsmr2.sample());
        }
      }
      if (this.crossDirection) {
        const val = Math.min(
          parseFloat(this.crossFade.fade.value + stepSize),
          1
        );
        this.crossFade.fade.value = val;
      } else {
        const val = Math.max(
          parseFloat(this.crossFade.fade.value - stepSize),
          0
        );
        this.crossFade.fade.value = val;
      }
    },
    setVolume() {
      Tone.getDestination().volume.rampTo(
        this.volume === -100 ? -Infinity : this.volume,
        0
      );
    },
    setRainVolume() {
      let volume = this.rainVolume === -100 ? -Infinity : this.rainVolume;
      this.rainMaker.volume.value = volume;
    },
    setFrequencies() {
      const freqs = this.calculateFrequencies(this.binauralBeat);
      this.leftEar.frequency.value = freqs.leftFrequency;
      this.rightEar.frequency.value = freqs.rightFrequency;
    },
    frequencyShift() {
      this.binauralBeat = random(1, 6);
      const freqs = this.calculateFrequencies(this.binauralBeat);
      const rampSeconds = 60;
      this.leftEar.frequency.rampTo(freqs.leftFrequency, rampSeconds);
      this.rightEar.frequency.rampTo(freqs.rightFrequency, rampSeconds);
    },
    rainShift() {
      const rampSeconds = 15;
      const targetVolume = random(-6, 3);
      this.rainMaker.volume.rampTo(targetVolume, rampSeconds);
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

      this.leftEar = new Tone.Oscillator().connect(merge, 0, 0);
      this.rightEar = new Tone.Oscillator().connect(merge, 0, 1);

      this.rainMaker = new Tone.Noise("brown").toDestination();

      this.crossFade = new Tone.CrossFade().toDestination();
      this.crossFade.fade.value = 0.5; // 0-a

      this.asmrChannel1 = new Tone.Player(this.availableAsmr1.sample()).connect(
        this.crossFade.a
      );
      this.asmrChannel1.autostart = true;
      this.asmrChannel1.loop = true;
      this.asmrChannel1.volume.value = 12;

      this.asmrChannel2 = new Tone.Player(this.availableAsmr2.sample()).connect(
        this.crossFade.b
      );
      this.asmrChannel2.autostart = true;
      this.asmrChannel2.loop = true;
      this.asmrChannel2.volume.value = 6;
      this.crossFadeInterval = setInterval(this.doCrossFade, 5000);

      this.tosPlayer = new Tone.Player(
        this.availableTos.sample()
      ).toDestination();
      this.tosPlayer.autostart = true;
      this.tosPlayer.loop = false;
      this.tosPlayer.volume.value = 0;

      this.setRainVolume();
      this.setVolume();
      this.setFrequencies();

      this.leftEar.start();
      this.rightEar.start();
      this.rainMaker.start();
    },
  },
  created() {
    this.$store.commit("setIsLoading", true);
  },
  mounted() {
    console.log("App mount: Setting content:", this.$static.nodes.edges);
    this.$store.commit("setMainContent", this.$static.nodes.edges);
  },
  destroyed() {
    clearInterval(this.crossFadeInterval);
  },
  watch: {
    "$store.state.currentBlockIdx": function () {
      console.log(this.$store.state.currentBlockIdx);
      this.forceNav();
    },
    "$store.state.isMuted": function () {
      this.toggleAudio();
    },
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
