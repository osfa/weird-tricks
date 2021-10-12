<template>
  <v-bottom-navigation
    class="overflow-hidden"
    v-model="value"
    fixed
    :background-color="backgroundColor"
    dark
    shift
  >
    <v-btn :key="index" v-for="(m, index) in menuItems" link :to="m.path">
      <span>{{ m.label }}</span>
      <v-icon>{{ m.icon }}</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
import { randomMaterialColor, randomIcon } from "~/util";
import randomWords from "random-words";

const randomMenuItems = () => {
  return [
    {
      label: randomWords({ min: 1, max: 2, join: " " }),
      icon: randomIcon(),
      path: "/other/",
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
  data: () => ({
    value: 1,
    currentColor: randomMaterialColor(),
    currentMenuItems: randomMenuItems(),
  }),
  computed: {
    backgroundColor() {
      return this.currentColor;
    },
    menuItems() {
      return this.currentMenuItems;
    },
  },
  watch: {
    $route: function () {
      this.currentColor = randomMaterialColor();
      this.currentMenuItems = randomMenuItems();
    },
  },
};
</script>
