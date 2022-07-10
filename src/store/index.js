import { createStore } from "vuex";
import { sliderModule } from "./sliderModule";
export default createStore({
  state: {
    isMenuShow: false,
  },
  getters: {},
  mutations: {
    setIsMenuShow(state, payload) {
      state.isMenuShow = payload
    }
  },
  actions: {},
  modules: {
    sliderModule: sliderModule,
  },
});
