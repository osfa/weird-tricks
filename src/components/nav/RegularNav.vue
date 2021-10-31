<template>
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

      <!-- <g-link to="/about/">About us</g-link> -->
      <v-list nav dense>
        <v-list-item link to="/">
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
        <v-list-item link to="/about/">
          <v-list-item-icon>
            <v-icon color="black">mdi-information-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="black--text">/???</v-list-item-title>
        </v-list-item>
        <v-divider class="black my-4"></v-divider>
        <v-list-item
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
      :elevation="randomElevation()"
      :extension-height="70"
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title style="cursor: pointer" @click="home()"
        >You won't believe it</v-toolbar-title
      >
      <template v-slot:extension v-if="false">
        <SearchBar class="" />
      </template>
      <!-- <v-autocomplete dark filled dense hide-details></v-autocomplete> -->
      <v-spacer></v-spacer>

      <v-btn icon @click="extended = !extended">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>
    <transition mode="out-in" appear name="fade">
      <v-card
        v-if="extended"
        flat
        fab
        style="
          z-index: 1000;
          width: 300px;
          top: 85px;
          right: 16px;
          position: fixed;
        "
      >
        <v-toolbar dense class="flex-grow-0">
          <v-text-field
            hide-details
            prepend-icon="mdi-magnify"
            single-line
          ></v-text-field>

          <v-btn icon>
            <v-icon>mdi-crosshairs-gps</v-icon>
          </v-btn>
        </v-toolbar>
      </v-card>
    </transition>
  </div>
</template>

<script>
import {
  randomMaterialColor,
  randomIcon,
  random,
  randomElevation,
} from "~/util";
import randomWords from "random-words";
import Tree from "./Tree.vue";
import Expander from "./Expander.vue";
import SearchBar from "~/components/SearchBar.vue";

// :permanent="$vuetify.breakpoint.mdAndUp"

const randomMenuItems = () => {
  return [
    {
      label: randomWords({ min: 1, max: 2, join: " " }),
      icon: randomIcon(),
    },
    {
      label: randomWords({ min: 1, max: 2, join: " " }),
      icon: randomIcon(),
    },
    {
      label: randomWords({ min: 1, max: 2, join: " " }),
      icon: randomIcon(),
    },
    {
      label: randomWords({ min: 1, max: 2, join: " " }),
      icon: randomIcon(),
    },
  ];
};
export default {
  components: {
    Tree,
    Expander,
    SearchBar,
  },
  data: () => ({
    showAvatar: false,
    drawer: false,
    currentDrawerColor: "yellow darken-2",
    currentMainColor: "pink",
    currentMenuItems: randomMenuItems(),
    randomZ: random(3, 5),
    extended: false,
  }),
  computed: {
    menuItems() {
      return this.currentMenuItems;
    },
  },
  methods: {
    home() {
      console.log("home click");
      // this.$emit("force-nav");
      if (this.$route.name !== "home") {
        this.$router.push({ path: "/" });
      }
    },
    randomElevation() {
      return randomElevation();
    },
    forceNavigate() {
      console.log("emit?");
      // map methods?
      // https://stackoverflow.com/questions/42615445/vuejs-2-0-emit-event-from-grand-child-to-his-grand-parent-component
      this.$emit("force-nav");
      let vm = this.$parent;
      while (vm) {
        vm.$emit("force-nav");
        vm = vm.$parent;
      }
    },
  },
  watch: {
    $route: function () {
      this.currentDrawerColor = randomMaterialColor();
      this.currentMainColor = randomMaterialColor();
      this.currentMenuItems = randomMenuItems();
      this.randomZ = random(3, 5);
      console.log("route changed");
    },
  },
};
</script>
