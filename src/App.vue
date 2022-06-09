<template>
  <MainLayout>
    <v-app id="app">
      <AudioModule />
      <!-- <Clock v-show="!allHidden" /> -->
      <RegularNav
        v-show="showHeader"
        @force-nav="forceNav"
        :elevation="randomElevation()"
      ></RegularNav>

      <transition mode="out-in" appear name="bounceLeft">
        <router-view
          :key="$route.fullPath"
          @force-nav="forceNav"
          style="animation-duration: 250ms"
        />
      </transition>

      <ActionBar @map-nav="mapNav" />
      <FooterNav
        v-show="showFooter"
        app
        @force-nav="forceNav"
        :elevation="randomElevation()"
      />
      <transition mode="out-in" appear :name="currentAnimation"
        ><CloudPng v-if="random(0, 3) > 2" :key="$route.fullPath"
      /></transition>

      <!-- <transition mode="out-in" appear :name="currentAnimation"
        ><CloudPng v-if="random(0, 4) > 2" :key="$route.fullPath"
      /></transition> -->
      <!-- <CloudDisplay /> -->

      <v-dialog eager height="100vh" v-model="audioDialog" max-width="300">
        <v-card>
          <v-card-title><weird-text /></v-card-title>
          <v-card-text>
            {{ tosBody() }}
          </v-card-text>
          <!-- <v-btn class="mr-2" color="red" @click="audioDialog = false">
            <v-icon x-large>mdi-volume-mute</v-icon>
          </v-btn>
          <v-btn color="green" dark @click="$store.commit('toggleAudio')">
            <v-icon large>mdi-volume-medium</v-icon>
          </v-btn> -->
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" text @click="audioDialog = false">
              <v-icon large>mdi-volume-mute</v-icon> No
            </v-btn>
            <v-btn color="success" text @click="$store.commit('toggleAudio')">
              <v-icon large>mdi-volume-medium</v-icon> I Accept
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-app>
  </MainLayout>
</template>

<static-query>
  query {
    metadata {
      siteName
      siteDescription
    }
    nodes: allContentfulNode(sortBy: "published_at", order: DESC) {
      edges {
        node {
          title,
          name,
          hyperlink,
          archiveLink,
          date,
          heroImage {
            file {
              url
            }
          },
        }
      }
    }
  }
</static-query>

<script>
import {
  random,
  randomIcon,
  randomMaterialColor,
  randomAnimation,
  randomElevation,
  randomText,
} from "~/util";

import MainLayout from "~/layouts/Main.vue";
import RegularNav from "~/components/nav/RegularNav.vue";
import FooterNav from "~/components/nav/FooterNav.vue";
import CloudPng from "~/components/clouds/CloudPng.vue";
import CloudDisplay from "~/components/clouds/CloudDisplay.vue";
import Clock from "~/components/Clock.vue";
import SearchBar from "~/components/SearchBar.vue";
import ActionBar from "~/components/ActionBar.vue";
import AudioModule from "~/components/AudioModule.vue";
import { mapState } from "vuex";

import { cardMixin } from "~/cardMixin";

import WeirdText from "./components/WeirdText.vue";

export default {
  mixins: [cardMixin],

  components: {
    ActionBar,
    AudioModule,
    CloudPng,
    CloudDisplay,
    MainLayout,
    RegularNav,
    FooterNav,
    Clock,
    SearchBar,
    WeirdText,
  },
  data: () => ({
    showHeader: true,
    showFooter: true,
    currentAnimation: randomAnimation(),
    audioDialog: true,
  }),
  metaInfo() {
    return {
      title: this.$static.metadata.siteName,
      meta: [
        {
          key: "description",
          name: "description",
          content: this.$static.metadata.siteDescription,
        },
      ],
    };
  },
  computed: {
    ...mapState(["allHidden"]),
  },
  methods: {
    mapNav() {
      this.$store.commit("mapNav");
    },
    tosBody() {
      return randomText({
        type: "clickbait",
        length: random(500, 750),
      });
    },
    forceNav() {
      console.log("forceNav main");
      if (this.allHidden) {
        this.$store.commit("toggleHide");
      }

      this.currentAnimation = randomAnimation();
      const allNodes = this.$static.nodes.edges;
      let nextPost = allNodes.sample();
      while (this.$route.fullPath.includes(nextPost.node.title)) {
        nextPost = allNodes.sample();
      }

      let nextRoutePath = `/nodes/${nextPost.node.title}`;
      this.$router.push({ path: nextRoutePath });
    },
    navigateForward() {
      console.log("navigateForward");
      this.$store.commit("navigateForward");
      console.log(this.$store.state.currentBlockIdx);
    },
  },
  created() {
    this.$store.commit("setIsLoading", true);
  },
  mounted() {
    console.log("App mount: Setting content:", this.$static.nodes.edges);
    this.$store.commit("setMainContent", this.$static.nodes.edges);
    gtag("event", "page_view", {
      page_title: "App Mount",
      page_path: "/",
    });
  },
  destroyed() {
    clearInterval(this.crossFadeInterval);
  },
  watch: {
    "$store.state.currentBlockIdx": function () {
      console.log(this.$store.state.currentBlockIdx);
      this.forceNav();
    },
    "$store.state.isMuted": function () {
      this.audioDialog = false;
    },
  },
};
</script>

<style>
html {
  overflow-y: auto;
}
.button-bar {
  position: fixed;
  right: 20px;
  z-index: 1000;
  display: flex;
  height: 100vh;
  justify-content: center;
}
</style>
