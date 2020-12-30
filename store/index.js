export const state = () => ({
  currentUser: null
});

export const mutations = {
  setUser(state, data) {
    state.currentUser = data.user;
    localStorage.setItem("authToken", data.token);
  },
  deleteUser(state) {
    state.currentUser = null;
    localStorage.removeItem("authToken");
  }
};

export const actions = {
  async auth({ commit }) {
    await this.$axios
      .$get(`/auth`)
      .then(response => {
        if (response.result) {
          commit("setUser", {
            user: response.data,
            token: localStorage.getItem("authToken")
          });
          return response.data;
        } else {
          commit("deleteUser");

          return false;
        }
      })
      .catch(err => {
        commit("deleteUser");

        console.error("error 1 : ", err.message);
        return false;
      });
  }
};
