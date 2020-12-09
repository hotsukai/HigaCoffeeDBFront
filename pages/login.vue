<template>
  <div>
    <h1 class="title">ログイン</h1>
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
      inputWatchWord: "",
      userName: "",
      password: "",
      isSecretWordCorrect: false,
      isWordIncorrect: false
    };
  },
  methods: {
    async submit() {
      await this.$store
        .dispatch("login", {
          username: this.userName,
          password: this.password,
          watchWord: this.watchWord
        })
        .then(status => {
          if (status) {
            this.$router.push("/");
            alert("ログインしました");
          } else {
            alert("ログインに失敗しました");
          }
        });
    }
  }
};
</script>
