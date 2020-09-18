<template>
  <div class="container">
    <h1 class="title">トップページ</h1>
    <div v-if="isLogin">
      <p>ログイン中</p>
    </div>
    <div v-else>
      <p>ログインしていません</p>
    </div>
    <div class="title">HiGaCoffeeとは</div>
    <p>本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文</p>
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
  async mounted() {
    await firebase
      .auth()
      .onAuthStateChanged((user) => (this.isLogin = user ? true : false));
  },
};
</script>

<style>
</style>
