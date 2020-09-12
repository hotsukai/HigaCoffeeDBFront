<template>
  <div>
    <h1 class="title">あなたあてのコーヒー</h1>
    <div v-show="isCoffeeExist">
      <CoffeeCards :coffees="coffees" />
    </div>
    <div v-show="! isCoffeeExist">あなたあてのコーヒーがありません。</div>
  </div>
</template>


<script>
import firebase from "@/plugins/firebase";
const currentUser = firebase.auth().currentUser;
const db = firebase.firestore();
export default {
  async asyncData() {
    const coffeesArray = [];
    await db
      .collection("coffees")
      .where("user_id", "==", currentUser.uid)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          // console.debug(doc.id, " => ", doc.data());
          coffeesArray.push(doc.data());
        });
      });
    return { coffees: coffeesArray };
  },

  data() {
    return {
      name: "",
      user_id: "",
      photoURL: "",
      coffees: [],
    };
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