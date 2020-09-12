<template>
  <div>
    <h1 class="title">{{name}}のマイページ</h1>
    <div>
      <img :src="photoURL" />
      <p>お名前:{{name}}</p>
    </div>
    <RentalButton />
    <div>
      <p class="subtitle" v-show="false">あなたが書いたレビュー</p>
      <!-- TODO: 動的に書き分ける -->
      <p>まだレビューがありません</p>
    </div>
  </div>
</template>

<script>
import firebase from "@/plugins/firebase";

export default {
  data() {
    return {
      name: "初期の名前",
      photoURL: "",
    };
  },

  created() {
    const user = firebase.auth().currentUser;
    if (user != null) {
      this.name = user.displayName;
      this.photoURL = user.photoURL;
    }
  }
}
</script>

<style>
</style>