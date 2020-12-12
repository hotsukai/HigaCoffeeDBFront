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
  }
};
</script>
