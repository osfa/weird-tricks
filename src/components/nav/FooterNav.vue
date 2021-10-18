<template>
  <v-bottom-navigation
    class="overflow-hidden"
    v-model="value"
    fixed
    :background-color="backgroundColor"
    dark
    shift
  >
    <v-btn
      :key="index"
      v-for="(m, index) in menuItems"
      link
      @click="forceNavigate"
    >
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
      path: "/nodes/",
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
  methods: {
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
      this.currentColor = randomMaterialColor();
      this.currentMenuItems = randomMenuItems();
    },
  },
};
</script>
