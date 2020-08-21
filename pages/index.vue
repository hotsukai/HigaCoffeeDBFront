<template>
  <div class="container">
    <h1 class="title">トップページ</h1>
    <div v-if="isLogin">
      <p>ログイン中</p>
      <button @click="logout">ログアウト</button>
    </div>
    <div v-else>
      <p>ログインしていません</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import firebase from "@/plugins/firebase";
@Component
export default class indexPage  extends Vue{
 isLogin: boolean = false;
  async mounted() {
    await firebase
      .auth()
      .onAuthStateChanged((user) => (this.isLogin = user ? true : false));
  }}
</script>

<style>
</style>
