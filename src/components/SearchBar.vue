<template>
  <!-- <v-col cols="12" md="6"> -->
  <v-autocomplete
    v-model="model"
    :items="items"
    :loading="isLoading"
    :search-input.sync="search"
    hide-details
    hide-selected
    item-text="name"
    item-value="id"
    :label="!$vuetify.breakpoint.smAndUp ? title : title"
    :dense="!$vuetify.breakpoint.mdAndUp"
    dark
    append-outer-icon="mdi-magnify"
    :menu-props="{ closeOnContentClick: true }"
  >
    <!-- mdi-map-marker -->
    <!-- <v-icon slot="append-icon" large color="primary">comment</v-icon> -->
    <!-- clearable solo-inverted     append-outer-icon="search"
-->
    <template v-slot:no-data>
      <v-list-item>
        <v-list-item-title>
          <!-- <WeirdText /> -->
          Nothing
        </v-list-item-title>
      </v-list-item>
    </template>
    <template v-slot:item="{ item }">
      <v-list-item
        link
        :to="'/nodes/' + item.name.replace(' ', '-').toLowerCase()"
      >
        <v-list-item-avatar
          :color="randomMaterialColor()"
          class="font-weight-light white--text"
        >
          <span class="mb-1">{{ item.name.charAt(0) }}</span>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-text="item.name"></v-list-item-title>
          <v-list-item-subtitle v-text="item.hyperlink"></v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-icon>{{ randomIcon() }}</v-icon>
        </v-list-item-action>
      </v-list-item>
    </template>
  </v-autocomplete>
  <!-- </v-col> -->
</template>
<script>
import {
  random,
  randomIcon,
  randomMaterialColor,
  randomAnimation,
  randomElevation,
  randomText,
} from "~/util";
import WeirdText from "~/components/WeirdText.vue";
import { cardMixin } from "~/cardMixin";

export default {
  mixins: [cardMixin],
  components: { WeirdText },
  props: {},
  data() {
    return {
      title: "You won't believe it",
      isLoading: false,
      items: [],
      model: null,
      search: null,
    };
  },
  methods: {
    randomIcon() {
      return randomIcon();
    },
    getRandomText() {
      return randomText();
    },
  },
  watch: {
    // id, symbol, name
    search(val) {
      if (!this.search && !val) return;

      this.isLoading = true;

      const filteredResults = this.$store.state.ctfBlocks.filter((post) => {
        return post.node.title
          .toLowerCase()
          .includes(this.search.toLowerCase().trim());
      });

      // console.log(filteredResults);

      this.items = filteredResults.map((n) => {
        return {
          id: n.node.id, // ctf id
          hyperlink: n.node.hyperlink,
          name: n.node.title,
        };
      });

      this.isLoading = false;
    },
  },
  //   computed: {
  //     searchResults() {
  //       if (this.search && this.search.toLowerCase().trim().length > 2) {
  //         const filteredResults = this.$store.state.ctfBlocks.filter((post) => {
  //           console.log(
  //             post.node.title
  //               .toLowerCase()
  //               .includes(this.search.toLowerCase().trim())
  //           );
  //           return post.node.title
  //             .toLowerCase()
  //             .includes(this.search.toLowerCase().trim());
  //         });
  //         console.log(filteredResults.length);
  //         return filteredResults;
  //       } else {
  //         return [];
  //       }
  //     },
  //   },
};
</script>
