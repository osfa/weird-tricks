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
    randomIcon() {
      return randomIcon();
    },
    forceNavigate() {
      this.$store.commit("navigateForward");
    },
  },
};
