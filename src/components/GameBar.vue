<template>
  <div class="d-flex flex-row align-center justify-center">
    <h2 class="mr-2">
      <animated-number
        :value="points"
        :duration="1000"
        :formatValue="formatToPrice"
      />
    </h2>
    <v-rating
      v-if="false"
      v-model="jumps"
      :background-color="randomMaterialColor()"
      :color="randomMaterialColor()"
      large
      :length="5"
    ></v-rating>
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
import { mapState } from "vuex";
import AnimatedNumber from "animated-number-vue";

export default {
  mixins: [cardMixin],
  components: { WeirdText, AnimatedNumber },
  props: {},
  data() {
    return {
      starCount: 0,
      availableStars: 20,
    };
  },
  methods: {
    formatToPrice(value) {
      return `${value.toFixed()}`;
    },
  },
  watch: {},
  computed: {
    ...mapState(["points", "jumps"]),
  },
};
</script>
