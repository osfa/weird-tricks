<template>
  <component
    v-bind:is="currentTabComponent"
    :title="$page.post.title"
    :heroImgUrl="$page.post.heroImage.file.url"
    :hyperlink="$page.post.hyperlink"
  ></component>
</template>
<script>
import Inbox from "~/components/Inbox.vue";
import Dialog from "~/components/Dialog.vue";
import BaseCard from "~/components/BaseCard.vue";

const availableComponents = ["BaseCard", "Inbox", "Dialog"];
export default {
  components: { Inbox, Dialog, BaseCard },
  props: {
    title: { type: String, default: "title" },
    heroImgUrl: { type: String, default: "" },
    hyperlink: { type: String, default: "./" },
  },
  data: () => ({
    currentTabComponent: availableComponents.sample(),
  }),
  methods: {
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
</script>
