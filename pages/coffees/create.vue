<template>
  <div>
    <form>
      <div>
        <label class="label">豆の種類</label>
      </div>
      <div>
        <label class="label">抽出法</label>
      </div>
      <div>
        <label class="label">抽出時間</label>
        <!-- TODO:フレンチプレスのみ -->
      </div>
      <div>
        <label class="label">粉の量</label>
      </div>
      <div>
        <label class="label">お湯の量</label>
      </div>
      <div>
        <label class="label">お湯の温度</label>
      </div>
      <div>
        <label class="label">飲む人</label>
      </div>
      <div>
        <label class="label">メモ</label>
        <p class="help">
          既定のレシピ通りに出来なかった場合はその旨を記してください（例：お湯を入れすぎた、抽出時間長すぎた）
        </p>
        <input class="input" type="text" v-model="feeling" />
      </div>
      <p v-show="!isValid" class="is-danger">入力に不備があります</p>
      <button
        @click="sendCoffee"
        v-bind:disabled="!isValid"
        type="button"
        class="button is-primary"
      >
        送信!!
      </button>
    </form>
  </div>
</template>

<script>
import firebase from "@/plugins/firebase";
var db = firebase.firestore();

export default {
  props: ["coffeeData"],

  data() {
    return {};
  },

  computed: {
    isValid() {
      return true;
    }
  },

  methods: {
    sendCoffee() {}
  }
};
</script>

<style></style>
