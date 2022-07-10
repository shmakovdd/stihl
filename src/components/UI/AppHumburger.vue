<template>
  <button :class="{ active: isMenuShow }" class="humburger">
    <button @click="setIsMenuShow(!isMenuShow)" class="humburger__button">
      <div class="humburger__line"></div>
    </button>
  </button>
</template>
<script>
import { mapMutations, mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      isMenuShow: (state) => state.isMenuShow,
    }),
  },
  methods: {
    ...mapMutations({
      setIsMenuShow: "setIsMenuShow",
    }),
  },
  name: "app-humburger",
};
</script>
<style lang="scss" scoped>
.humburger {
  @media screen and (max-width: 980px) {
    display: flex;
  }
    @media screen and (max-width: 540px) {
    width: 60px;
  }
  background: $additional-black;
  height: 100%;
  width: 90px;
  display: none;
  justify-content: center;
  align-items: center;
  &__button {
    width: 25px;
    height: 40px;
  }

  &__line {
    width: 25px;
    height: 3px;
    background: white;
    border-radius: 5px;
    transition: 0.2s;
    &::after,
    &::before {
      width: 25px;
      height: 3px;
      background: white;
      border-radius: 5px;
      transition: 0.2s;
      content: "";
      display: block;
    }
    &::after {
      transform: translateY(-9px);
    }
    &::before {
      transform: translateY(6px);
    }
  }
}

.active .humburger__line {
  transform: translateX(-25px);
  background: transparent;
}

.active .humburger__line::before {
  transform: rotate(45deg) translate(17px, -18px);
}

.active .humburger__line::after {
  transform: rotate(-45deg) translate(20px, 14px);
}
</style>
