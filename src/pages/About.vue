<template>
  <Layout>
    <v-container
      class="fill-height fluid"
      style="position: relative"
      :style="[
        {
          zIndex: 100, // below or above clouds
        },
      ]"
    >
      <v-card class="mx-auto scroll" max-width="600" max-height="80vh">
        <v-card-text>
          <div>About</div>
          <p class="text-h4 text--primary">re•al•i•ty•har•vest•er</p>
          <p>noun</p>
          <div class="text--primary">
            <p>
              Reality Harvester is a monument erected for a
              <a
                target="_blank"
                href="https://kkh.se/en/research/research-and-development/"
                >research project</a
              >
              conducted under a pandemic in a world with increasingly torn map
              territory relations.
            </p>
            <p>
              It is an extension of the reality collage we all make as we try to
              fill in the blanks and draw connections between memetic headlines,
              image macros and rotted hyperlinks, all semblances of context
              slowly fading.
            </p>
            <p>
              As more and more data is harvested it begins to occlude reality
              and a slow, roiling data fog settles in. Metrics and KPIs start to
              dictate reality rather than predict it, acting as fuel for neural
              networks reflecting the past into the future. Data as masking
              reality. Data as your boss.
            </p>
            <!-- <p>
              It has become increasingly difficult to know if you’re in a hall
              of mirrors, Plato’s cave, a casino or a combination of the three.
            </p> -->
            <p>
              “We live in a world where there is more and more information, and
              less and less meaning”.
            </p>
          </div>
        </v-card-text>
        <v-card-subtitle align="right">
          <p>
            Jacob Broms Engblom, Lisa Trogen Devgun, Amy Boulton, Benj Gerdes
          </p>
        </v-card-subtitle>
      </v-card>
    </v-container>
  </Layout>
</template>
<script>
export default {
  components: {},
  data: () => ({}),
  async mounted() {},
  methods: {},
};
</script>
