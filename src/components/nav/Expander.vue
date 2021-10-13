<template>
  <v-card class="mx-auto" max-width="500">
    <v-toolbar :color="mainColor" dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>{{ title }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar>

    <v-list :color="drawerColor">
      <v-list-group
        :color="mainColor"
        v-for="item in items"
        :key="item.title"
        v-model="item.active"
        :prepend-icon="item.action"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="child in item.items"
          :key="child.title"
          link
          to="/nodes/"
        >
          <v-list-item-content>
            <v-list-item-title v-text="child.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-card>
</template>
<script>
import { randomMaterialColor, randomIcon } from "~/util";
import randomWords from "random-words";

const randomMenuItemString = () => {
  let str = randomWords({ min: 1, max: 2, join: " " });
  return str.charAt(0).toUpperCase() + str.slice(1);
};
export default {
  data: () => ({
    currentDrawerColor: "yellow darken-2",
    currentMainColor: "pink",
    items: [
      {
        action: randomIcon(),
        items: [{ title: randomMenuItemString() }],
        title: randomMenuItemString(),
      },
      {
        action: randomIcon(),
        active: true,
        items: [
          { title: randomMenuItemString() },
          { title: randomMenuItemString() },
          { title: randomMenuItemString() },
        ],
        title: randomMenuItemString(),
      },
      {
        action: randomIcon(),
        items: [{ title: randomMenuItemString() }],
        title: randomMenuItemString(),
      },
      {
        action: randomIcon(),
        items: [{ title: randomMenuItemString() }],
        title: randomMenuItemString(),
      },
      {
        action: randomIcon(),
        items: [{ title: randomMenuItemString() }],
        title: randomMenuItemString(),
      },
      {
        action: randomIcon(),
        items: [{ title: randomMenuItemString() }],
        title: randomMenuItemString(),
      },
      {
        action: randomIcon(),
        items: [{ title: randomMenuItemString() }],
        title: randomMenuItemString(),
      },
    ],
  }),
  computed: {
    title() {
      return randomMenuItemString();
    },
    mainColor() {
      return this.currentMainColor;
    },
    drawerColor() {
      return this.currentDrawerColor;
    },
  },
  watch: {
    $route: function () {
      this.currentDrawerColor = randomMaterialColor();
      this.currentMainColor = randomMaterialColor();
      // this.currentMenuItems = randomMenuItems();
    },
  },
};
</script>
