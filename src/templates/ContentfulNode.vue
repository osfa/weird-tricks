<template>
  <Layout>
    <v-container class="fill-height fluid" style="position: relative">
      <div class="row align-center justify-center">
        <v-card class="col-6 flex mb-16" style="pointer-events: auto">
          <v-img
            :src="`${$page.post.heroImage.file.url}?fit=fill&w=1800&h=1200`"
            class="white--text align-end"
          >
          </v-img>
          <v-card-title v-text="$page.post.title"></v-card-title>

          <v-card-text v-if="false" v-html="content" />

          <v-btn
            fab
            :color="currentColor"
            dark
            bottom
            right
            absolute
            :href="$page.post.hyperlink"
            target="_blank"
          >
            <v-icon>{{ currentIcon }}</v-icon>
          </v-btn>

          <!-- <v-btn
            fab
            :color="currentColor"
            dark
            bottom
            left
            absolute
            :href="$page.post.hyperlink"
            target="_blank"
          >
            <v-icon>{{ currentIcon }}</v-icon>
          </v-btn> -->
          <!-- mdi-link -->
          <v-card-actions v-if="false">
            <v-flex class="text-right">
              <v-btn
                :color="randomMaterialColor"
                text
                :href="$page.post.hyperlink"
                target="_blank"
              >
                Learn more
              </v-btn>
            </v-flex>
          </v-card-actions>
        </v-card>
      </div>
    </v-container>
  </Layout>
</template>

<page-query>
  query Post($path: String!) {
    post: contentfulNode(path: $path) {
      heroImage {
        file {
          url
        }
      },
      hyperlink
    }
  }
</page-query>

<script>
import MarkdownIt from "markdown-it";
import { randomIcon, randomMaterialColor } from "~/util";

export default {
  metaInfo() {
    return {
      title: this.$page.post.title,
    };
  },
  mounted() {
    console.log("====== node mount");
  },
  data: () => ({
    marker: {
      position: {
        lat: 15.0,
        lng: 15.0,
      },
    },
    currentIcon: randomIcon(),
    currentColor: randomMaterialColor(),
  }),
  computed: {
    content() {
      const md = new MarkdownIt();
      return md.render(this.$page.post.body);
    },
  },
  watch: {
    $route: function () {
      this.currentIcon = randomIcon();
      this.currentColor = randomMaterialColor();
      // this.currentMenuItems = randomMenuItems();
    },
  },
};
</script>
