<template>
  <div class="clock-container font-weight-light">
    <div v-if="isUnixTime" class="clock-inner">
      <div class="hour" style="color: red">{{ postDate }}</div>
      <div class="hour text-black">{{ unix }}</div>
      <div class="hour" style="color: black">
        {{ this.$store.state.center.lat.toFixed(2) }}°,
        {{ this.$store.state.center.lng.toFixed(2) }}°
      </div>
    </div>
    <div v-else class="clock-inner">
      <div class="hour">{{ hours }}</div>
      <div class="dots">:</div>
      <div class="min">{{ minutes }}</div>
      <div class="dots">:</div>
      <div class="secs">{{ seconds }}</div>
      <div class="mode"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Clock",
  props: {
    isUnixTime: { type: Boolean, default: true },
  },
  data() {
    return {
      hours: 0,
      minutes: 0,
      seconds: 0,
      unix: "-",
    };
  },
  methods: {
    setTime() {
      setInterval(() => {
        const date = new Date();
        this.unix = Math.round(date.getTime() / 100);
        this.hours = date.getHours();
        this.minutes = this.checkSingleDigit(date.getMinutes());
        this.seconds = this.checkSingleDigit(date.getSeconds());
      }, 100);
    },
    checkSingleDigit(digit) {
      return ("0" + digit).slice(-2);
    },
  },
  computed: {
    ...mapState(["currentBlock"]),
    postDate() {
      if (this.currentBlock.date) {
        var date = new Date(this.currentBlock.date);
        return date.getTime().toString().slice(0, -2);
      } else {
        return "";
      }
    },
  },
  mounted() {
    this.setTime();
  },
};
</script>

<style>
.clock-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  flex-direction: column;
  z-index: 10;
  position: fixed;
  bottom: 68px;
  right: 20px;
  font-family: "Roboto";
  color: white;
  pointer-events: none;
}
.hour,
.min,
.secs,
.dots {
  font-size: 14.5px;
}
.clock-inner {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
