<template>
  <Layout
    :key="$route.fullPath"
    :style="[
      {
        zIndex: randomZ, // below or above clouds
      },
    ]"
  >
    <v-container
      class="pt-12"
      style="
        max-width: 900px;
        position: relative;
        padding-bottom: 200px;
        <!-- pointer-events: auto; -->
      "
    >
      <v-row align="center">
        <v-col
          v-for="{ node } in shuffledContent"
          :key="node.title"
          :cols="colCount"
          style="pointer-events: auto"
          class="col-12 col-sm-6 col-md-4"
        >
          <g-image v-if="false" :src="node.heroImage.file.url" />

          <v-card
            :to="`/nodes/${node.title}`"
            style="pointer-events: auto"
            :elevation="randomElevation()"
          >
            <v-img
              v-if="node.heroImage"
              :key="node.heroImage.file.url"
              :src="`${node.heroImage.file.url}?fit=scale&w=800`"
            >
              <template v-slot:placeholder>
                <v-row
                  class="fill-height ma-0 p-10"
                  align="center"
                  justify="center"
                >
                  <v-progress-circular
                    indeterminate
                    :color="randomMaterialColor()"
                  ></v-progress-circular>
                </v-row>
              </template>
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
          name 
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
import { randomIcon, randomMaterialColor, random } from "~/util";

export default {
  metaInfo: {
    title: "Index",
  },
  components: {
    Pager,
  },
  data: () => ({
    randomZ: random(3, 5),
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
    randomElevation() {
      return random(1, 16);
    },
    randomIcon() {
      return randomIcon();
    },
    randomMaterialColor() {
      return randomMaterialColor();
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
