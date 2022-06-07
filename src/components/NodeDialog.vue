<template>
  <v-dialog
    eager
    height="100vh"
    scrollable
    v-model="dialog"
    class="fill-height"
    max-width="1200"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-fab-transition>
        <v-btn
          v-if="!linkText"
          style="z-index: 1500; pointer-events: auto"
          :style="isFixed ? 'bottom: 72px;' : ''"
          :color="isFixed ? 'red' : 'primary'"
          :elevation="3"
          x-large
          dark
          v-bind="attrs"
          v-on="on"
          :fixed="isFixed"
          right
          mt-2
        >
          <v-icon>mdi-link</v-icon>
        </v-btn>
        <a
          v-if="linkText"
          style="z-index: 1500; pointer-events: auto"
          v-bind="attrs"
          v-on="on"
          class="d-flex text-caption text-sm-button"
        >
          <v-icon class="mr-1" small color="#0000ff">mdi-link</v-icon
          ><span class="text-decoration-underline"> {{ linkText }}</span>
        </a>
      </v-fab-transition>
    </template>

    <v-card>
      <iframe
        id="ifrm"
        :src="iframeSrc"
        style="height: 100vh; width: 100%"
      ></iframe>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="dialog = false"> I Accept </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import WeirdText from "../components/WeirdText.vue";

export default {
  components: {
    WeirdText,
  },
  props: {
    linkText: { type: String },
    isFixed: { type: Boolean, default: false },
    iframeUrl: { type: String, default: "http://www.dn.se" },
  },
  data: () => ({
    dialog: false,
  }),
  computed: {
    iframeSrc() {
      return this.iframeUrl === "null" ? "http://www.dn.se" : this.iframeUrl;
    },
  },
  methods: {},
};
</script>
<style scoped>
.v-application a {
  color: blue !important;
}
</style>
