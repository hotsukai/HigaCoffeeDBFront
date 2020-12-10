export const state = () => ({
  currentUser: null
});

export const mutations = {
  setUser(state, currentUser) {
    state.currentUser = currentUser;
  },
  deleteUser(state) {
    state.currentUser = null;
  }
};

export const actions = {
  async login({ commit }, { username, password, watchWord }) {
    return await this.$axios
      .$post("/auth/login", { username, password, watchWord })
      .then(response => {
        if (response.result) {
          commit("setUser", response.data);
          return true;
        } else {
          return false;
        }
      })
      .catch(err => {
        console.error("error 1 : ", err.message);
        return false;
      });
  },
  async auth({ commit }) {
    await this.$axios
      .$get(`/auth`)
      .then(response => {
        if (response.result) {
          commit("setUser", response.data);
          return response.data;
        } else {
          return false;
        }
      })
      .catch(err => {
        console.error("error 1 : ", err.message);
        return false;
      });
  },
  async logout({ commit }) {
    return await this.$axios
      .$get(`/auth/logout`)
      .then(response => {
        if (response.result) {
          commit("deleteUser");
          console.debug("成功", JSON.stringify(response));
          return true;
        } else {
          return false;
        }
      })
      .catch(err => {
        console.error("error 1 : ", err.message);
        return false;
      });
  }
};
