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
            :type="passwordType"
            id="password"
            v-model="password"
            class="input"
          />
          <label for="js-passcheck">パスワードを表示する</label>
          <input type="checkbox" id="js-passcheck" v-model="showPassword" />
        </div>
        <button class="button" @click="submit()" type="button">
          ログイン
        </button>
      </form>
    </div>
    <nuxt-link to="/signup">登録がお済みでない場合</nuxt-link>
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
      showPassword: false
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
            this.$store.commit("setUser", {
              user: response.data,
              token: response.token
            });
            this.$toast.success("ログインしました");
            this.$router.push("/mypage");
          } else {
            this.$toast.error("ログインに失敗しました" + response.message);
            return false;
          }
        })
        .catch(err => {
          console.error("error 1 : ", err.message);
          return false;
        });
    }
  },
  computed: {
    passwordType() {
      return this.showPassword ? "text" : "password";
    }
  }
};
</script>
