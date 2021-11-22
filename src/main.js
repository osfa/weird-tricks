// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

// v2.0
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import DefaultLayout from "~/layouts/Default.vue";

import Vuex from "vuex";
import colors from "vuetify/lib/util/colors";
import * as GmapVue from "gmap-vue";
import "~/assets/vue2-animate.min.css";

import { random } from "~/util";
Array.prototype.sample = function () {
  return this[Math.floor(Math.random() * this.length)];
};

export default function (Vue, { appOptions, head, router }) {
  head.link.push({
    rel: "stylesheet",
    href: "https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css",
  });

  head.link.push({
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900",
  });

  router.beforeEach((to, from, next) => {
    console.log("route switch before each");
    next();
  });

  const opts = {
    // theme: {
    //   themes: {
    //     light: {
    //       primary: colors.purple,
    //       secondary: colors.grey.darken1,
    //       accent: colors.red.accent3,
    //       error: colors.red.accent3,
    //     },
    //     dark: {
    //       primary: colors.blue.lighten3,
    //     },
    //   },
    // },
  }; //opts includes, vuetify themes, icons, etc.

  Vue.use(Vuex);

  appOptions.store = new Vuex.Store({
    state: {
      ctfBlocks: [],
      currentBlockIdx: 0,
      currentBlock: {},
      availableCoordinates: [],
      currentCoordinateIdx: 0,
      mapIdx: 0,
      center: { lat: 0.0, lng: 0.0 },
      isLoading: false,
      isCollapsed: false,
      allHidden: false,
      points: 0,
      jumps: 0,
    },
    mutations: {
      navigateForward(state) {
        state.currentBlockIdx =
          ++state.currentBlockIdx % state.ctfBlocks.length;
      },
      mapNav(state) {
        state.mapIdx += 1;
      },
      navigateBack(state) {
        if (--state.currentBlockIdx < 0)
          state.currentBlockIdx = state.ctfBlocks.length - 1;
        state.currentBlockIdx = state.currentBlockIdx % state.ctfBlocks.length;
      },
      setMainContent(state, payload) {
        state.ctfBlocks = payload;
      },
      setCurrentBlock(state, payload) {
        state.currentBlock = payload;
      },
      setCenter(state, payload) {
        state.center = payload;
      },
      setIsLoading(state, payload) {
        state.isLoading = payload;
      },
      addPoints(state) {
        state.points += state.points + random(0, 1000);
        state.jumps += 1;
      },
      toggleCollapse(state) {
        state.isCollapsed = !state.isCollapsed;
      },
      toggleHide(state) {
        state.allHidden = !state.allHidden;
      },
    },
  });

  Vue.use(Vuetify);
  Vue.use(GmapVue, {
    load: {
      key: process.env.GRIDSOME_MAPS_KEY,
      libraries: "drawing,visualization,geometry", // This is required if you use the Autocomplete plugin
      // OR: libraries: 'places,drawing'
      // OR: libraries: 'places,drawing,visualization'
      // (as you require)

      //// If you want to set the version, you can do so:
      // v: '3.26',
    },

    //// If you intend to programmatically custom event listener code
    //// (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
    //// instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
    //// you might need to turn this on.
    // autobindAllEvents: false,

    //// If you want to manually install components, e.g.
    //// import {GmapMarker} from 'vue2-google-maps/src/components/marker'
    //// Vue.component('GmapMarker', GmapMarker)
    //// then set installComponents to 'false'.
    //// If you want to automatically install all the components this property must be set to 'true':
    installComponents: true,
  });

  Vue.component(
    "ground-overlay",
    GmapVue.MapElementFactory({
      mappedProps: {
        opacity: {},
      },
      props: {
        source: { type: String },
        bounds: { type: Object },
      },
      events: ["click", "dblclick"],
      name: "groundOverlay",
      ctr: () => window.google.maps.GroundOverlay,
      ctrArgs: (options, { source, bounds }) => [source, bounds, options],
    })
  );
  Vue.component("google-kml-layer", GmapVue.KmlLayer);

  appOptions.vuetify = new Vuetify(opts);

  // Set default layout as a global component
  Vue.component("Layout", DefaultLayout);
}

import Vue from "vue";
