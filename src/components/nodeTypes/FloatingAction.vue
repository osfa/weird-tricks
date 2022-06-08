<template>
  <v-container
    class="fill-height fluid"
    style="position: relative"
    :style="[
      {
        zIndex: 10, // below or above clouds
      },
    ]"
  >
    <v-row>
      <v-col cols="12" sm="12" md="6" offset-md="3">
        <v-card>
          <v-toolbar extended>
            <v-app-bar-nav-icon @click="forceNavigate()"></v-app-bar-nav-icon>
            <template v-slot:extension>
              <v-fab-transition>
                <v-btn
                  v-show="!hidden"
                  color="pink"
                  fab
                  dark
                  small
                  absolute
                  bottom
                  left
                  @click="forceNavigate()"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </v-fab-transition>
            </template>
          </v-toolbar>
          <v-card-text style="height: 300px" class="grey lighten-5 text-center">
            Maecenas faucibus mollis interdum. Maecenas faucibus mollis
            interdum. Cras mattis consectetur purus sit amet fermentum. Cras
            justo odio, dapibus ac facilisis in, egestas eget quam. Duis mollis,
            est non commodo luctus, nisi erat porttitor ligula, eget lacinia
            odio sem nec elit. Aenean lacinia bibendum nulla sed consectetur.
            Aenean lacinia bibendum nulla sed consectetur. Integer posuere erat
            a ante venenatis dapibus posuere velit aliquet. Aenean lacinia
            bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
            scelerisque nisl consectetur et. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Etiam porta sem malesuada magna mollis
            euismod. Nullam id dolor id nibh ultricies vehicula ut id elit.
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Etiam porta sem malesuada magna mollis euismod. Cras mattis
            consectetur purus sit amet fermentum. Sed posuere consectetur est at
            lobortis. Nullam quis risus eget urna mollis ornare vel eu leo.
            Nullam quis risus eget urna mollis ornare vel eu leo.
            <v-btn color="primary" @click="hidden = !hidden">
              {{ hidden ? "Show" : "Hide" }}
            </v-btn>
          </v-card-text>
          <v-card-text style="height: 100px; position: relative">
            <v-fab-transition>
              <v-btn
                v-show="!hidden"
                color="pink"
                dark
                absolute
                top
                right
                fab
                @click="forceNavigate()"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-fab-transition>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { cardMixin } from "~/cardMixin";

export default {
  mixins: [cardMixin],
  data: () => ({
    hidden: false,
  }),
};
</script>
