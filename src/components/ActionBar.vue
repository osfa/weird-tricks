<template>
  <div class="button-bar flex flex-column">
    <v-fab-transition>
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
    <v-btn
      class="mt-4"
      :elevation="randomElevation()"
      :color="randomMaterialColor()"
      @click="$emit('map-nav')"
      fab
      large
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
      large
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
      large
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
      large
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
import SearchBar from "~/components/SearchBar.vue";
import { cardMixin } from "~/cardMixin";

import * as Tone from "tone";

export default {
  mixins: [cardMixin],
  data: () => ({
    isMuted: false,
  }),
  computed: {
    muteState() {
      return {
        icon: this.isMuted ? "mdi-volume-mute" : "mdi-volume-medium",
        color: this.isMuted ? "red" : "primary",
      }; // mdi-volumne-medium /low
    },
  },
  methods: {
    toggleAudio() {
      this.isMuted = !this.isMuted;
      this.$emit("toggle-audio");
    },
  },
};
</script>
<style>
.button-bar {
  position: fixed;
  right: 20px;
  z-index: 2000;
  display: flex;
  height: 100vh;
  justify-content: center;
  top: 0;
}
</style>
