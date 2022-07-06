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
  color: #121212;
  &__list {
    display: flex;
  }
  &__item {
    margin-right: 40px;
  }
  &__button {
    text-transform: uppercase;
    font-family: "Montserrat-Bold";
    font-size: 16px;
    background: transparent;
    transition: .2s;
    &:hover {
        opacity: .4;
    }
  }
}
</style>
