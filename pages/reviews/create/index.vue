<template>
  <div>
      <h1 class="title">あなたあてのコーヒー</h1>
    <CoffeeCards :coffees="coffees" />
  </div>
</template>


<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import firebase from "../../../plugins/firebase";
import { User } from "firebase";

@Component({})
export default class MypagePage extends Vue {
  private name: string | null = "初期の名前";
  private photoURL: string | null = "";
  coffees = [
    { name: "深煎マンデリン(レンタルサービス)", id: 123 },
    { name: "浅煎りマンデリン(レンタルサービス)", id: 124 },
    { name: "深煎ブラジル(レンタルサービス)", id: 125 },
  ];
}
</script>

<style>
</style>