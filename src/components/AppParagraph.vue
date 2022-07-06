<template>
  <div class="paragraph">
    <div class="paragraph__line-wrapper">
      <div
        :class="{ 'paragraph__line--show': show }"
        class="paragraph__line"
      ></div>
    </div>
    <div class="paragraph__text-wrapper">
      <p :class="{ 'paragraph__text--show': show }" class="paragraph__text">
        {{ getCurrentSlide.description }}
      </p>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      show: (state) => state.sliderModule.show,
    }),
    ...mapGetters({
      getCurrentSlide: "sliderModule/getCurrentSlide",
    }),
  },
};
</script>
<style lang="scss">

.paragraph {
  display: flex;
  &__line-wrapper {
    width: 50px;
    padding-top: 10px;
    margin-right: 20px;
  }
  &__line {
    width: 0;
    height: 2px;
    background: #f37a1f;
    transition: 1s ease-in;

    &--show {
      width: 100%;
    }
  }

  &__text-wrapper {
    width: 560px;
    position: relative;
    overflow: hidden;
  }

  &__text {
    position: relative;
    left: -100%;
    font-family: "Montserrat-Regular";
    font-size: 18px;
    color: #898989;
    transition: 1s ease-in;
    &--show {
      left: 0;
    }
  }
}
</style>
