<template>
  <Layout>
    <!-- background image overlay -->
    <!-- <transition mode="out-in" name="fade" hide-on-leave="true"> -->
    <v-scroll-x-transition mode="out-in" :hide-on-leave="true">
      <div
        :key="$route.fullPath"
        v-if="$page.post.heroImage"
        :style="`background-image: url('${
          $page.post.heroImage.file.url
        }?fit=fill&w=1280&h=720'); 
      position: fixed; top: 0; left: 0; 
      width: 100%; height: 100%;
      pointer-events:none;
      z-index: 2;
      opacity: ${random(10, 25)}%; background-size: cover;`"
      ></div>
    </v-scroll-x-transition>

    <!-- </transition> -->

    <!-- COMPONENT -->
    <node-dialog
      v-if="!allHidden"
      style="z-index: 100"
      is-fixed
      :iframe-url="$page.post.hyperlink"
    />

    <transition
      mode="out-in"
      appear
      :name="currentAnimation"
      v-show="!allHidden"
    >
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
            class="col-10 col-sm-8 col-md-6 col-lg-6 col-xl-6 flex mb-16"
            style="pointer-events: auto"
          >
            <weird-card
              :title="$page.post.title"
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
      title,
      name,
      hyperlink,
      youTubeEmbed,
      heroImage {
        file {
          url
        }
      },
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
import { mapState } from "vuex";
import { cardMixin } from "~/cardMixin";

export default {
  mixins: [cardMixin],

  components: { WeirdCard, NodeDialog },
  metaInfo() {
    return {
      title: this.$page.post.title,
    };
  },
  mounted() {
    console.log("====== node mount: ", this.$page.post);
    if (this.$page.post.hyperlink != "null") {
      this.iframeUrl = this.$page.post.hyperlink;
    }
  },
  computed: {
    ...mapState(["allHidden"]),
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
};
</script>
