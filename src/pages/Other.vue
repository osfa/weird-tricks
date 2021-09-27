<template>
  <Layout>
    <div class="mx-auto">
      
      <v-card :loading="loading" class="my-6 mx-auto" max-width="374">

        <template slot="progress">
          <v-progress-linear
            color="deep-purple"
            height="10"
            indeterminate
          ></v-progress-linear>
        </template>

        <v-img height="250" :src="mainImageUrl"></v-img>
        <!-- <v-img height="250" src="~/imgs/image.png"></v-img>
      <g-image src="~/imgs/image.png" height="250" fluid /> -->
        <!-- <g-image :src="mainImageUrl" width="500" /> -->

        <v-card-title>{{ title }}</v-card-title>

        <v-card-text>
          <v-row align="center" class="mx-0">
            <v-rating
              :value="4.5"
              color="amber"
              dense
              half-increments
              readonly
              size="14"
            ></v-rating>

            <div class="grey--text ms-4">4.5 (413)</div>
          </v-row>

          <div class="my-4 text-subtitle-1">$ • Italian, Cafe</div>

          <div>
            Small plates, salads & sandwiches - an intimate setting with 12
            indoor seats plus patio seating.
          </div>
        </v-card-text>

        <v-divider class="mx-4"></v-divider>

        <v-card-title>Tonight's availability</v-card-title>

        <v-card-text>
          <v-chip-group
            v-model="selection"
            active-class="deep-purple accent-4 white--text"
            column
          >
            <v-chip>5:30PM</v-chip>

            <v-chip>7:30PM</v-chip>

            <v-chip>8:00PM</v-chip>

            <v-chip>9:00PM</v-chip>
          </v-chip-group>
        </v-card-text>

        <v-card-actions>
          <v-btn color="deep-purple lighten-2" text @click="reserve">
            Reserve
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </Layout>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    selection: 1,
    title: "Are advertisers coming for your dreams?",
    // http://localhost:8000/assets/static/src/imgs/image.png?width=831&height=250&key=92f33b1
    mainImageUrlRelative: "~/imgs/image.png",
    mainImageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Patates.jpg/1200px-Patates.jpg",
  }),

  methods: {
    reserve() {
      this.loading = true;
      setTimeout(() => (this.loading = false), 2000);
    },
  },
};
</script>
