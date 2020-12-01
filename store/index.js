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
          alert("ログインしました。")
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
  }
};
