<template>
  <div class="clock-container font-weight-light">
    <div v-if="isUnixTime" class="clock-inner">
      <div class="hour">{{ unix }}</div>
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
        this.unix = Math.round(date.getTime() / 1000);
        this.hours = date.getHours();
        this.minutes = this.checkSingleDigit(date.getMinutes());
        this.seconds = this.checkSingleDigit(date.getSeconds());
      }, 1000);
    },
    checkSingleDigit(digit) {
      return ("0" + digit).slice(-2);
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
  z-index: 1000;
  position: fixed;
  bottom: 80px;
  right: 130px;
  font-family: "Roboto";
  color: white;
}
.hour,
.min,
.secs,
.dots {
  font-size: 24px;
}
.clock-inner {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
