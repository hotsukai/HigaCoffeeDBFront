<template>
  <div>
    <h1 class="title">あなたあてのコーヒー</h1>
    <div v-show="isCoffeeExist">
      <CoffeeCards :coffees="coffees" :user="currentUser" />
    </div>
    <div v-show="! isCoffeeExist">あなたあてのコーヒーがありません。</div>
  </div>
</template>


<script>
import firebase from "@/plugins/firebase";
const db = firebase.firestore();

export default {
  async asyncData() {
    var cUser;
    await firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        cUser = user;
      }
    });
    const coffeesArray = [];
    await db
      .collection("coffees")
      .where("userId", "==", cUser.uid)
      .where("isReviewExist","==",false)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          coffeesArray.push(doc.data());
        });
      });
    return { coffees: coffeesArray ,currentUser:cUser};
  },

  computed: {
    isCoffeeExist() {
      return this.coffees.length > 0;
    },
  },
};
</script>

<style>
</style>