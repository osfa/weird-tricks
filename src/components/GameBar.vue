<template>
  <div class="d-flex flex-row align-center">
    <h2 class="mr-2">{{ points }}</h2>
    <v-rating
      v-model="stars"
      :background-color="randomMaterialColor()"
      :color="randomMaterialColor()"
      large
      :length="stars + 30"
    ></v-rating>
    <!-- empty-icon="$mdiStarOutline"
    full-icon="$mdiStar"
    half-icon="$mdiStarHalfFull" -->
  </div>
</template>

<script>
import {
  random,
  randomIcon,
  randomMaterialColor,
  randomAnimation,
  randomElevation,
  randomText,
} from "~/util";
import WeirdText from "~/components/WeirdText.vue";
import { cardMixin } from "~/cardMixin";

export default {
  mixins: [cardMixin],
  components: { WeirdText },
  props: {},
  data() {
    return {
      starCount: 0,
      availableStars: 20,
      // points: 1000,
    };
  },
  methods: {},
  watch: {},
  computed: {
    points() {
      return this.$store.state.points;
    },
    stars() {
      return this.$store.state.jumps;
    },
  },
};
</script>
