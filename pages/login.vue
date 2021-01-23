<template>
  <div>
    <h1 class="title">ログイン</h1>
    <div class="field">
      <form class="control">
        <div>
          <label for="userName">ユーザー名</label>
          <input id="userName" v-model="userName" type="text" class="input" />
        </div>
        <div>
          <label for="password">パスワード</label>
          <input
            id="password"
            v-model="password"
            :type="passwordType"
            class="input"
          />
          <label for="js-passcheck">パスワードを表示する</label>
          <input id="js-passcheck" v-model="showPassword" type="checkbox" />
        </div>
        <button class="button" type="button" @click="submit()">ログイン</button>
      </form>
    </div>
    <nuxt-link to="/signup">登録がお済みでない場合</nuxt-link>
  </div>
</template>

<script lang="ts">
// export type DataType = ;
import Vue from "vue";
export default Vue.extend({
  data(): {
    userName: string;
    password: string;
    isSecretWordCorrect: boolean;
    showPassword: boolean;
  } {
    return {
      userName: "",
      password: "",
      isSecretWordCorrect: false,
      showPassword: false,
    };
  },
  computed: {
    passwordType(): string {
      return this.showPassword ? "text" : "password";
    },
  },
  methods: {
    async submit(): Promise<void> {
      this.$axios
        .$post("/auth/login", {
          username: this.userName,
          password: this.password,
        })
        .then((response) => {
          if (response.result) {
            this.$store.commit("setUser", {
              user: response.data,
              token: response.token,
            });
            this.$toast.success("ログインしました");
            this.$router.push('/users/' + this.$store.state.currentUser.id);
          } else {
            this.$toast.error("ログインに失敗しました" + response.message);
            return false;
          }
        })
        .catch((e: { response: { message: string; }; }) => {
        this.$toast.error("エラーが発生しました。" + e.response.message);
        console.error(
          "エラーが発生しました。" + JSON.stringify(e.response, null, 2)
        );
        this.$router.push("/");
      });
    },
  },
});
</script>
