<template>
  <Layout>
    <v-container
      style="
        max-width: 900px;
        position: relative;
        padding-bottom: 200px;
        pointer-events: auto;
      "
    >
      <v-row align="center">
        <v-col
          v-for="{ node } in shuffledContent"
          :key="node.id"
          :cols="colCount"
        >
          <g-image v-if="false" :src="node.heroImage.file.url" />

          <v-card
            :to="`/nodes/${node.id}`"
            style="pointer-events: auto"
            class="elevation-12"
          >
            <v-img :src="node.heroImage.file.url" class="white--text align-end">
            </v-img>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn icon>
                <v-icon>{{ randomIcon() }}</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>{{ randomIcon() }}</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>{{ randomIcon() }}</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>{{ randomIcon() }}</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>{{ randomIcon() }}</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <pager
        v-if="$page.posts.pageInfo.totalPages > 1 && false"
        :info="$page.posts.pageInfo"
      />
    </v-container>
  </Layout>
</template>

<page-query>
query Posts($page: Int) { 
  posts: allContentfulNode(sortBy: "date", order: DESC, perPage: 10, page: $page) 
  @paginate { 
    totalCount pageInfo 
    { totalPages currentPage } 
    edges { 
        node { 
          id 
          title 
          date(format: "MMMM D, Y")
          heroImage {
            file {
              url
            }
          }
        } 
    } 
  } 
}
</page-query>

<script>
import { Pager } from "gridsome";
import { randomIcon } from "~/util";

export default {
  metaInfo: {
    title: "Index",
  },
  components: {
    Pager,
  },
  data: () => ({
    cards: [
      {
        title: "Pre-fab homes",
        src: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
        flex: 12,
      },
      {
        title: "Favorite road trips",
        src: "https://cdn.vuetifyjs.com/images/cards/road.jpg",
        flex: 6,
      },
      {
        title: "Best airlines",
        src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
        flex: 6,
      },
    ],
  }),
  computed: {
    colCount() {
      return 4;
    },
    shuffledContent() {
      return this.shuffleArray(this.$page.posts.edges);
    },
  },
  methods: {
    randomIcon() {
      return randomIcon();
    },
    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    },
  },
};
</script>
