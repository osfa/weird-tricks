<template>
  <Layout>
<div id="example-2">

      <button @click="show = !show">Toggle show</button>
        <transition appear name="bounce">
          <p v-if="show">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris facilisis enim libero, at lacinia diam fermentum id. Pellentesque habitant morbi tristique senectus et netus.</p>
        </transition>
      </div>
      
      <!-- Learn how to use images here: https://gridsome.org/docs/images -->
      <!-- <g-image alt="Example image" src="~/favicon.png" width="135" /> -->

      <!-- <h1>Hello, world!</h1> -->
      <v-app>
        <v-avatar
        color="primary"
        size="56"
        >VJ</v-avatar>
        <v-alert
        color="green"
        outlined
        type="success"
        >weee</v-alert>
        <v-btn
        color="primary"
        elevation="2"
        >go</v-btn>
        <v-alert
        color="orange"
        type="error"
        >asfasfsa</v-alert>

        <v-menu transition="slide-x-transition">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
            color="primary"
            class="ma-2"
            v-bind="attrs"
            v-on="on"
            >
            Slide X Transition
          </v-btn>
        </template>
        <v-list>
          <v-list-item
          v-for="n in 5"
          :key="n"
          link
          >
          <v-list-item-title v-text="'Item ' + n"></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
</v-app>
</Layout>
</template>

<script>
  export default {
    metaInfo: {
      title: 'Hello, world!'
    },
    data: function () {
      return {
        show: true
      }
    },
  }
</script>

<style>
  .home-links a {
    margin-right: 1rem;
  }
  .bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
