<template>
  <div>
    <v-img
      v-if="$page.post.heroImage"
      :key="$page.post.heroImage.file.url"
      @load="onImgLoad"
      :src="`${$page.post.heroImage.file.url}?fit=scale&w=1600`"
      min-height="25vh"
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
    <v-img
      v-if="!$page.post.heroImage && !$page.post.youTubeEmbed"
      src="http://via.placeholder.com/640x360"
    />
    <iframe
      v-if="$page.post.youTubeEmbed && isYoutube"
      :src="`https://www.youtube.com/embed/${$page.post.youTubeEmbed.replace(
        'https://www.youtube.com/watch?v=',
        ''
      )}`"
      width="100%"
      height="300"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
    <iframe
      v-if="$page.post.youTubeEmbed && isTwitter"
      :src="`https://twitframe.com/show?url=${$page.post.youTubeEmbed}`"
      width="100%"
      height="450"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
    <iframe
      v-if="$page.post.youTubeEmbed && isVimeo"
      :src="`https://player.vimeo.com/video/${$page.post.youTubeEmbed.replace(
        'https://vimeo.com/',
        ''
      )}`"
      width="100%"
      height="300"
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
  computed: {
    isYoutube() {
      return this.$page.post.youTubeEmbed.includes("youtube.com");
    },
    isTwitter() {
      return this.$page.post.youTubeEmbed.includes("twitter.com");
    },
    isVimeo() {
      return this.$page.post.youTubeEmbed.includes("vimeo.com");
    },
  },
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
