<template>
  <v-card class="mx-auto">
    <v-toolbar color="cyan" dark>
      <v-app-bar-nav-icon @click="forceNavigate()"></v-app-bar-nav-icon>

      <v-toolbar-title><weird-text /></v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn @click="forceNavigate()" icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-toolbar>
    <v-img :src="`${this.heroImgUrl}?fit=scale&w=1600`"> </v-img>
    <v-list three-line>
      <template v-for="(item, index) in items">
        <v-subheader
          v-if="item.header"
          :key="item.header"
          v-text="item.header"
        ></v-subheader>

        <v-divider
          v-else-if="item.divider"
          :key="index"
          :inset="item.inset"
        ></v-divider>

        <v-list-item
          v-else
          :key="item.title"
          @click="forceNavigate()"
          style="cursor: pointer"
        >
          <v-list-item-avatar>
            <v-img :src="item.avatar"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-html="item.title"></v-list-item-title>
            <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-card>
</template>
<script>
import WeirdText from "~/components/WeirdText.vue";
import { random, randomClickBait, randomText } from "~/util";

export default {
  components: { WeirdText },
  props: {
    title: { type: String, default: "title" },
    heroImgUrl: { type: String, default: "" },
    hyperlink: { type: String, default: "./" },
  },
  data: function () {
    const items = [
      { header: "Today" },
      {
        avatar: this.heroImgUrl,
        title: randomText({ type: "title" }),
        subtitle: randomText({ type: "sentence" }),
      },
      { divider: true, inset: true },
      {
        avatar: this.heroImgUrl,
        title: randomText({ type: "title" }),
        subtitle: randomText({ type: "sentence" }),
      },
      { divider: true, inset: true },
      {
        avatar: this.heroImgUrl,
        title: randomText({ type: "title" }),
        subtitle: randomText({ type: "sentence" }),
      },
      { divider: true, inset: true },
    ];
    return { items };
  },
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
