<template>
  <div class="button-bar flex flex-column">
    <v-fab-transition v-if="false">
      <v-btn
        class="mb-8"
        :elevation="randomElevation()"
        :color="muteState.color"
        :key="muteState.icon"
        fab
        large
        dark
        @click.native="toggleAudio"
      >
        <v-icon>{{ muteState.icon }}</v-icon>
      </v-btn>
    </v-fab-transition>

    <v-fab-transition>
      <v-btn
        class="mb-8"
        :elevation="randomElevation()"
        :color="hideState.color"
        :key="hideState.icon"
        fab
        :large="$vuetify.breakpoint.lgAndUp"
        :dark="false"
        @click.native="toggleHide"
      >
        <v-icon>{{ hideState.icon }}</v-icon>
      </v-btn>
    </v-fab-transition>
    <v-btn
      class="mt-4"
      :elevation="randomElevation()"
      :color="randomMaterialColor()"
      @click="$emit('map-nav')"
      fab
      :large="$vuetify.breakpoint.lgAndUp"
      dark
    >
      <v-icon>{{ randomIcon() }}</v-icon>
    </v-btn>

    <v-btn
      class="mt-4"
      :elevation="randomElevation()"
      :color="randomMaterialColor()"
      @click="$emit('map-nav')"
      fab
      :large="$vuetify.breakpoint.lgAndUp"
      dark
    >
      <v-icon>{{ randomIcon() }}</v-icon>
    </v-btn>

    <v-btn
      class="mt-4"
      :elevation="randomElevation()"
      :color="randomMaterialColor()"
      @click="$emit('map-nav')"
      fab
      :large="$vuetify.breakpoint.lgAndUp"
      dark
    >
      <v-icon>{{ randomIcon() }}</v-icon>
    </v-btn>
  </div>
</template>
<script>
import {
  random,
  randomIcon,
  randomMaterialColor,
  randomAnimation,
  randomElevation,
} from "~/util";
import { cardMixin } from "~/cardMixin";

export default {
  mixins: [cardMixin],
  data: () => ({
    isMuted: true,
    isHidden: false,
  }),
  computed: {
    muteState() {
      return {
        icon: this.isMuted ? "mdi-volume-mute" : "mdi-volume-medium",
        color: this.isMuted ? "red" : "primary",
      }; // mdi-volumne-medium /low
    },
    hideState() {
      return {
        icon: this.isHidden ? "mdi-eye-outline" : "mdi-eye-off-outline",
        color: this.isHidden ? "white" : "white",
      }; // mdi-volumne-medium /low
    },
  },
  methods: {
    toggleAudio() {
      this.isMuted = !this.isMuted;
      this.$emit("toggle-audio");
    },
    toggleHide() {
      this.isHidden = !this.isHidden;
      this.$store.commit("toggleHide");
    },
  },
};
</script>
<style>
.button-bar {
  pointer-events: none;
  position: fixed;
  right: 20px;
  z-index: 2000;
  display: flex;
  height: 100vh;
  justify-content: center;
  top: 0;
}
.v-btn {
  pointer-events: auto;
}
</style>
