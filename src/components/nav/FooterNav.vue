<template>
  <v-bottom-navigation
    :elevation="randomElevation()"
    class="overflow-hidden"
    v-model="value"
    fixed
    :background-color="backgroundColor"
    dark
    shift
    :style="[
      {
        zIndex: randomZ, // below or above clouds
      },
    ]"
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
import {
  randomMaterialColor,
  randomIcon,
  random,
  randomElevation,
  randomText,
} from "~/util";
import { mapState } from "vuex";
import { cardMixin } from "~/cardMixin";

const randomMenuItems = () => {
  return [
    {
      label: randomText({
        type: "clickbait",
        length: random(10, 15),
      }),
      icon: randomIcon(),
      path: "/other/",
    },
    {
      label: randomText({
        type: "clickbait",
        length: random(10, 15),
      }),
      icon: randomIcon(),
      path: "/nodes/",
    },
    {
      label: randomText({
        type: "clickbait",
        length: random(10, 15),
      }),
      icon: randomIcon(),
      path: "/about/",
    },
    {
      label: randomText({
        type: "clickbait",
        length: random(10, 15),
      }),
      icon: randomIcon(),
      path: "/",
    },
  ];
};
export default {
  mixins: [cardMixin],

  data: () => ({
    value: 1,
    currentColor: randomMaterialColor(),
    currentMenuItems: randomMenuItems(),
    randomZ: random(3, 5),
  }),
  computed: {
    ...mapState(["allHidden"]),
    backgroundColor() {
      return this.currentColor;
    },
    menuItems() {
      return this.currentMenuItems;
    },
  },
  methods: {
    randomElevation() {
      return randomElevation();
    },
  },
  watch: {
    $route: function () {
      this.currentColor = randomMaterialColor();
      this.currentMenuItems = randomMenuItems();
      this.randomZ = random(3, 5);
    },
  },
};
</script>
