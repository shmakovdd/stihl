<template>
  <header class="header">
    <div class="header__container">
      <div class="header__logo-wrapper">
        <app-logo class="header__logo" />
      </div>
      <app-navbar class="header__nav" />
      <app-userdata class="header__user-data" />
      <app-humburger class="header__humburger" />
    </div>
  </header>
</template>
<script>
import AppNavbar from "@/components/AppNavbar.vue";
import AppUserdata from "@/components/AppUserdata.vue";
export default {
  components: {
    AppNavbar,
    AppUserdata,
  },
};
</script>
<style lang="scss" scoped>
.header {
  position: absolute;
  width: 100%;
  z-index: 1000;

  &__humburger {
    position: absolute;
    right: 0;
  }
  &__container {
    height: 90px;
    padding-left: 30px;
    display: flex;
    align-items: center;
    @media screen and (max-width: 540px) {
      height: 60px;
    }
  }

  &__logo-wrapper {
    height: 30px;
    width: 150px;
    margin-right: 40px;
  }
  &__user-data {
    margin-left: auto;
  }

  &__nav {
    @media screen and (max-width: 980px) {
      display: none;
    }
  }
}
</style>
