<template>
  <MainLayout>
    <v-app id="app">
      <RegularNav @force-nav="forceNav" style="z-index: 10"></RegularNav>
      <transition mode="out-in" appear name="bounceLeft">
        <router-view @force-nav="forceNav" style="animation-duration: 250ms" />
      </transition>
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

<script>
import MainLayout from "~/layouts/Main.vue";
import RegularNav from "~/components/RegularNav.vue";

export default {
  components: {
    MainLayout,
    RegularNav,
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
      // mutate state here?

      // watch in components and cchange colors in nav
      // watch in components and change  map based on that

      // play sound

      const routes = ["/about", "/blog", "/other", "/"];
      let nextRoutePath = routes[Math.floor(Math.random() * routes.length)];
      while (nextRoutePath === this.$route.path) {
        nextRoutePath = routes[Math.floor(Math.random() * routes.length)];
      }
      //   console.log(this.$route.path);
      this.$router.push({ path: nextRoutePath });
    },
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
