<template>
  <Layout>
    <!-- background image overlay -->
    <!-- COMPONENT -->
    <div
      v-if="$page.post.heroImage"
      :style="`background-image: url('${$page.post.heroImage.file.url}?fit=fill&w=1280&h=720'); 
      position: fixed; top: 0; left: 0; 
      width: 100%; height: 100%;
      pointer-events:none;
      z-index: 2;
      opacity: 10%; background-size: cover;`"
    ></div>
    <!-- COMPONENT -->
    <node-dialog
      style="z-index: 100"
      is-fixed
      :iframe-url="$page.post.hyperlink"
    />

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
          <div
            class="col-10 col-sm-8 col-md-6 col-lg-4 col-xl-4 flex mb-16"
            style="pointer-events: auto"
          >
            <weird-card
              v-if="$page.post.heroImage"
              :title="$page.post.title"
              :heroImgUrl="$page.post.heroImage.file.url"
              :hyperlink="$page.post.hyperlink"
            />
          </div>
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
      youTubeEmbed
      title
    }
  }
</page-query>

<script>
import {
  random,
  randomIcon,
  randomMaterialColor,
  randomAnimation,
} from "~/util";
import WeirdCard from "../components/WeirdCard.vue";
import NodeDialog from "~/components/NodeDialog.vue";

export default {
  components: { WeirdCard, NodeDialog },
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
    iframeUrl: "https://www.dn.se/",
    randomZ: random(3, 5), // below or above clouds
    currentAnimation: randomAnimation(),
  }),
  methods: {
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
