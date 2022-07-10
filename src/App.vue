<template>
  <app-cursor />
  <app-header />
  <app-menu />
  <router-view></router-view>
</template>
<script>
import AppHeader from "@/components/AppHeader.vue";
import AppMenu from "@/components/AppMenu.vue";
export default {
  components: {
    AppHeader,
    AppMenu,
  },
};
</script>
<style lang="scss">
@import "~@/assets/styles/styles.scss";
</style>
