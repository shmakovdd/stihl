<template>
  <div class="user-data">
    <button class="user-data__button">
      <div class="user-data__city-wrapper">
        <div class="user-data__city-name">МОСКВА</div>
        <location-icon class="user-data__location-icon" />
      </div>
    </button>

    <button class="user-data__button">
      <search-icon class="user-data__icon" />
    </button>
    <button class="user-data__button">
      <div class="user-data__value">5</div>
      <heart-icon class="user-data__icon" />
    </button>
    <button class="user-data__button">
      <div class="user-data__value">14</div>
      <chart-icon class="user-data__icon" />
    </button>
  </div>
</template>
<script>
export default {
};
</script>
<style lang="scss" scoped>
.user-data {
  @media screen and (max-width: 1300px) {
    display: none;
  }

  padding: 0 30px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 330px;
  height: 100%;
  background: #333333;
  &__icon {
    width: 18px;
    height: 18px;
  }
  &__button {
    display: flex;
    align-items: center;
    font-family: "Montserrat-Regular";
    font-size: 17px;
    position: relative;
    background: transparent;
    color: white;
    transition: 0.2s;
    &:hover {
      color: $main-color;
    }
    &:hover .user-data__location-icon {
      fill: $main-color;
    }
  }

  &__value {
    position: absolute;
    font-family: "Montserrat-Bold";
    font-size: 10px;
    right: -7px;
    top: -10px;
  }

  &__city-wrapper {
    display: flex;
    align-items: center;
  }
  &__location-icon {
    fill: white;
    width: 15px;
  }
}
</style>
