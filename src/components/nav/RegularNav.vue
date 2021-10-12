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
        <v-list-item link to="/">
          <v-list-item-icon>
            <v-icon>mdi-folder</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
        <v-list-item link to="/other/">
          <v-list-item-icon>
            <v-icon>mdi-account-multiple</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Other</v-list-item-title>
        </v-list-item>
        <v-list-item link to="/blog/">
          <v-list-item-icon>
            <v-icon>mdi-access-point</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Blog</v-list-item-title>
        </v-list-item>
        <v-list-item link to="/about/">
          <v-list-item-icon>
            <v-icon>mdi-star</v-icon>
          </v-list-item-icon>
          <v-list-item-title>About</v-list-item-title>
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
import { randomMaterialColor } from "~/util";
import randomWords from "random-words";
import Tree from "./Tree.vue";
import Expander from "./Expander.vue";

export default {
  components: {
    Tree,
    Expander,
  },
  data: () => ({
    drawer: false,
    currentDrawerColor: "yellow darken-2",
    currentMainColor: "pink",
  }),
  computed: {
    randomText() {
      return randomWords(2);
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
      console.log("route changed");
    },
  },
};
</script>
