export const state = () => ({
  currentUser: null
});

export const mutations = {
  setUser(state, currentUser) {
    state.currentUser = currentUser;
  }
};

export const actions = {
  async login({ commit }, { username, password, watchWord }) {
    return await this.$axios
      .$post("/auth/login", { username, password, watchWord })
      .then(response => {
        console.debug(JSON.stringify(response.result));
        if (response.result) {
          commit("setUser", response.data);
          console.debug("成功", JSON.stringify(response));
          alert("ログインしました。");
          return true;
        } else {
          alert("ログインに失敗しました : " + response.message);
          console.debug(JSON.stringify(response));
          return false;
        }
      })
      .catch(err => {
        console.error("error 1 : ", err.message);
      });
  },
  async auth({ commit }) {
    await this.$axios
      .$get(`/auth`)
      .then(response => {
        console.debug(
          "store/index result : " + JSON.stringify(response.result)
        );
        if (response.result) {
          commit("setUser", response.data);
          console.debug("成功", JSON.stringify(response));
          alert("userをセットしました。");
          return response.data;
        } else {
          console.debug(JSON.stringify(response));
          return false;
        }
      })
      .catch(err => {
        console.error("error 1 : ", err.message);
      });
  }
};
