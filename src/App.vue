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
}
</static-query>

<page-query>
  query Posts($page: Int) { posts: allContentfulBlogPost(sortBy: "date", order:
  DESC, perPage: 200, page: $page) @paginate { totalCount pageInfo { totalPages
  currentPage } edges { node { id title slug date(format:
  "MMMM D, Y") } } } }
</page-query>

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
    forceNav() {
      console.log("forceNav main");

      // @TODO NEED ROUTES FROM CTF?
      // READ idx? nav?

      const routes = ["/about", "/blog", "/other", "/"];
      let nextRoutePath = routes[Math.floor(Math.random() * routes.length)];
      while (nextRoutePath === this.$route.path) {
        nextRoutePath = routes[Math.floor(Math.random() * routes.length)];
      }

      this.$router.push({ path: nextRoutePath });
    },
    navigateForward() {
      console.log("navigateForward");
      this.$store.commit("navigateForward");
      console.log(this.$store.state.currentBlockIdx);
      // trigger forceNav? based on watch? state?
    },
    navigateBack() {
      console.log("navigateBack");
      this.$store.commit("navigateBack");
      console.log(this.$store.state.currentBlockIdx);
      // trigger forceNav? based on watch? state?
    },
    nav(e) {
      switch (e.keyCode) {
        case 37: // left
          this.forceNav();
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
