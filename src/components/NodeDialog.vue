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
      <v-btn
        style="z-index: 50; pointer-events: auto"
        :style="isFixed ? 'bottom: 120px;' : ''"
        :color="isFixed ? 'yellow darken-2' : 'primary'"
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
