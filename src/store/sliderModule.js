export const sliderModule = {
  state() {
    return {
      show: false,
      currentSlideIndex: 0,
      slides: [
        {
          id: 0,
          rows: ["ВОЗЬМИ STIHL —", "ПОЧУВСТВУЙ МОЩЬ"],
          title: "БЕНЗОПИЛЫ",
          description:
            "Единственное условие – регистрация продукта, которая займет меньше минуты и будет сделана прямо в магазине в момент Вашей покупки!",
          image: "promo-01",
        },
        {
          id: 1,
          rows: ["ВОЗЬМИ STIHL —", "ПОЧУВСТВУЙ МОЩЬ"],
          title: "МОТОКОСЫ",
          description: "Промо-текст, почувствуй мощь",
          image: "promo-02",
        },
        {
          id: 2,
          rows: ["ВОЗЬМИ STIHL —", "ПОЧУВСТВУЙ МОЩЬ", "ТРЕТЬЯ СТРОКА"],
          title: "МОТОКОСЫ",
          description: "Промо-текст, почувствуй мощь",
          image: "promo-02",
        },
      ],
    };
  },

  getters: {
    getCurrentSlide(state) {
      return state.slides.find(
        (slide, index) => index === state.currentSlideIndex
      );
    },
    getCurrentSlideIndex(state) {
      return state.currentSlideIndex;
    },
    getImage(state, getters) {
      return getters.getCurrentSlide.image;
    },
  },

  mutations: {
    setShow(state, payload) {
      state.show = payload;
    },
    setCurrentSlideIndex(state, payload) {
      state.currentSlideIndex = payload;
    },
  },
  namespaced: true,
};
