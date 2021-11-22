<template>
  <!-- <v-card class="px-4 py-2"> -->
  <v-autocomplete
    :items="items"
    :loading="isLoading"
    :search-input.sync="search"
    hide-details
    hide-selected
    :color="randomMaterialColor()"
    item-text="name"
    item-value="id"
    filled
    no-filter
    dark
    :label="!$vuetify.breakpoint.smAndUp ? title : title"
    :dense="!$vuetify.breakpoint.mdAndUp"
    append-outer-icon="mdi-magnify"
    :menu-props="{ closeOnContentClick: true }"
  >
    <template v-slot:no-data>
      <v-list-item>
        <v-list-item-title>
          <!-- <WeirdText /> -->
          Nothing
        </v-list-item-title>
      </v-list-item>
    </template>
    <template v-slot:item="{ item }">
      <v-list-item link :to="'/nodes/' + item.id">
        <v-list-item-avatar
          :color="randomMaterialColor()"
          class="font-weight-light white--text"
        >
          <span class="mb-1">{{ item.name.charAt(0) }}</span>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-text="item.id"></v-list-item-title>
          <v-list-item-subtitle v-text="item.hyperlink"></v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-icon>{{ randomIcon() }}</v-icon>
        </v-list-item-action>
      </v-list-item>
    </template>
  </v-autocomplete>
  <!-- </v-card> -->
</template>
<script>
import { randomIcon, randomText } from "~/util";
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
    // slug, symbol, name
    search(val) {
      if (!this.search && !val) return;

      this.isLoading = true;

      const filteredResults = this.$store.state.ctfBlocks.filter((post) => {
        const searchTermChars = this.search.toLowerCase().split("");
        const titleChars = post.node.name.toLowerCase().split("");
        return titleChars.some((r) => searchTermChars.indexOf(r) >= 0);
        // return post.node.title
        //   .toLowerCase()
        //   .includes(this.search.toLowerCase().trim());
      });
      console.log(filteredResults.length);
      this.items = filteredResults.map((n) => {
        return {
          id: n.node.title,
          hyperlink: n.node.hyperlink,
          name: n.node.name, // vs title
        };
      });
      this.isLoading = false;
    },
  },
};
</script>
