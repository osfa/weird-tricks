<template>
  <Layout>
    <div style="pointer-events: auto">
      <h1>
        {{ $page.post.title }}
      </h1>
      <g-image
        :src="`${$page.post.heroImage.file.url}?fit=fill&w=1800&h=1200`"
      />
      <div v-html="content" />
    </div>
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
      body
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
