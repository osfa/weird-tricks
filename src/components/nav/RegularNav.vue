<template>
  <div v-show="!allHidden">
    <div
      :style="[
        {
          zIndex: randomZ, // below or above clouds
        },
      ]"
    >
      <v-navigation-drawer
        v-model="drawer"
        app
        :color="currentDrawerColor"
        dark
        :elevation="randomElevation()"
        hide-overlay
      >
        <v-list v-if="showAvatar">
          <v-list-item class="px-2">
            <v-list-item-avatar>
              <v-img
                src="https://cdn.vox-cdn.com/thumbor/FNRQapctOr2iQ9BA0EAlpNzwiQA=/1400x1050/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/15788040/20150428-cloud-computing.0.1489222360.jpg"
              ></v-img>
            </v-list-item-avatar>
          </v-list-item>
        </v-list>

        <v-divider v-if="showAvatar"></v-divider>

        <v-list nav dense>
          <v-list-item class="home" link to="/">
            <v-list-item-icon>
              <v-icon color="black">mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="black--text">/</v-list-item-title>
          </v-list-item>
          <v-list-item link to="/nodes/">
            <v-list-item-icon>
              <v-icon color="black">mdi-format-list-bulleted-square</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="black--text">/***</v-list-item-title>
          </v-list-item>
          <v-list-item class="about" link to="/about/">
            <v-list-item-icon>
              <v-icon color="black">mdi-information-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="black--text">/???</v-list-item-title>
          </v-list-item>
          <v-divider class="black my-4"></v-divider>
          <v-list-item
            class="menu-item"
            :key="index"
            v-for="(m, index) in menuItems"
            link
            @click="forceNavigate"
          >
            <v-list-item-icon>
              <v-icon>{{ m.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ m.label }}</v-list-item-title>
          </v-list-item>
        </v-list>
        <Tree v-if="false" />
        <Expander v-else />
      </v-navigation-drawer>

      <v-app-bar
        app
        :color="currentMainColor"
        dark
        :extended="hasHyperLink"
        :elevation="randomElevation()"
        :extension-height="30"
      >
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <template v-slot:extension v-if="hasHyperLink" color="white">
          <node-dialog
            v-if="hasArchiveLink && $vuetify.breakpoint.smAndUp"
            style="z-index: 100"
            :link-text="currentBlock.archiveLink"
            :iframe-url="currentBlock.archiveLink"
          />
          <a
            :href="
              currentBlock.archiveLink
                ? currentBlock.archiveLink
                : currentBlock.hyperlink
            "
            target="_blank"
            class="archive-link"
            v-else
            ><v-icon class="mr-1" small color="#0000ff">mdi-link</v-icon
            ><span class="text-decoration-underline text-caption text-button">
              {{
                currentBlock.archiveLink
                  ? currentBlock.archiveLink
                  : "HYPERLINK"
              }}</span
            ></a
          >
        </template>

        <v-toolbar-title style="cursor: pointer" @click="home()"
          ><WeirdText :key="$route.fullPath"
        /></v-toolbar-title>
        <v-progress-linear
          :active="loading"
          :indeterminate="loading"
          absolute
          bottom
          :color="currentDrawerColor"
        ></v-progress-linear>

        <v-spacer></v-spacer>
        <GameBar />

        <v-btn
          class="search-toggle"
          icon
          @click="extended = !extended"
          v-if="!extended"
        >
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-btn
          @click.native="toggleAudio"
          icon
          v-show="$vuetify.breakpoint.mdAndUp || true"
        >
          <v-icon>{{ muteState.icon }}</v-icon>
        </v-btn>
      </v-app-bar>
    </div>

    <!-- floating search -->
    <transition mode="out-in" appear name="fade">
      <div
        v-if="extended"
        flat
        fab
        style="
          z-index: 1000;
          width: 350px;
          top: 85px;
          right: 16px;
          position: fixed;
        "
      >
        <SearchBar />
      </div>
    </transition>
  </div>
</template>

<script>
import {
  randomMaterialColor,
  randomIcon,
  random,
  randomElevation,
  randomText,
} from "~/util";

import Tree from "./Tree.vue";
import Expander from "./Expander.vue";
import SearchBar from "~/components/SearchBar.vue";
import GameBar from "~/components/GameBar.vue";
import { cardMixin } from "~/cardMixin";
import { mapState } from "vuex";
import WeirdText from "~/components/WeirdText.vue";
import NodeDialog from "~/components/NodeDialog.vue";

const randomMenuItems = () => {
  const menuArray = [];
  for (var index = 0; index < random(2, 4); index++) {
    menuArray.push({
      label: randomText({
        type: "clickbait",
        length: random(10, 20),
      }),
      icon: randomIcon(),
    });
  }
  return menuArray;
};
export default {
  mixins: [cardMixin],

  components: {
    Tree,
    Expander,
    SearchBar,
    GameBar,
    WeirdText,
    NodeDialog,
  },
  data: () => ({
    showAvatar: false,
    drawer: false,
    currentDrawerColor: "yellow darken-2",
    currentMainColor: "pink",
    currentMenuItems: randomMenuItems(),
    randomZ: random(3, 8),
    extended: false,
    loading: true,
  }),
  computed: {
    ...mapState(["allHidden", "isMuted", "currentBlock"]),
    menuItems() {
      return this.currentMenuItems;
    },
    muteState() {
      return {
        icon: this.isMuted ? "mdi-volume-medium" : "mdi-volume-mute",
        color: this.isMuted ? "red" : "primary",
      }; // mdi-volumne-medium /low
    },
    hasHyperLink() {
      return (
        this.currentBlock &&
        this.currentBlock.hyperlink &&
        this.currentBlock.hyperlink != "null"
      );
    },
    hasArchiveLink() {
      return (
        this.currentBlock &&
        this.currentBlock.archiveLink &&
        this.currentBlock.archiveLink != "null"
      );
    },
  },
  mounted() {
    this.loading = this.$store.state.isLoading;
  },
  methods: {
    home() {
      if (this.$route.name !== "home") {
        this.$router.push({ path: "/" });
        this.$store.commit("setCurrentBlock", {});
      }
    },
    randomElevation() {
      return randomElevation();
    },
    toggleAudio() {
      this.$store.commit("toggleAudio");
    },
  },
  watch: {
    "$store.state.isLoading": function () {
      this.loading = this.$store.state.isLoading;
    },
    "$store.state.currentBlock": function () {
      this.loading = this.$store.state.isLoading;
    },
    $route: function () {
      this.currentDrawerColor = randomMaterialColor();
      this.currentMainColor = randomMaterialColor();
      this.currentMenuItems = randomMenuItems();
      this.randomZ = random(3, 5);
      this.extended = false;
    },
  },
};
</script>
<style scoped>
.points-bar {
  position: fixed;
  pointer-events: none;
  width: 100vw;
  top: 75px;
  z-index: 1000;
}
.v-application a {
  color: blue !important;
}
</style>
<style>
div.v-toolbar__extension {
  background-color: white;
  color: blue;
}
</style>
