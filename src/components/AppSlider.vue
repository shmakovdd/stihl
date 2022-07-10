<template>
  <div class="slider">
    <div class="slider__content">
      <div class="slider__headers">
        <div
          v-for="(row, index) of getCurrentSlide.rows"
          :key="index"
          class="slider__text-wrapper"
        >
          <div ref="text" class="slider__text">
            {{ row }}
          </div>
          <div ref="fill" class="slider__text-fill"></div>
        </div>
      </div>

      <app-paragraph class="slider__paragraph" />
      <app-button class="slider__button" />
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
import AppParagraph from "@/components/AppParagraph.vue";
import AppSwitcher from "@/components/AppSwitcher.vue";
import AppPagination from "@/components/AppPagination.vue";
export default {
  components: {
    AppParagraph,
    AppSwitcher,
    AppPagination,
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
      setTimeout(this.animateText, 0); // setTimeout 0 - для того, чтобы vue успел отрисовать DOM дерево //
    },
  },
  methods: {
    ...mapMutations({
      setShow: "sliderModule/setShow",
      setCurrentSlideIndex: "sliderModule/setCurrentSlideIndex",
    }),
    async animateText() {   // Анимация для текста
      let setClassesToText = async () => {
        for( let item of this.$refs.text) {
          this.setTextClass(item);
          await this.waiter(200);
        }
      }
      let setClassesToFill = async () => {
        for(let item of this.$refs.fill) {
          this.setFillClass(item);
          await this.waiter(200);
        }
      }
      setClassesToFill();
      await this.waiter(500);
      setClassesToText();
    },

    setTextClass(item) { // ставим класс для текста
      if (this.show) {
        item.classList.add("slider__text--show");
      } else {
        item.classList.remove("slider__text--show");
      } 
    },
    async setFillClass(item) { // ставим класс для филера
      item.classList.add("slider__text-fill--show");
      await this.waiter(this.animationTime);
      item.classList.remove("slider__text-fill--show");
    },

    waiter(delay) {
      return new Promise(resolve => {
        setTimeout(resolve, delay)
      })
    },

    changeSlide(data) {    //переход на слайд по клику на стрелочки
      if (data.isDirty) {
        this.findBarWithIndex();
        this.resetInterval();
        this.moveToNextSlide(data);
      } else {
        this.changeSlideIndex(data);
      }
    },

    findBarWithIndex() {  // находим progress bar с нужным индексом
      let index = this.getCurrentSlideIndex;
      let bar = document.querySelector(`[data-index='${index}']`);
      this.changeBarTransformOrigin(bar);
    },

    async changeBarTransformOrigin(bar) { // меняем transform нужного progressbar
      bar.style.transformOrigin = "0 0";
      await this.waiter(this.resetTime)
      bar.style.transformOrigin = "";
    },

    changeSlideIndex(data) {       // меняем индекс слайда
      if (this.getCurrentSlideIndex + data.direction >= this.slides.length) {
        this.setCurrentSlideIndex(0);
      } else if (this.getCurrentSlideIndex + data.direction === -1) {
        this.setCurrentSlideIndex(this.slides.length - 1);
      } else {
        this.setCurrentSlideIndex(this.getCurrentSlideIndex + data.direction);
      }
    },

    resetInterval() {       // сбрасываем интервал
      clearTimeout(this.interval);
      this.setShow(false);
      this.interval = null;
    },

    async moveToNextSlide(data) {  // переход на следующий слайд
      await this.waiter(this.resetTime)       
        this.changeSlideIndex(data);
        this.setShow(true);
        this.startTimer();
    },

    startTimer() { // запуск таймера
      this.interval = setTimeout(() => {
        this.resetInterval();
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
    @media screen and (max-width: 540px) {
      width: 100%;
    }
    margin-top: 20px;
  }

  &__pagination {
    @media screen and (max-width: 540px) {
      display: none;
    }
    position: absolute;
    right: 25px;
    bottom: 12%;
  }

  &__switcher {
    position: absolute;
    bottom: 0;
    right: 0;
  }

  &__paragraph {
    @media screen and (max-width: 540px) {
      display: none;
    }
    margin-top: 15px;
  }
  &__orangeback {
    @media screen and (max-width: 540px) {
      width: 0;
    }
    position: relative;
    height: 100%;
    width: 30%;
    bottom: 0;
    opacity: 1;
    background: #d28154;
  }

  &__text-wrapper {
    width: fit-content;
    position: relative;
  }

  &__text {
    opacity: 0;
    &--show {
      opacity: 1;
    }
  }

  &__text-fill {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 0;
    background: $main-color;
    transform-origin: 100% 0;
    &--show {
      animation: fillBackground $transition-time ease-out;
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
    @media screen and(max-width: 1366px) {
      width: 65vw;
    }
    @media screen and (max-width: 540px) {
      transform: translateX(-100%);
      width: 100vw;
    }
    height: 100%;
    width: 70vw;
    position: absolute;
    left: 0;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    &-enter-from,
    &-leave-to {
      transform: translateX(200%);
    }
    &-enter-active {
      transition: $transition-time cubic-bezier(0, -0.02, 0.4, 0.99);
    }
    &-leave-active {
      transition: $transition-time cubic-bezier(0.59, 0.01, 1, 0.99);
    }
  }

  &__image {
    @media screen and(max-width: 980px) {
      max-height: 54vh;
    }
    @media screen and (max-width: 540px) {
      margin-top: 20px;
    }
    margin: 0 auto;
  }

  &__content {
    @media screen and(max-width: 1600px) {
      padding: 0 0 0 80px;
      font-size: 62px;
    }

    @media screen and(max-width: 1366px) {
      width: 55%;
      padding: 0 0 0 40px;
      font-size: 45px;
    }

    @media screen and(max-width: 780px) {
      font-size: 40px;
    }

    @media screen and(max-width: 540px) {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      font-size: 27px;
      padding: 0 40px;
      height: 77%;
      width: 100%;
    }
    font-family: "Bodoni-Bold";
    font-size: 72px;
    padding: 0 220px;
    width: 70%;
    font-weight: bold;
    color: $black;
  }

  &__flip-text {
    @media screen and (max-width: 1600px) {
      font-size: 102px;
    }
    color: $white;
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
      transition: $transition-time ease-out;
    }
    &-leave-active {
      transition: $transition-time ease-in;
    }
  }
}
</style>
