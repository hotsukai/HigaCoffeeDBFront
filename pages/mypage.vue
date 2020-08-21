<template>
  <div>
    <h1 class="title">{{name}}のマイページ</h1>
    <div>
      <img :src="photoURL" />
      <p>お名前:{{name}}</p>
    </div>
    <div>
      <p class="subtitle">あなたが書いたレビュー</p>
      <!-- TODO -->
      <p>まだレビューがありません</p>
      <p class="subtitle">レビューを書く</p>
      <div v-for="coffee in testCoffees">
        <CoffeeCard :coffee="coffee"/>
      </div>
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
  testCoffees = [
    { name: "深煎マンデリン(レンタルサービス)", id: 123 },
    { name: "浅煎りマンデリン(レンタルサービス)", id: 124 },
    { name: "深煎ブラジル(レンタルサービス)", id: 125 },
  ];

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