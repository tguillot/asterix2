<template>
    <div id="timeSlider"></div>
</template>

<script>
import { initializeTimeSlider } from "../esri/TimeSlider";


export default {
  name: "time-slider",

  mounted() {
  //  initializeTimeSlider();
      },
};
</script>

<style scoped>
#timeSlider {
  position: absolute;
  left: 5%;
  right: 5%;
  bottom: 20px;
}

</style>
