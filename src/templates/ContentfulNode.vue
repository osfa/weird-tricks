<template>
  <Layout>
    <!-- background image overlay -->
    <div
      v-if="true"
      :style="`background-image: url('${$page.post.heroImage.file.url}?fit=fill&w=1280&h=720'); 
      position: fixed; top: 0; left: 0; 
      width: 100%; height: 100%;
      pointer-events:none;
      z-index: 2;
      opacity: 10%; background-size: cover;`"
    ></div>
    <transition mode="out-in" appear :name="currentAnimation">
      <v-container
        class="fill-height fluid"
        style="position: relative"
        :style="[
          {
            zIndex: randomZ, // below or above clouds
          },
        ]"
      >
        <div class="row align-center justify-center">
          <v-card
            class="col-6 col-lg-4 col-xl-4 flex mb-16"
            style="pointer-events: auto"
          >
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

            <v-card-text v-if="false" v-html="content" />

            <v-dialog
              eager
              height="100vh"
              scrollable
              v-model="dialog"
              class="fill-height"
              max-width="1200"
            >
              <template v-slot:activator="{ on, attrs }">
                <!-- <div>yellow darken-2</div> -->
                <v-btn
                  color="primary"
                  :elevation="3"
                  x-large
                  dark
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>mdi-link</v-icon>
                </v-btn>
              </template>

              <v-card>
                <iframe
                  v-if="iframeUrl"
                  id="ifrm"
                  :src="iframeUrl"
                  style="height: 100vh; width: 100%"
                ></iframe>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" text @click="dialog = false">
                    I accept
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-btn
              @click="forceNav"
              fab
              :color="currentColor"
              dark
              bottom
              right
              absolute
            >
              <v-icon>{{ currentIcon }}</v-icon>
            </v-btn>
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
    </transition>
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
import { random, randomIcon, randomMaterialColor } from "~/util";

export default {
  metaInfo() {
    return {
      title: this.$page.post.title,
    };
  },
  mounted() {
    console.log("====== node mount");
    if (this.$page.post.hyperlink != "null") {
      this.iframeUrl = this.$page.post.hyperlink;
    }
  },
  data: () => ({
    dialog: false,
    marker: {
      position: {
        lat: 15.0,
        lng: 15.0,
      },
    },
    currentIcon: randomIcon(),
    currentColor: randomMaterialColor(),
    isLoaded: false,
    iframeUrl: "https://www.dn.se/",
    randomZ: random(3, 5), // below or above clouds
    currentAnimation: [
      "bounce",
      "bounceDown",
      "bounceLeft",
      "bounceRight",
      "bounceUp",
      "fade",
      "fadeDown",
      "fadeDownBig",
      "fadeLeft",
      "fadeLeftBig",
      "fadeRight",
      "fadeRightBig",
      "fadeUp",
      "fadeUpBig",
      "rotate",
      "rotateDownLeft",
      "rotateDownRight",
      "rotateUpLeft",
      "rotateUpRight",
      "slideDown",
      "slideUp",
      "slideLeft",
      "slideRight",
      "zoom",
      "zoomDown",
      "zoomUp",
      "zoomLeft",
      "zoomRight",
    ].sample(),
  }),
  methods: {
    onImgLoad() {
      console.log("onImgLoad");
      this.isLoaded = true;
    },
    randomMaterialColor() {
      return randomMaterialColor();
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
