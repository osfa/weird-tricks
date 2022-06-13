<template>
  <v-card>
    <content-block />
    <v-card-title v-if="false" v-text="$page.post.title"></v-card-title>
    <v-card-text v-if="false">
      <node-dialog :iframe-url="hyperlink" />
    </v-card-text>
    <v-btn
      class="force-navigator"
      @click="forceNavigate"
      fab
      :color="randomMaterialColor()"
      dark
      left
      bottom
      absolute
    >
      <v-icon>{{ randomIcon() }}</v-icon>
    </v-btn>
    <v-card-actions>
      <v-flex class="text-right">
        <v-btn
          class="force-navigator"
          :color="randomMaterialColor()"
          text
          @click="forceNavigate"
        >
          <weird-text />
        </v-btn>
      </v-flex>
    </v-card-actions>
  </v-card>
</template>
<script>
import { random, randomIcon, randomMaterialColor } from "~/util";
import NodeDialog from "~/components/NodeDialog.vue";
import WeirdText from "~/components/WeirdText.vue";
import { cardMixin } from "~/cardMixin";
import ContentBlock from "~/components/ContentBlock.vue";

export default {
  components: { NodeDialog, WeirdText, ContentBlock },
  mixins: [cardMixin],
  props: {
    title: { type: String, default: "title" },
    heroImgUrl: { type: String, default: "" },
    hyperlink: { type: String },
  },
  data: () => ({
    isLoaded: false,
  }),
  methods: {
    onImgLoad() {
      console.log("onImgLoad");
      this.isLoaded = true;
    },
  },
};
</script>
