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
    const response = await this.$axios
      .$post("/auth/login", { username, password, watchWord })
      .then(response => {
        console.debug(JSON.stringify(response.result));
        if(response.result){
          commit("setUser", response);
          console.debug("成功",JSON.stringify(response));
        }
        else{
          alert("ログインに失敗しました : "+response.message)
          console.debug(JSON.stringify(response));
        }
      })
      .catch(err => {
        console.error("error 1 : ", err.message);
      });
  }
};
