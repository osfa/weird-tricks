<template>
  <div class="cloud-model-container"></div>
</template>

<script>
export default {
  components: {},
  data: () => ({}),
};
</script>

<style>
.cloud-model-container {
  z-index: 1;
  justify-self: center;
  width: 100%;
  height: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 2;
  overflow: hidden;
}
</style>
