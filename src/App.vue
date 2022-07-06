<template>
  <app-cursor />
  <app-header/>
  <router-view></router-view>
</template>
<script>
import AppCursor from "@/components/UI/AppCursor.vue";
import AppHeader from "@/components/AppHeader.vue";
export default {
  components: {
    AppCursor,
    AppHeader,
  },
};
</script>
<style lang="scss">
@import "~@/assets/styles/styles.scss";
</style>
