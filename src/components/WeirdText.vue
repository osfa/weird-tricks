<template>
  <span>{{ generateTextType() }}</span>
</template>
<script>
import { random, randomText } from "~/util";

export default {
  props: {
    minLength: { type: Number, default: 2 },
    maxLength: { type: Number, default: 4 },
    type: "sentence", // link, short-link, sentence, complete_line, paragraph, // tempereature settings as well?
  },
  methods: {
    generateTextType() {
      return randomText({
        type: "clickbait",
        length: random(20, 40), // pass sentence here as well?
      });
    },
  },
};
</script>
