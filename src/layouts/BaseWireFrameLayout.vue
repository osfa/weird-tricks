<template>
  <v-app id="potatoe">
    <RegularNav></RegularNav>
    hello
    <slot />
  </v-app>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
import RegularNav from "~/components/RegularNav.vue";

export default {
  components: {
    RegularNav,
  },
};
</script>

<style></style>
