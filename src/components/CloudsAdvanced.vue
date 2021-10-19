<template>
  <div id="cloud_overlay">
    <div class="cloud-container">
      <div class="cloud" id="cloud-base"></div>
      <div class="cloud" id="cloud-back"></div>
      <div class="cloud" id="cloud-mid"></div>
      <div class="cloud" id="cloud-front"></div>
    </div>
    <svg width="0" height="0">
      <!--Top Layer-->
      <filter id="filter-base">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.011"
          numOctaves="5"
          seed="8517"
        />
        <feDisplacementMap in="SourceGraphic" scale="120" />
      </filter>
      <filter id="filter-back">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.011"
          numOctaves="3"
          seed="8517"
        />
        <feDisplacementMap in="SourceGraphic" scale="120" />
      </filter>
      <filter id="filter-mid">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.011"
          numOctaves="3"
          seed="8517"
        />
        <feDisplacementMap in="SourceGraphic" scale="120" />
      </filter>
      <filter id="filter-front">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.009"
          numOctaves="4"
          seed="8517"
        />
        <feDisplacementMap in="SourceGraphic" scale="50" />
      </filter>
    </svg>
  </div>
</template>

<script>
export default {
  data: () => ({}),
};
</script>

<style>
#cloud_overlay {
  pointer-events: none;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  /* background: blue; need sky? */
  z-index: 1000;
}
.cloud-container {
  box-shadow: 0 7px 8px -4px rgba(0, 0, 0, 0.2),
    0 12px 17px 2px rgba(0, 0, 0, 0.14), 0 5px 22px 4px rgba(0, 0, 0, 0.12) !important;
}
.cloud {
  width: 600px;
  height: 100px;
  border-radius: 50%;
  position: absolute;
  top: -100px;
  left: -100px;
}

#cloud-base {
  top: 90px;
  height: 100px;
  filter: url(#filter-base);
  box-shadow: 200px 170px 19px 40px rgba(255, 255, 255, 0.9);
}
#cloud-back {
  top: 90px;
  height: 30px;
  width: 500px;
  filter: url(#filter-back);
  box-shadow: 200px 200px 10px 40px rgba(215, 215, 215, 0.3);
}

#cloud-mid {
  top: 80px;
  width: 580px;
  height: 35px;
  filter: url(#filter-mid);
  box-shadow: 210px 250px 28px 30px rgba(66, 105, 146, 0.2);
}

#cloud-front {
  top: 70px;
  width: 450px;
  height: 40px;
  left: -20px;
  filter: url(#filter-front);
  box-shadow: 210px 272px 30px 0px rgba(0, 0, 0, 0.4);
}
</style>
