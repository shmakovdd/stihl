<template>
  <div class="slider">
    <div class="slider__content">
      <div
        v-for="(row, index) of getCurrentSlide.rows"
        :key="index"
        class="slider__span-wrapper"
      >
        <div ref="text" class="slider__span-text">
          {{ row }}
        </div>
        <div ref="fill" class="slider__span-fill"></div>
      </div>
      <app-paragraph class="slider__paragraph" />
      <transition appear name="slider__button" mode="out-in">
        <app-button v-show="show" class="slider__button" />
      </transition>
    </div>
    <div class="slider__orangeback">
      <transition appear name="slider__flip-text" mode="out-in"
        ><div class="slider__flip-text" v-if="show">
          {{ this.getCurrentSlide.title }}
        </div></transition
      >
      <transition appear name="slider__image-wrapper" mode="out-in">
        <div v-show="show" class="slider__image-wrapper">
          <img
            class="slider__image"
            :src="require(`../assets/images/${getCurrentSlide.image}.png`)"
          />
        </div>
      </transition>
    </div>
    <app-pagination class="slider__pagination" />
    <app-switcher @changeSlide="changeSlide" class="slider__switcher" />
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapState } from "vuex";
import AppButton from "@/components/UI/AppButton.vue";
import AppParagraph from "@/components/AppParagraph.vue";
import AppSwitcher from "@/components/AppSwitcher.vue";
import AppPagination from "@/components/AppPagination.vue";
export default {
  components: {
    AppParagraph,
    AppSwitcher,
    AppPagination,
    AppButton,
  },

  data() {
    return {
      interval: null,
      animationTime: 1000,
      sliderShowTime: 8000,
      resetTime: 1500,
    };
  },

  computed: {
    ...mapGetters({
      getCurrentSlide: "sliderModule/getCurrentSlide",
      getCurrentSlideIndex: "sliderModule/getCurrentSlideIndex",
    }),
    ...mapState({
      show: (state) => state.sliderModule.show,
      slides: (state) => state.sliderModule.slides,
    }),
  },
  watch: {
    show() {
      this.animateText();
    },
  },
  methods: {
    ...mapMutations({
      setShow: "sliderModule/setShow",
      setCurrentSlideIndex: "sliderModule/setCurrentSlideIndex",
    }),
    animateText() {
      console.log(this.$refs.text);
      Array.from(this.$refs.text).reduce((prev, current) => {
        setTimeout(() => {
          if (this.show) {
            current.classList.add("slider__span-text--show");
          } else {
            current.classList.remove("slider__span-text--show");
          }
        }, prev);
        return (prev += 200);
      }, 500);
      this.$refs.fill.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add("slider__span-fill--show");
          setTimeout(() => {
            item.classList.remove("slider__span-fill--show");
          }, this.animationTime);
        }, index * 200);
      });
    },

    changeSlide(data) {
      if (data.isDirty) {
        this.findBarWithIndex();
        this.clearSlide();
        this.moveToNextSlide(data);
      } else {
        this.changeSlideIndex(data);
      }
    },

    findBarWithIndex() {
      let index = this.getCurrentSlideIndex;
      let bar = document.querySelector(`[data-index='${index}']`);
      this.changeBarTransformOrigin(bar);
    },

    changeBarTransformOrigin(bar) {
      bar.style.transformOrigin = "0 0";
      setTimeout(() => {
        bar.style.transformOrigin = "";
      }, this.resetTime);
    },

    changeSlideIndex(data) {
      if (this.getCurrentSlideIndex + data.direction >= this.slides.length) {
        this.setCurrentSlideIndex(0);
      } else if (this.getCurrentSlideIndex + data.direction === -1) {
        this.setCurrentSlideIndex(this.slides.length - 1);
      } else {
        this.setCurrentSlideIndex(this.getCurrentSlideIndex + data.direction);
      }
    },

    clearSlide() {
      clearTimeout(this.interval);
      this.setShow(false);
      this.interval = null;
    },

    moveToNextSlide(data) {
      setTimeout(() => {
        this.changeSlideIndex(data);
        this.setShow(true);
        this.startTimer();
      }, this.resetTime);
    },

    startTimer() {
      this.interval = setTimeout(() => {
        this.clearSlide();
        this.moveToNextSlide({ direction: 1 });
      }, this.sliderShowTime);
    },
  },

  mounted() {
    setTimeout(() => this.setShow(true), 0); // для первичной анимации
    this.animateText();
    this.startTimer();
  },
};
</script>
<style lang="scss" scoped>
.slider {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  position: relative;

  &__button {
    &-enter-from,
    &-leave-to {
      transform: scaleY(0);
      opacity: 0;
    }
    &-enter-active,
    &-leave-active {
      transition: 1s;
    }
  }

  &__switcher {
    position: absolute;
    bottom: 0;
    right: 0;
  }

  &__paragraph {
    margin-top: 15px;
  }
  &__orangeback {
    position: relative;
    height: 100%;
    width: 30%;
    bottom: 0;
    opacity: 1;
    background: #d28154;
  }

  &__span-wrapper {
    width: fit-content;
    position: relative;
  }

  &__span-text {
    opacity: 0;
    &--show {
      opacity: 1;
    }
  }

  &__span-fill {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 0;
    background: #f46717;
    transform-origin: 100% 0;
    &--show {
      animation: fillBackground 1s ease-out;
    }
  }

  @keyframes fillBackground {
    0% {
      width: 100%;
      transform: scaleX(0);
      transform-origin: 0 100%;
    }
    49% {
    }
    50% {
      transform: scaleX(1);
      transform-origin: 0 100%;
    }
    51% {
      transform-origin: 100% 0;
    }
    100% {
      width: 100%;
      transform: scaleX(0);
    }
  }

  &__image-wrapper {
    height: 100%;
    position: absolute;
    left: 0;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    &-enter-from,
    &-leave-to {
      left: 200%;
    }
    &-enter-active {
      transition: 1s cubic-bezier(0, -0.02, 0.4, 0.99);
    }
    &-leave-active {
      transition: 1s cubic-bezier(0.59, 0.01, 1, 0.99);
    }
  }

  &__content {
    font-family: "Bodoni-Bold";
    font-size: 72px;
    padding: 0 220px;
    width: 70%;
    font-weight: bold;
    color: #121212;
  }

  &__flip-text {
    color: #f5f5f5;
    writing-mode: vertical-rl;
    font-family: "Bodoni-Bold";
    font-weight: bold;
    font-size: 132px;
    line-height: 0.55;
    height: 100%;
    left: 0;
    position: absolute;
    text-align: center;
    transition: 0.5s;
    &-enter-from,
    &-leave-to {
      left: -25%;
    }
    &-enter-active {
      transition: 1s ease-out;
    }
    &-leave-active {
      transition: 1s ease-in;
    }
  }
}
</style>
