<template>
  <div>
    <h1 class="title">ログイン</h1>
    <div class="field">
      <form class="control">
        <div>
          <label for="userName">ユーザー名</label>
          <input type="text" id="userName" v-model="userName" class="input" />
        </div>
        <div>
          <label for="password">パスワード</label>
          <input
            type="password"
            id="password"
            v-model="password"
            class="input"
          />
        </div>
        <button class="button is-primary" @click="submit()" type="button">
          ログイン
        </button>
        <div v-show="isWordIncorrect">
          <p>合言葉が間違っています</p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";

export default {
  data() {
    return {
      userName: "",
      password: "",
      isSecretWordCorrect: false,
      isWordIncorrect: false
    };
  },
  methods: {
    async submit() {
      this.$axios
        .$post("/auth/login", {
          username: this.userName,
          password: this.password
        })
        .then(response => {
          if (response.result) {
            this.$store.commit("setUser", response.data);
            alert("ログインしました");
            this.$router.push("/mypage");
          } else {
            alert("ログインに失敗しました" + response.message);
            return false;
          }
        })
        .catch(err => {
          console.error("error 1 : ", err.message);
          return false;
        });
    }
  }
};
</script>
