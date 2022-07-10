<template>
  <nav class="nav">
    <ul class="nav__list">
      <li class="nav__item"><button class="nav__button">каталог</button></li>
      <li class="nav__item"><button class="nav__button">stihl</button></li>
      <li class="nav__item"><button class="nav__button">akku</button></li>
      <li class="nav__item"><button class="nav__button">акции</button></li>
      <li class="nav__item">
        <button class="nav__button">поиск дилера</button>
      </li>
      <li class="nav__item"><button class="nav__button">новости</button></li>
      <li class="nav__item"><button class="nav__button">о нас</button></li>
      <li class="nav__item"><button class="nav__button">контакты</button></li>
    </ul>
  </nav>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.nav {

  color: $black;
  &__list {
    display: flex;
    margin-right: 40px;
  }
  &__item {
    margin-right: 40px;
    &:last-child {
      margin: 0;
    }
    @media screen and (max-width: 1600px) {
      margin-right: 20px;
    }
  }
  &__button {
    text-transform: uppercase;
    font-family: "Montserrat-Bold";
    font-size: 16px;
    transition: 0.2s;
    &:hover {
      opacity: 0.4;
    }
    @media screen and (max-width: 1600px) {
      font-size: 14px;
    }
  }
}
</style>
