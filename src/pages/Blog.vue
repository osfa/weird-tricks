<template>
  <Layout>
    <!-- 
      <section v-if="$page">
      <ul>
        <li v-for="{ node } in $page.posts.edges" :key="node.id">
          <h2>
            <g-link :to="`blog/${node.slug}`">{{ node.title }}</g-link>
          </h2>
          <div>
            <span>{{ node.date }}</span>
            <span> &middot; </span>
            <span>{{ node.timeToRead }} min read</span>
          </div>
          <div>{{ node.excerpt }}</div>
          <div>
            <g-link :to="`blog/${node.slug}`">Read More</g-link>
          </div>
        </li>
      </ul>
      <pager
        v-if="$page.posts.pageInfo.totalPages > 1"
        :info="$page.posts.pageInfo"
      />
    </section> 
    -->
    <!-- <v-card max-width="900" class="mx-auto"> -->

    <v-container class="pt-lg-16" style="max-width: 900px; position: relative">
      <v-row dense>
        <v-col v-for="{ node } in $page.posts.edges" :key="node.id" :cols="3">
          <g-image v-if="false" :src="node.heroImage.file.url" />

          <v-card :to="`/blog/${node.slug}`" style="pointer-events: auto">
            <v-img
              :src="node.heroImage.file.url"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            >
              <v-card-title v-text="node.title"></v-card-title>
            </v-img>

            <v-card-text>
              Nullam id dolor id nibh ultricies vehicula ut id elit. Aenean eu
              leo quam. Pellentesque ornare sem lacinia quam venenatis
              vestibulum. Donec sed odio dui. Vivamus sagittis lacus vel augue
              laoreet rutrum faucibus dolor auctor.
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-bookmark</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-share-variant</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- </v-card> -->
    <v-container v-if="false">
      <v-row dense>
        <v-col v-for="card in cards" :key="card.title" :cols="card.flex">
          <v-card>
            <v-img
              :src="card.src"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            >
              <v-card-title v-text="card.title"></v-card-title>
            </v-img>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-bookmark</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-share-variant</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </Layout>
</template>

<page-query>
query Posts($page: Int) { 
  posts: allContentfulBlogPost(sortBy: "date", order: DESC, perPage: 200, page: $page) 
  @paginate { 
    totalCount pageInfo 
    { totalPages currentPage } 
    edges { 
        node { 
          id 
          title 
          slug 
          date(format: "MMMM D, Y")
          heroImage {
            file {
              url
            }
          }
        } 
    } 
  } 
}
</page-query>

<script>
import { Pager } from "gridsome";

export default {
  metaInfo: {
    title: "Idx",
  },
  components: {
    Pager,
  },
  data: () => ({
    cards: [
      {
        title: "Pre-fab homes",
        src: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
        flex: 12,
      },
      {
        title: "Favorite road trips",
        src: "https://cdn.vuetifyjs.com/images/cards/road.jpg",
        flex: 6,
      },
      {
        title: "Best airlines",
        src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
        flex: 6,
      },
    ],
  }),
};
</script>
