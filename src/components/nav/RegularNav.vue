<template>
  <div>
    <v-navigation-drawer v-model="drawer" app :color="currentDrawerColor" dark>
      <v-list>
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <v-img
              src="https://randomuser.me/api/portraits/women/85.jpg"
            ></v-img>
          </v-list-item-avatar>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <!-- <g-link to="/about/">About us</g-link> -->
      <v-list nav dense>
        <v-list-item link to="/blog/">
          <v-list-item-icon>
            <v-icon>mdi-folder</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Index</v-list-item-title>
        </v-list-item>
        <v-list-item link to="/about/">
          <v-list-item-icon>
            <v-icon>mdi-folder</v-icon>
          </v-list-item-icon>
          <v-list-item-title>About</v-list-item-title>
        </v-list-item>

        <v-list-item
          :key="index"
          v-for="(m, index) in menuItems"
          link
          :to="m.path"
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
        >You wont believe it</v-toolbar-title
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
      path: "/other/", // vs just emit and nav?
    },
    {
      label: randomWords({ min: 1, max: 2, join: " " }),
      icon: randomIcon(),
      path: "/blog/",
    },
    {
      label: randomWords({ min: 1, max: 2, join: " " }),
      icon: randomIcon(),
      path: "/about/",
    },
    {
      label: randomWords({ min: 1, max: 2, join: " " }),
      icon: randomIcon(),
      path: "/",
    },
  ];
};
export default {
  components: {
    Tree,
    Expander,
  },
  data: () => ({
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
