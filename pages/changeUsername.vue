<template>
  <div>
    <h1 class="title">ユーザー名の変更</h1>
    <div class="field">
      <form class="control">
        <div>
          <label for="currentUserName">現在のユーザー名</label>
          <p>{{currentUserName}}</p>
        </div>
        <div>
          <label for="newUserName">新しいユーザー名</label>
          <input id="newUserName" v-model="newUserName" type="text" class="input" />
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
        <button class="button" type="button" @click="submit()">変更</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
// export type DataType = ;
import Vue from "vue";
import User from "~/types/models";

export default Vue.extend({
  data(): {
    user: User | null;
    currentUserName: string;
    newUserName: string;
    password: string;
    isSecretWordCorrect: boolean;
    showPassword: boolean;
  } {
    return {
      user: null,
      currentUserName: "",
      newUserName: "",
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
  async created(){
    //   let user: User = await this.$axios
    //     .get("/users/" + this.$route.params.id)
    //     .then((res) =>{
    //         return res.data;
    //     });
    //   this.user = user;
      this.currentUserName = this.$store.state.currentUser.name
  },
  methods: {
    async submit(): Promise<void> {
      this.$axios
        .$post("/auth/changeUsername", {
          currentUsername: this.currentUserName,
          newUsername: this.newUserName,
          password: this.password,
        })
        .then((response) => {
          if (response.result) {
            this.$store.commit("setUser", {
              user: response.data,
              token: response.token,
            });
            this.$toast.success("ユーザー名を変更しました");
            this.$router.push("/users/" + this.$store.state.currentUser.id);
          } else {
            this.$toast.error("ユーザー名変更に失敗しました" + response.message);
            return false;
          }
        })
        .catch((e: { response: { data: { message: string } } }) => {
          this.$toast.error("エラーが発生しました。" + e.response.data.message);
          console.error(
            "エラーが発生しました。" + JSON.stringify(e.response, null, 2)
          );
        });
    },
  },
});
</script>
