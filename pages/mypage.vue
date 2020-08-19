<template>
  <div>
    <div>
      <img :src="photoURL" />
      <p>お名前:{{name}}</p>
    </div>
    <div>
      <p>あなたが書いたレビュー</p>
      <p>あなたあてのコーヒー</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import firebase from "../plugins/firebase";
import { User } from "firebase";
@Component({})
export default class MypagePage extends Vue {
  private name: string | null = "初期の名前";
  private photoURL: string | null = "";

  created() {
    const user: User | null = firebase.auth().currentUser;
    if (user != null) {
      this.name = user.displayName;
      this.photoURL = user.photoURL;
    }
  }
}
</script>

<style>
</style>