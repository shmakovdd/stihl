<template>
  <header class="header">
    <div class="header__container">
      <div class="header__logo-wrapper">
        <app-logo class="header__logo" />
      </div>
      <app-navbar class="header__nav"/>
    </div>
  </header>
</template>
<script>
import AppNavbar from '@/components/AppNavbar.vue'
export default {
  components: {
    AppNavbar
  }
};
</script>
<style lang="scss" scoped>
.header {
  margin-top: 30px;
  position: absolute;
  z-index: 1;
  &__container {
    padding: 0 30px;
    display: flex;
    align-items: center;
  }

  &__logo-wrapper {
    height: 30px;
    width: 150px;
    margin-right: 40px;
  }
}
</style>
