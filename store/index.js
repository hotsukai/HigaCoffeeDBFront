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
