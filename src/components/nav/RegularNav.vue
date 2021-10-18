<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      app
      :color="currentDrawerColor"
      dark
      :permanent="!$vuetify.breakpoint.mdAndUp"
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
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>/</v-list-item-title>
        </v-list-item>
        <v-list-item link to="/nodes/">
          <v-list-item-icon>
            <v-icon>mdi-format-list-bulleted-square</v-icon>
          </v-list-item-icon>
          <v-list-item-title>/nodes</v-list-item-title>
        </v-list-item>
        <v-list-item link to="/about/">
          <v-list-item-icon>
            <v-icon>mdi-information-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title>/about</v-list-item-title>
        </v-list-item>
        <v-divider class="my-4"></v-divider>
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

    <v-app-bar app :color="currentMainColor" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title style="cursor: pointer" @click="home()"
        >You won't believe it</v-toolbar-title
      >
    </v-app-bar>
  </div>
</template>

<script>
import { randomMaterialColor, randomIcon } from "~/util";
import randomWords from "random-words";
import Tree from "./Tree.vue";
import Expander from "./Expander.vue";

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
  },
  data: () => ({
    showAvatar: false,
    drawer: false,
    currentDrawerColor: "yellow darken-2",
    currentMainColor: "pink",
    currentMenuItems: randomMenuItems(),
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
      console.log("route changed");
    },
  },
};
</script>
