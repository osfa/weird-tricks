<template>
  <!-- <div>
    <div v-if="searchResults.length > 0">
      <article v-for="post in searchResults" :key="post.node.id">
        <h1>
          <g-link :to="post.node.path">{{ post.node.title }}</g-link>
        </h1>
      </article>
    </div>

    <div v-else>
      <p>Your search didn't return any results. Please try again.</p>
    </div>
  </div> -->
  <v-autocomplete
    v-model="model"
    :items="items"
    :loading="isLoading"
    :search-input.sync="search"
    clearable
    hide-details
    hide-selected
    item-text="name"
    item-value="symbol"
    label="Search for a node..."
    solo-inverted
  >
    <template v-slot:no-data>
      <v-list-item>
        <v-list-item-title>
          Search for your favorite
          <strong>Node</strong>
        </v-list-item-title>
      </v-list-item>
    </template>
    <!-- <template v-slot:selection="{ attr, on, item, selected }">
      <v-chip
        v-bind="attr"
        :input-value="selected"
        color="blue-grey"
        class="white--text"
        v-on="on"
      >
        <v-icon left> {{ randomIcon() }} </v-icon>
        <span v-text="item.name"></span>
      </v-chip>
    </template> -->
    <template v-slot:item="{ item }">
      <v-list-item-avatar
        color="indigo"
        class="text-h5 font-weight-light white--text"
      >
        {{ item.name.charAt(0) }}
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title v-text="item.name"></v-list-item-title>
        <v-list-item-subtitle v-text="item.symbol"></v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action>
        <v-icon>{{ randomIcon() }}</v-icon>
      </v-list-item-action>
    </template>
  </v-autocomplete>
</template>
<script>
import {
  random,
  randomIcon,
  randomMaterialColor,
  randomAnimation,
  randomElevation,
} from "~/util";

export default {
  components: {},
  props: {},
  data() {
    return {
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
      console.log(filteredResults);
      this.items = filteredResults.map((n) => {
        return { id: n.node.id, symbol: n.node.id, name: n.node.title };
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
