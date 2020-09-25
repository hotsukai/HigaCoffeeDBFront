<template>
  <div>
    <p>ID:{{coffeeId}}のコーヒーについて</p>
    <ReviewForm :coffee="coffeeData"></ReviewForm>
  </div>
</template>

<script>
import firebase from "@/plugins/firebase";
const db = firebase.firestore();

export default {
  data() {
    return {
      coffeeData: null,
      coffeeId:null
    };
  },

  created() {
    let coffeeId = this.$route.params.id;
    db.collection("coffees")
      .doc(coffeeId)
      .get()
      .then((doc) => {
        this.coffeeData = doc.data();
        this.coffeeId=doc.id
      });
  },
};
</script>

<style>
</style>