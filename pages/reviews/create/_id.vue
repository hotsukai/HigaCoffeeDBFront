<template>
  <div>
    <CoffeeCard :coffee="coffeeData"><span></span></CoffeeCard>
    <ReviewForm :coffeeData="coffeeData" />
  </div>
</template>

<script>
import firebase from "@/plugins/firebase";
const db = firebase.firestore();

export default {
  data() {
    return {
      coffeeData: null,
      coffeeId: null,
    };
  },

  created() {
    let coffeeId = this.$route.params.id;
    db.collection("coffees")
      .doc(coffeeId)
      .get()
      .then((doc) => {
        this.coffeeData = doc.data();
        this.coffeeId = doc.id;
        if (this.coffeeData.isReviewExist === true) {
          alert("このコーヒーにはすでにレビューがあります。");
          this.$router.push("/");
        }
        if (firebase.auth().currentUser.uid !== this.coffeeData.userId) {
          alert("このコーヒーにレビューを書く権限がありません");
          this.$router.push("/");
        }
      });
  },
};
</script>

<style>
</style>