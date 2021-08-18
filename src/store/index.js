/* eslint-disable no-unused-vars */
import { createStore } from "vuex";

export default createStore({
  state: {
    token: "",
    maxPage: 0,
    images: [],
  },
  mutations: {
    ADD_TOKEN(state, payload) {
      state.token = payload;
    },
    ADD_MAX_PAGE(state, payload) {
      state.maxPage = payload;
    },
    ADD_IMAGE(state, payload) {
      state.images.push(payload);
    },
    CLEAR_CURRENT_IMAGES(state, payload) {
      state.images = payload;
    },
  },
  actions: {
    addToken(commit, newToken) {
      const tkn = newToken;
      this.commit("ADD_TOKEN", tkn);
    },
    fillCurrentImages(commit, imagesJson) {
      const _pictures = imagesJson.pictures;

      if (_pictures.length > 0) {
        for (let i = 0; i < _pictures.length; i++) {
          const img = _pictures[i];
          this.commit("ADD_IMAGE", img);
        }
        this.commit("ADD_MAX_PAGE", imagesJson.pageCount);
      } else return;
    },
    clearCurrentImages(commit) {
      this.commit("CLEAR_CURRENT_IMAGES", []);
    },
  },
});
