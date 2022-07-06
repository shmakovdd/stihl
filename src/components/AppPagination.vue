<template>
  <div class="pagination">
    <transition
    appear name="pagination__current-page"
    mode="out-in"
    >
    <div v-show="show" class="pagination__current-page">{{getSlideNum}}</div>
    </transition>
    <div class="pagination__separator"></div>
    <div class="pagination__all-pages">{{ getSlidesLength }}</div>
  </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      slides: (state) => state.sliderModule.slides,
      show: state => state.sliderModule.show
    }),
    ...mapGetters({
      getCurrentSlideIndex: "sliderModule/getCurrentSlideIndex",
    }),
    getSlidesLength() {
      let num = String(this.slides.length);
      num = num.split("").length > 1 ? num : `0${num}`;
      return num;
    },
    getSlideNum() {
      let num = String(this.getCurrentSlideIndex + 1);
      num = num.split("").length > 1 ? num : `0${num}`;
      return num;
    },
  },
};
</script>
<style lang="scss" scoped>
.pagination {
  font-family: "Montserrat-Bold";
  overflow: hidden;
  width: 50px;
  position: absolute;
  right: 25px;
  bottom: 12%;
  &__current-page,
  &__all-pages {
    writing-mode: vertical-rl;
  }
  &__separator {
    background: #f5f5f5;
    height: 4px;
    margin: 10px auto;
  }
  &__current-page {
    font-size: 48px;
    position: relative;
    color: #121212;
    left: 0;
    transition: 1s ease-out;
    &-enter-from, &-leave-to {
      left: 150%;
    }
  }
  &__all-pages {
    color: #f5f5f5;
    font-size: 24px;
    margin-left: auto;
  }
}
</style>
