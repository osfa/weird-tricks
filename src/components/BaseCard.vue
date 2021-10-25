<template>
  <v-card>
    <v-img
      :key="$page.post.heroImage.file.url"
      @load="onImgLoad"
      :src="`${$page.post.heroImage.file.url}?fit=scale&w=1600`"
      min-height="200"
      max-height="70vh"
    >
      <template v-slot:placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-progress-circular
            indeterminate
            :color="randomMaterialColor()"
          ></v-progress-circular>
        </v-row>
      </template>
    </v-img>

    <v-card-title v-text="$page.post.title"></v-card-title>
    <v-card-text v-if="false">
      <node-dialog :iframe-url="hyperlink" />
    </v-card-text>
    <v-btn @click="forceNav" fab :color="currentColor" dark top left absolute>
      <v-icon>{{ randomIcon() }}</v-icon>
    </v-btn>
    <v-btn
      @click="forceNav"
      fab
      :color="randomMaterialColor()"
      dark
      top
      right
      absolute
    >
      <v-icon>{{ randomIcon() }}</v-icon>
    </v-btn>
    <v-btn
      @click="forceNav"
      fab
      :color="randomMaterialColor()"
      dark
      left
      bottom
      absolute
    >
      <v-icon>{{ randomIcon() }}</v-icon>
    </v-btn>
    <v-card-actions>
      <v-flex class="text-right">
        <v-btn :color="randomMaterialColor()" text @click="forceNav">
          <weird-text />
        </v-btn>
      </v-flex>
    </v-card-actions>
  </v-card>
</template>
<script>
import { random, randomIcon, randomMaterialColor } from "~/util";
import NodeDialog from "~/components/NodeDialog.vue";
import WeirdText from "~/components/WeirdText.vue";

export default {
  components: { NodeDialog, WeirdText },
  props: {
    title: { type: String, default: "title" },
    heroImgUrl: { type: String, default: "" },
    hyperlink: { type: String },
  },
  data: () => ({
    currentIcon: randomIcon(),
    currentColor: randomMaterialColor(),
    isLoaded: false,
  }),
  methods: {
    onImgLoad() {
      console.log("onImgLoad");
      this.isLoaded = true;
    },
    randomMaterialColor() {
      return randomMaterialColor();
    },
    randomIcon() {
      return randomIcon();
    },
    forceNav() {
      this.$emit("force-nav");
      let vm = this.$parent;
      while (vm) {
        vm.$emit("force-nav");
        vm = vm.$parent;
      }
    },
  },
};
</script>
