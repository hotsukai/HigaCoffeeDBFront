<template>
  <div class="card">
    <div class="card-content">
      <p class="title">{{targetCoffee.name}}</p>
      <p class="subtitle"></p>
      <ul>
        <li>苦さ:{{review.bitterness}}</li>
        <li>濃さ:{{review.strongness}}</li>
        <li>また飲みたいか:{{repeatToJapanese}}</li>
        <li>役割:{{situationToJapanese}}</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import firebase from "../../plugins/firebase";

var db = firebase.firestore();
@Component
export default class ReviewCard extends Vue {
  @Prop()
  review!: any;

  get repeatToJapanese() {
    const repeat_japanese = ["飲みたくない!!", "普通", "また飲みたい!"];
    return repeat_japanese[parseInt(this.review.repeat) - 1];
  }

  get situationToJapanese() {
    const situation_japanese = [
      "リラックス",
      "ややリラックス",
      "やや眠気覚まし",
      "眠気覚まし",
    ];
    return situation_japanese[parseInt(this.review.situation) - 1];
  }
  get targetCoffee() {
    // return this.getCoffeeData();
    return {name:"ブラジル深煎",id:123}//TODO:ハードコーディングやめる
  }

  getCoffeeData() {
    var data;
    db.collection("coffees")
      .doc(this.review.coffee_id)
      .get()
      .then(function (doc) {
        if (doc.exists) {
          data = doc.data();
          console.debug("in then:");
          console.debug(data);
          return data;
        } else {
          console.log("Coffeeが見つかりませんでした。");
          return -1;
        }
      });
  }
}
</script>

<style>
</style>