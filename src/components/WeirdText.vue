<template>
  <span>{{ generateChars() }}</span>
</template>
<script>
import randomWords from "random-words";
import { random, randomClickBait, randomText } from "~/util";

export default {
  props: {
    minLength: { type: Number, default: 2 },
    maxLength: { type: Number, default: 4 },
    type: "sentence", // link, short-link, paragraph
  },
  methods: {
    generateText() {
      return randomWords({
        min: this.minLength,
        max: this.maxLength,
        join: " ",
      });
    },
    generateChars() {
      // Math.random().toString(36).substring(2, 15) +
      //  Math.random().toString(36).substring(2, 15);
      const chars = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"];
      const charCount = 5;
      return [...Array(charCount)].map(
        (i) => chars[(Math.random() * chars.length) | 0]
      ).join``;
    },
    generateTextType() {
      return randomText({
        type: "sentence",
        length: 2,
      });
    },
  },
};
</script>
