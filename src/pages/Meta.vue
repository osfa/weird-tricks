<template>
  <Layout>
    <v-container
      v-show="!allHidden"
      class="fill-height fluid"
      style="position: relative"
      :style="[
        {
          zIndex: 100, // below or above clouds
        },
      ]"
    >
      <v-card class="mx-auto scroll mt-2 mt-md-6" style="pointer-events: auto">
        <v-card-title>
          <a href="export-2022-06-14T10-24-01.json" target_="_blank"
            >export-2022-06-14T10-24-01.json</a
          >
        </v-card-title>
        <v-card-text style="pointer-events: auto">
          <div v-for="item in this.items" :key="item.node.title">
            <div>{{ item.node.title }}</div>
            <div>{{ item.node.name }}</div>
            <a v-if="item.node.hyperlink && item.node.hyperlink !== 'null'">
              {{ item.node.hyperlink }}
            </a>
            <div v-else :href="item.node.hyperlink">
              {{ item.node.hyperlink }}
            </div>
            <a v-if="item.node.hyperlink && item.node.archiveLink !== 'null'">
              {{ item.node.archiveLink }}
            </a>
            <div v-else :href="item.node.archiveLink">
              {{ item.node.archiveLink }}
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-container>
  </Layout>
</template>
<static-query>
  query {
    metadata {
      siteName
      siteDescription
    }
    nodes: allContentfulNode(sortBy: "published_at", order: DESC) {
      edges {
        node {
          title,
          name,
          hyperlink,
          archiveLink,
          date,
          heroImage {
            file {
              url
            }
          },
        }
      }
    }
  }
</static-query>
<script>
import { mapState } from "vuex";

export default {
  components: {},
  data: () => ({
    items: [],
  }),
  mounted() {
    this.items = this.$static.nodes.edges.filter((post) => {
      return post.node.hyperlink && post.node.hyperlink != "null";
    });
    this.$store.commit("setCurrentBlock", {});
  },
  computed: {
    ...mapState(["allHidden"]),
  },
};
</script>
