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
      // https://stackoverflow.com/questions/42615445/vuejs-2-0-emit-event-from-grand-child-to-his-grand-parent-component
      console.log("emit to all");
      this.$emit("force-nav");
      let vm = this.$parent;
      while (vm) {
        vm.$emit("force-nav");
        vm = vm.$parent;
      }
    },
  },
};
