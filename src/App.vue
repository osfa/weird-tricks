<template>
  <MainLayout>
    <v-app id="app">
      <RegularNav @force-nav="forceNav" style="z-index: 10"></RegularNav>
      <transition mode="out-in" appear name="bounceLeft">
        <router-view @force-nav="forceNav" style="animation-duration: 250ms" />
      </transition>
      <FooterNav app style="z-index: 10" />
    </v-app>
  </MainLayout>
</template>

<static-query>
  query {
    metadata {
      siteName
      siteDescription
    }
    blogPosts: allContentfulBlogPost(sortBy: "published_at", order: DESC) {
      edges {
        node {
          id
          title
          slug
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
import MainLayout from "~/layouts/Main.vue";
import RegularNav from "~/components/nav/RegularNav.vue";
import FooterNav from "~/components/nav/FooterNav.vue";

export default {
  components: {
    MainLayout,
    RegularNav,
    FooterNav,
  },
  data: () => ({}),
  metaInfo() {
    return {
      title: this.$static.metadata.siteName,
      meta: [
        {
          key: "description",
          name: "description",
          content: this.$static.metadata.siteDescription,
        },
      ],
    };
  },
  methods: {
    forceNav(backwards) {
      console.log("forceNav main");

      // watch this.$store.state.currentBlockIdx instead?
      if (backwards) {
        this.navigateBack();
      } else {
        this.navigateForward();
      }

      // dont need main layout load?
      let nextPost =
        this.$static.blogPosts.edges[this.$store.state.currentBlockIdx];

      // const routes = ["/about", "/blog", "/other", "/"];
      // let nextRoutePath = routes[Math.floor(Math.random() * routes.length)];
      // while (nextRoutePath === this.$route.path) {
      //   nextRoutePath = routes[Math.floor(Math.random() * routes.length)];
      // }

      let nextRoutePath = `/blog/${nextPost.node.slug}`;
      this.$router.push({ path: nextRoutePath });
    },
    navigateForward() {
      console.log("navigateForward");
      this.$store.commit("navigateForward");
      console.log(this.$store.state.currentBlockIdx);
    },
    navigateBack() {
      console.log("navigateBack");
      this.$store.commit("navigateBack");
      console.log(this.$store.state.currentBlockIdx);
    },
    nav(e) {
      switch (e.keyCode) {
        case 37: // left
          this.forceNav(true);
          break;
        case 39: // right
          this.forceNav();
          break;
      }
    },
  },
  created: function () {
    window.addEventListener("keyup", this.nav);
  },
  destroyed: function () {
    window.removeEventListener("keyup", this.nav);
  },
  //   beforeRouteLeave(to, from, next) {
  //     console.log("main route leave");
  //     // called when the route that renders this component is about to
  //     // be navigated away from.
  //     // has access to `this` component instance.
  //     next();
  //   },
};
</script>

<style></style>
