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
    localStorage.removeItem('authToken');
  }
};

export const actions = {
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
  }
};
