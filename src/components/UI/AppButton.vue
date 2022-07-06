<template>
  <button class="button">
    <div class="button__text">
      <slot>УЗНАТЬ БОЛЬШЕ</slot>
    </div>
    <div class="button__back-top"></div>
    <div class="button__back-bottom"></div>
  </button>
</template>
<script>
export default {};
</script>
<style lang="scss">
.button {
  position: relative;
  font-family: "Montserrat-Bold";
  background: #121212;
  padding: 10px 20px;
  font-size: 16px;
  color: #ffffff;
  &__text {
    position: relative;
    z-index: 1;
  }
  &__back-top,
  &__back-bottom {
    height: 50%;
    left: 0;
    right: 0;
    width: 100%;
    z-index: 0;
    position: absolute;
    background: #f37a1f;
    transform: scaleX(0);
    transform-origin: 100% 0;
    transition: transform 0.3s;
  }
  &__back-top {
    top: 0;
  }

  &__back-bottom {
    bottom: 0;
    transition-delay: 0.1s;
  }

  &:hover &__back-top,
  &:hover &__back-bottom {
    transform: scaleX(1);
    transform-origin: 0 0;
  }
}
</style>
