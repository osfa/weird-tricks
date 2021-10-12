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
      label: randomWords(),
      icon: randomIcon(),
      path: "/blog/",
    },
    {
      label: randomWords(),
      icon: randomIcon(),
      path: "/blog/",
    },
    {
      label: randomWords(),
      icon: randomIcon(),
      path: "/blog/",
    },
    {
      label: randomWords(),
      icon: randomIcon(),
      path: "/blog/",
    },
  ];
};
export default {
  data: () => ({
    value: 1,
    dataColor: randomMaterialColor(),
    currentMenuItems: randomMenuItems(),
  }),
  computed: {
    backgroundColor() {
      return this.dataColor;
    },
    menuItems() {
      return this.currentMenuItems;
    },
  },
  watch: {
    $route: function () {
      this.dataColor = randomMaterialColor();
      this.currentMenuItems = randomMenuItems();
    },
  },
};
</script>
