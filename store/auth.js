export const state = () => ({
  currentUser: null
});

export const mutations = {
  setUser(state, currentUser) {
    state.currentUser = currentUser;
  }
};

export const actions = {
  async login({ commit }, { username, password }) {
    const response = await this.$axios
      .$post("/auth/login", { username, password })
      .catch(err => {
        console.error(err);
      });
    commit("setUser", response);
  }
};
