<template>
  <component
    v-bind:is="currentComponentType"
    :title="title"
    :heroImgUrl="heroImgUrl"
    :hyperlink="hyperlink"
  ></component>
</template>
<script>
import Inbox from "~/components/nodeTypes/Inbox.vue";
import Dialog from "~/components/nodeTypes/Dialog.vue";
import BaseCard from "~/components/nodeTypes/BaseCard.vue";

const availableComponents = ["BaseCard", "Inbox", "Dialog"];
export default {
  components: { Inbox, Dialog, BaseCard },
  props: {
    title: { type: String, default: "title" },
    heroImgUrl: { type: String, default: "" },
    hyperlink: { type: String, default: "./" },
  },
  data: () => ({
    currentComponentType: availableComponents.sample(),
  }),
};
</script>
