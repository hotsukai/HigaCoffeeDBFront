<template>
  <div>
    <p class="title">レビュー一覧</p>
    <ReviewCards :reviews="reviews"></ReviewCards>
  </div>
</template>

// TODO最新n件を表示する。
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import firebase from "../../plugins/firebase";
import { User } from "firebase";
export default class ReviewIndex extends Vue {
  reviews = [
    {
      id: 1,
      bitterness: 3,
      coffeeId: "123",
      feeling: "数字??",
      repeat: 3,
      situation: 1,
      strongness: 2,
      userId: "KIsUbKboVlbyj8Yskhps4qZaXgr2",
    },
  ];
}
</script>

<style>
</style>