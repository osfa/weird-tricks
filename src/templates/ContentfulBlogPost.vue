<template>
  <Layout>
    <v-container
      class="pt-lg-16"
      style="max-width: 50vw; pointer-events: auto; position: relative"
    >
      <v-card>
        <v-img
          :src="`${$page.post.heroImage.file.url}?fit=fill&w=1800&h=1200`"
          class="white--text align-end"
          height="600px"
        >
        </v-img>
        <v-card-title v-text="$page.post.title"></v-card-title>

        <v-card-text v-if="false" v-html="content" />

        <v-btn
          fab
          color="blue accent-2"
          dark
          bottom
          right
          absolute
          :href="$page.post.hyperlink"
          target="_blank"
        >
          <v-icon>mdi-link</v-icon>
        </v-btn>

        <v-card-actions v-if="false">
          <v-flex class="text-right">
            <v-btn
              color="blue"
              text
              :href="$page.post.hyperlink"
              target="_blank"
            >
              Learn more
            </v-btn>
          </v-flex>
        </v-card-actions>
      </v-card>
    </v-container>
  </Layout>
</template>

<page-query>
  query Post($path: String!) {
    post: contentfulBlogPost(path: $path) {
      title,
      heroImage {
        file {
          url
        }
      },
      body,
      hyperlink
    }
  }
</page-query>

<script>
import MarkdownIt from "markdown-it";

export default {
  metaInfo() {
    return {
      title: this.$page.post.title,
    };
  },
  computed: {
    content() {
      const md = new MarkdownIt();
      return md.render(this.$page.post.body);
    },
  },
};
</script>
