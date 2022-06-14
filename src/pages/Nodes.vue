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
      fluid
      v-show="!allHidden"
      class="pt-12 pt-md-12 px-12"
      style="position: relative; padding-bottom: 200px; pointer-events: auto"
    >
      <v-row align="center">
        <v-col
          v-for="{ node } in shuffledContent"
          :key="node.title"
          :cols="colCount"
          style="pointer-events: auto"
          class="col-12 col-sm-6 col-md-4"
        >
          <v-card
            class="force-navigate"
            :to="`/nodes/${node.title}`"
            style="pointer-events: auto"
            :elevation="randomElevation()"
          >
            <v-img
              v-if="node.heroImage"
              :key="node.heroImage.file.url"
              :src="nodeImg(node)"
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
            <v-img v-else :key="node.title" :src="nodeImg(node)">
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
              <v-btn v-if="node.youTubeEmbed" icon color="error">
                <v-icon>mdi-play</v-icon>
              </v-btn>
              <v-btn
                v-if="node.archiveLink && node.archiveLink !== 'null'"
                icon
                color="success"
              >
                <v-icon>mdi-link</v-icon>
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
              <v-btn icon>
                <v-icon>{{ randomIcon() }}</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-pagination
        style="margin-top: 200px"
        v-model="$page.posts.pageInfo.currentPage"
        :length="$page.posts.pageInfo.totalPages"
        @input="pageTo"
        @prev="next"
        @next="prev"
      ></v-pagination>
    </v-container>
  </Layout>
</template>

<page-query>
query Posts($page: Int) { 
  posts: allContentfulNode(sortBy: "date", order: DESC, perPage: 25, page: $page) 
  @paginate { 
    totalCount pageInfo 
    { totalPages currentPage } 
    edges { 
        node { 
          name 
          title
          archiveLink
          youTubeEmbed
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
import { mapState } from "vuex";

export default {
  metaInfo: {
    title: "Index of /nodes",
  },
  components: {
    Pager,
  },
  data: () => ({
    randomZ: random(3, 5),
    perPage: 25,
  }),
  mounted() {
    this.$store.commit("setCurrentBlock", {});
  },
  computed: {
    ...mapState(["allHidden"]),
    colCount() {
      return 4;
    },
    shuffledContent() {
      const items = this.$store.state.ctfBlocks
        ? this.paginate(
            this.$store.state.ctfBlocks,
            this.perPage,
            this.$page.posts.pageInfo.currentPage
          )
        : this.$page.posts.edges;
      return items;
    },
  },
  methods: {
    nodeImg(node) {
      const img = node.heroImage
        ? `${node.heroImage.file.url}?fit=scale&w=800`
        : "http://via.placeholder.com/640x360";
      return img;
    },
    pageTo(page) {
      const nextRoutePath = `/nodes/${page}`;
      this.$router.push({ path: nextRoutePath });
    },
    next() {
      const nextRoutePath = `/nodes/${
        this.$page.posts.pageInfo.currentPage + 1
      }`;
      this.$router.push({ path: nextRoutePath });
    },
    prev() {
      const nextRoutePath = `/nodes/${
        this.$page.posts.pageInfo.currentPage - 1
      }`;
      this.$router.push({ path: nextRoutePath });
    },
    paginate(array, page_size, page_number) {
      return array.slice(
        (page_number - 1) * page_size,
        page_number * page_size
      );
    },
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
