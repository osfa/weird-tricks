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

    <v-fab-transition v-if="false">
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
      @click.native="mapNavButtonAction"
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
      @click.native="mapNavButtonAction"
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
      @click.native="mapNavButtonAction"
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
import { mapState } from "vuex";

export default {
  mixins: [cardMixin],
  data: () => ({}),
  computed: {
    ...mapState(["allHidden", "isMuted"]),
    muteState() {
      return {
        icon: this.isMuted ? "mdi-volume-mute" : "mdi-volume-medium",
        color: this.isMuted ? "red" : "primary",
      }; // mdi-volumne-medium /low
    },
    hideState() {
      return {
        icon: this.allHidden ? "mdi-eye-outline" : "mdi-eye-off-outline",
        color: this.allHidden ? "white" : "white",
      }; // mdi-volumne-medium /low
    },
  },
  methods: {
    toggleAudio() {
      this.$store.commit("toggleAudio");
    },
    toggleHide() {
      this.$store.commit("toggleHide");
    },
    mapNavButtonAction() {
      this.$emit("map-nav");
      if (!this.allHidden) {
        this.toggleHide();
      }
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
