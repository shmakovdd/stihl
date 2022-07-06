<template>
  <div class="switcher">
    <div class="switcher__bars">
      <app-progressbar
        v-for="(slide, index) of slides"
        :key="slide.id"
        :index="index"
        class="switcher__progress-bar"
      />
    </div>
    <div class="switcher__arrows">
      <button class="switcher__button">
        <arrow-left ref="left" class="switcher__arrow switcher__arrow--left" />
      </button>
      <button class="switcher__button">
        <arrow-right
          ref="right"
          class="switcher__arrow switcher__arrow--right"
        />
      </button>
    </div>
  </div>
</template>
<script>
import AppProgressbar from "@/components/AppProgressbar.vue";
import { mapState } from "vuex";
export default {
  components: {
    AppProgressbar,
  },
  computed: {
    ...mapState({
      show: (state) => state.sliderModule.show,
      slides: (state) => state.sliderModule.slides,
    }),
  },

  methods: {
    initEvents() {
      this.$refs.left.$el.addEventListener("click", (e) => {
        if (!this.show) return;
        this.$emit("changeSlide", { direction: -1, isDirty: true });
      });
      this.$refs.right.$el.addEventListener("click", (e) => {
        if (!this.show) return;
        this.$emit("changeSlide", { direction: 1, isDirty: true });
      });
    },
  },

  mounted() {
    this.initEvents();
  },
};
</script>
<style lang="scss" scoped>
.switcher__button {
  border: none;
  margin-right: 35px;
  &:last-child {
    margin: 0;
  }
}
.switcher {
  width: 330px;
  height: 90px;
  background: #f1ebe8;
  &__bars {
    display: flex;
    width: 100%;
  }

  &__progress-bar {
    flex: 1;
  }

  &__arrows {
    display: flex;
    position: absolute;
    top: 50%;
    left: 10%;
    transform: translateY(-50%);
  }

  &__arrow {
    width: 35px;
    height: 35px;
    transition: 0.3s;

    &:hover {
      opacity: 0.4;
    }
    &--left:hover {
      transform: translateX(-40%);
    }
    &--right:hover {
      transform: translateX(40%);
    }
  }
}
</style>
