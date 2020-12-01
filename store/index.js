export const state = () => ({
  currentUser: null
});

export const mutations = {
  setUser(state, currentUser) {
    state.currentUser = currentUser;
  }
};

export const actions = {
  async login({ commit }, { username, password,watchWord }){
    const response = await this.$axios
      .$post("/auth/login", { username, password,watchWord })
      .then(response=>{
        console.debug(JSON.stringify(response))
      })
      .catch(err => {
        console.error("error 1 : ",err);
      });
    commit("setUser", response);
  }
};
