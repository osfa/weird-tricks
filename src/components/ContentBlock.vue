<template>
  <div>
    <v-img
      v-if="$page.post.heroImage"
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
    <iframe
      v-if="$page.post.youTubeEmbed"
      :src="$page.post.youTubeEmbed"
      width="100%"
      height="200"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
</template>
<script>
import WeirdText from "../components/WeirdText.vue";
import { random, randomIcon, randomMaterialColor } from "~/util";

export default {
  data: () => ({
    isLoaded: false,
  }),
  computed: {},
  methods: {
    onImgLoad() {
      console.log("onImgLoad");
      this.isLoaded = true;
    },
    randomMaterialColor() {
      return randomMaterialColor();
    },
  },
};
</script>
