<template>
  <div>
    <div v-show="isLogin">
      <button @click="logout" class="button">ログアウト</button>
    </div>
    <div v-show="!isLogin">
      <nuxt-link to="login" class="button">ログイン</nuxt-link>
    </div>
  </div>
</template>

<script>
import firebase from "@/plugins/firebase";

export default {
  data() {
    return {
      isLogin: false,
    };
  },

  async created() {
    await firebase
      .auth()
      .onAuthStateChanged((user) => (this.isLogin = user ? true : false));
  },

  methods: {
    async logout() {
      await firebase.auth().signOut();
      alert("ログアウトしました。")
      this.$router.push("/");
    },
  },
};
</script>

<style>
</style>