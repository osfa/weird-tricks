<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="720">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          :color="randomMaterialColor()"
          :elevation="randomElevation()"
          v-bind="attrs"
          v-on="on"
        >
          <weird-text />
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="text-h5">
          Use Google's location service?
        </v-card-title>
        <v-card-text
          >Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="forceNavigate()">
            <weird-text />
          </v-btn>
          <v-btn color="green darken-1" text @click="forceNavigate()">
            <weird-text />
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import WeirdText from "~/components/WeirdText.vue";
import {
  randomMaterialColor,
  randomIcon,
  random,
  randomElevation,
} from "~/util";
import { cardMixin } from "~/cardMixin";

export default {
  components: { WeirdText },
  mixins: [cardMixin],
  data() {
    return {
      dialog: false,
    };
  },
  methods: {},
};
</script>
