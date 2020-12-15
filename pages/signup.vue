<template>
  <div>
    <h1 class="title">ユーザー登録</h1>
    <div class="field">
      <form class="control">
        <div>
          <label for="watchWord">合言葉</label>
        </div>
        <input
          v-model="inputWatchWord"
          placeholder="合言葉は？？"
          type="password"
          class="input"
        />
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
          <label for="password">パスワード2回目</label>
          <input
            :type="passwordType"
            id="password"
            v-model="password2"
            class="input"
          />
          <label for="js-passcheck">パスワードを表示する</label>
          <input type="checkbox" id="js-passcheck" v-model="showPassword" />
        </div>

        <button class="button is-primary" @click="submit()" type="button">
          登録
        </button>
      </form>
    </div>
    <nuxt-link to="/login">登録がお済みの方はこちらへ</nuxt-link>
  </div>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";

export default {
  data() {
    return {
      inputWatchWord: "",
      userName: "",
      password: "",
      password2: "",
      showPassword: false
    };
  },
  methods: {
    async submit() {
      if (this.password !== this.password2) {
        alert("パスワードが一致しません");
        return;
      }
      if (this.password.length === 0) {
        alert("パスワードを入力してください");
        return;
      }
      if (this.userName.length === 0) {
        alert("ユーザー名を入力してください");
        return;
      }
      if (this.userName.length > 30) {
        alert("ユーザー名が長すぎます");
        return;
      }
      if (encodeURIComponent(this.password).replace(/%../g, "x").length > 50) {
        alert("パスワードが長すぎます");
        return;
      }

      await this.$axios
        .$post("/auth/create_user", {
          username: this.userName,
          password: this.password,
          watchword: this.inputWatchWord
        })
        .then(response => {
          if (response.result) {
            this.$store.commit("setUser", response.data);
            alert("ユーザーを登録しました");
            this.$router.push("/mypage");
            return true;
          } else {
            alert("ユーザー登録に失敗しました : " + response.message);
            return false;
          }
        })
        .catch(err => {
          alert("ユーザー登録に失敗しました 1");
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
