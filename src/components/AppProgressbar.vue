<template>
  <div :class="{ 'progress-bar__active--reverse': show && (index === getCurrentSlideIndex)}" class="progress-bar">
    <div class="progress-bar__inner" :data-index="index"></div>
  </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
export default {
  props: ['index'],
  computed: {
    ...mapState({
      show: (state) => state.sliderModule.show,
    }),
    ...mapGetters({
      getCurrentSlideIndex: 'sliderModule/getCurrentSlideIndex'
    })
  },
};
</script>
<style lang="scss">
.progress-bar {
  height: 8px;
  background: #f1ebe8;
  border-right: 7px solid $main-color;
  &__inner {
    height: 100%;
    background: $main-color;
    width: 100%;
    transform: scaleX(0);
    transform-origin: 100% 0;
    transition: transform 1.5s linear;
  }
  &__active--reverse &__inner {
    transform-origin: 0 0;
    transition: transform 8s linear;
    transform: scaleX(1);
  }
}
</style>
