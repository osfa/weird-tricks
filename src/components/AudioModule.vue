<template>
  <div class="audio-container"></div>
</template>

<script>
import * as Tone from "tone";
import { mapState } from "vuex";

export const random = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};
const INITIAL_FREQ = 2;
export default {
  name: "AudioModule",
  props: {
    automaticFade: { type: Boolean, default: false },
    debug: { type: Boolean, default: false },
    kioskMode: { type: Boolean, default: false },
  },
  data() {
    return {
      volume: -16,
      rainVolume: -5,
      leftEar: undefined,
      rightEar: undefined,
      binauralBeat: INITIAL_FREQ,
      audioCtx: undefined,
      crossFade: undefined,
      crossDirection: false,
      crossFadeInterval: undefined,
      rainMaker: undefined,
      tosPlayer: undefined,
      asmrChannel1: undefined,
      asmrChannel2: undefined,
      availableAsmr1: [
        require("~/assets/audio/tapping1.mp3"),
        require("~/assets/audio/tapping2.mp3"),
        require("~/assets/audio/tapping3.mp3"),
        require("~/assets/audio/server1.mp3"),
        require("~/assets/audio/server2.mp3"),
        require("~/assets/audio/rain1.mp3"),
        require("~/assets/audio/rain2.mp3"),
        require("~/assets/audio/rain3.mp3"),
        require("~/assets/audio/tiktock.mp3"),
      ],
      availableAsmr2: [
        require("~/assets/audio/cave.mp3"),
        require("~/assets/audio/war-propeller.mp3"),
        require("~/assets/audio/tropical.mp3"),
        require("~/assets/audio/wind1.mp3"),
        require("~/assets/audio/wind2.mp3"),
        require("~/assets/audio/airplane1.mp3"),
        require("~/assets/audio/airplane2.mp3"),
        require("~/assets/audio/ocean.mp3"),
        require("~/assets/audio/fireplace.mp3"),
      ],
      availableTos: [
        require("~/assets/audio/tos/homer-facebook.mp3"),
        require("~/assets/audio/tos/krusty-insta.mp3"),
        require("~/assets/audio/tos/scooby-facebook.mp3"),
        require("~/assets/audio/tos/shaggy-instagram.mp3"),
        require("~/assets/audio/tos/sponge-tos-complete.mp3"),
      ],
    };
  },
  computed: {
    ...mapState(["isMuted"]),
  },
  methods: {
    toggleAudio() {
      console.log("toggleAudio");

      if (!this.audioCtx) {
        this.initAudio();
        return;
      }

      if (this.audioCtx.state === "running") {
        this.audioCtx.suspend().then(function () {
          console.log("suspended audio");
        });
      } else if (this.audioCtx.state === "suspended") {
        this.audioCtx.resume().then(function () {
          console.log("resumed audio");
        });
      }
    },
    doCrossFade() {
      const stepSize = 0.2;
      if (this.crossFade.fade.value === 1.0 || this.crossFade.fade.value <= 0) {
        this.crossDirection = !this.crossDirection;
        if (this.crossFade.fade.value === 1.0) {
          this.asmrChannel1.load(this.availableAsmr1.sample());
        } else {
          this.asmrChannel2.load(this.availableAsmr2.sample());
        }
      }
      if (this.crossDirection) {
        const val = Math.min(
          parseFloat(this.crossFade.fade.value + stepSize),
          1
        );
        this.crossFade.fade.value = val;
      } else {
        const val = Math.max(
          parseFloat(this.crossFade.fade.value - stepSize),
          0
        );
        this.crossFade.fade.value = val;
      }
    },
    setVolume() {
      Tone.getDestination().volume.rampTo(
        this.volume === -100 ? -Infinity : this.volume,
        0
      );
    },
    setRainVolume() {
      let volume = this.rainVolume === -100 ? -Infinity : this.rainVolume;
      this.rainMaker.volume.value = volume;
    },
    setFrequencies() {
      const freqs = this.calculateFrequencies(this.binauralBeat);
      this.leftEar.frequency.value = freqs.leftFrequency;
      this.rightEar.frequency.value = freqs.rightFrequency;
    },
    frequencyShift() {
      this.binauralBeat = random(1, 6);
      const freqs = this.calculateFrequencies(this.binauralBeat);
      const rampSeconds = 60;
      this.leftEar.frequency.rampTo(freqs.leftFrequency, rampSeconds);
      this.rightEar.frequency.rampTo(freqs.rightFrequency, rampSeconds);
    },
    rainShift() {
      const rampSeconds = 15;
      const targetVolume = random(-6, 3);
      this.rainMaker.volume.rampTo(targetVolume, rampSeconds);
    },
    calculateCarrierFrequency(binauralBeat) {
      // Formula retrieved by using excel on Oster's curve. Can be enhanced with real maths ;)
      // y = -0,2085x2 + 18,341x + 56,31
      return (
        -0.2085 * Math.pow(binauralBeat, 2) + 18.341 * binauralBeat + 56.31
      );
    },
    calculateFrequencies(binauralBeat) {
      const carrierFreq = this.calculateCarrierFrequency(binauralBeat);
      return {
        leftFrequency: carrierFreq + binauralBeat / 2,
        rightFrequency: carrierFreq - binauralBeat / 2,
      };
    },
    handleFrequencyChange(actualFrequency) {
      const { leftFrequency, rightFrequency } =
        this.calculateFrequencies(actualFrequency);
    },
    initAudio() {
      const context = new Tone.Context();
      Tone.setContext(context);
      this.audioCtx = context.rawContext;

      const merge = new Tone.Merge().toDestination();

      this.leftEar = new Tone.Oscillator().connect(merge, 0, 0);
      this.rightEar = new Tone.Oscillator().connect(merge, 0, 1);

      this.rainMaker = new Tone.Noise("brown").toDestination();

      this.crossFade = new Tone.CrossFade().toDestination();
      this.crossFade.fade.value = 0.5; // 0-a

      this.asmrChannel1 = new Tone.Player(this.availableAsmr1.sample()).connect(
        this.crossFade.a
      );
      this.asmrChannel1.autostart = true;
      this.asmrChannel1.loop = true;
      this.asmrChannel1.volume.value = 12;

      this.asmrChannel2 = new Tone.Player(this.availableAsmr2.sample()).connect(
        this.crossFade.b
      );
      this.asmrChannel2.autostart = true;
      this.asmrChannel2.loop = true;
      this.asmrChannel2.volume.value = 6;
      this.crossFadeInterval = setInterval(this.doCrossFade, 5000);

      // TODO: load fix here

      const tosUrls = this.availableTos.reduce(
        (acc, curr) => ((acc[curr] = curr), acc),
        {}
      );

      const tosPlayer = new Tone.Players(tosUrls, () => {
        this.tosPlayer = tosPlayer;
        // this.tosPlayer.autostart = true;
        // this.tosPlayer.loop = false;
        this.tosPlayer.volume.value = 0;
        // this.fxSampler.volume.value = this.fxSamplerVolume;
      }).toDestination();

      // this.tosPlayer = new Tone.Player(
      //   this.availableTos.sample()
      // ).toDestination();
      // this.tosPlayer.autostart = true;
      // this.tosPlayer.loop = false;
      // this.tosPlayer.volume.value = 0;

      this.setRainVolume();
      this.setVolume();
      this.setFrequencies();

      this.leftEar.start();
      this.rightEar.start();
      this.rainMaker.start();
    },
  },
  watch: {
    "$store.state.currentBlockIdx": function () {
      if (!this.isMuted) {
        this.frequencyShift();
        this.rainShift();
        if (this.tosPlayer.state === "stopped" && random(0, 10) > 7) {
          // this.tosPlayer.load(this.availableTos.sample());
          this.tosPlayer.player(this.availableTos.sample()).start();
        }
      }
    },
    "$store.state.isMuted": function () {
      this.toggleAudio();
    },
  },
};
</script>
<style scoped></style>
