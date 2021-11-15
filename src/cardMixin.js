import {
  random,
  randomMaterialColor,
  randomElevation,
  randomText,
  randomIcon,
} from "~/util";

export const cardMixin = {
  methods: {
    randomMaterialColor() {
      return randomMaterialColor();
    },
    randomElevation() {
      return randomElevation();
    },
    randomText() {
      return randomText();
    },
    random(min, max) {
      return random(min, max);
    },
    randomIcon() {
      return randomIcon();
    },
    forceNavigate() {
      this.$store.commit("navigateForward");
    },
    toggleCollapse() {
      this.$store.commit("toggleCollapse");
    },
  },
};
