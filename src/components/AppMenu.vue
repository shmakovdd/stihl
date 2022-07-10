<template>
  <transition name="menu">
    <aside v-if="isMenuShow" class="menu">
      <ul class="menu__list">
        <li class="menu__item">
          <button class="menu__button">каталог</button>
        </li>
        <li class="menu__item"><button class="menu__button">stihl</button></li>
        <li class="menu__item"><button class="menu__button">akku</button></li>
        <li class="menu__item"><button class="menu__button">акции</button></li>
        <li class="menu__item">
          <button class="menu__button">поиск дилера</button>
        </li>
        <li class="menu__item">
          <button class="menu__button">новости</button>
        </li>
        <li class="menu__item"><button class="menu__button">о нас</button></li>
        <li class="menu__item">
          <button class="menu__button">контакты</button>
        </li>
      </ul>
    </aside>
  </transition>
</template>
<script>
import { mapState } from "vuex";
import AppNavbar from "@/components/AppNavbar.vue";
export default {
  components: {
    AppNavbar,
  },
  computed: {
    ...mapState({
      isMenuShow: (state) => state.isMenuShow,
    }),
  },
};
</script>
<style lang="scss" scoped>
.menu {
  @media screen and (min-width: 980px) {
    display: none;
  }
    padding-top: 90px;
  position: absolute;
  height: 100%;
  width: 60%;
  background: #333333;
  right: 0;
  z-index: 100;
  &-enter-from,
  &-leave-to {
    transform: translateX(100%);
    opacity: 0;
  }
  &-enter-active,
  &-leave-active {
    transition: 0.4s;
  }

  &__list {
    flex-direction: column;
    display: flex;
  }

  &__item {
    text-align: end;
    padding-right: 20px;
    position: relative;
    margin-bottom: 20px;

    &::after {
      content: "";
      display: block;
      position: absolute;
      width: 100%;
      margin-top: 10px;
      height: 1px;
      background: linear-gradient(
        90deg,
        rgba(242, 242, 242, 0) 0%,
        $main-color 100%
      );
    }
  }
  &__button {
    color: white;
    font-family: "Montserrat-Bold";
    font-size: 18px;
    &:hover {
        opacity: .6;
    }
  }
}
</style>
