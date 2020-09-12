<template>
  <div>
    <h1 class="title">{{name}}のマイページ</h1>
    <div>
      <img :src="photoURL" class="profile-img" />
      <p>お名前:{{name}}</p>
    </div>
    <RentalButton />
    <div v-show="isReviewExist">
      <p class="subtitle">あなたが書いたレビュー</p>
      <ReviewCards :reviews="reviews" />
    </div>
    <div v-show="! isReviewExist">
      <p>まだレビューがありません</p>
    </div>
  </div>
</template>

<script>
import firebase from "@/plugins/firebase";
const currentUser = firebase.auth().currentUser;
const db = firebase.firestore();

export default {
  async asyncData() {
    const reviewsArray = [];
    await db
      .collection("reviews")
      .where("user_id", "==", currentUser.uid)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          reviewsArray.push(doc.data());
        });
      });
    return { reviews: reviewsArray };
  },

  data() {
    return {
      name: "初期の名前",
      photoURL: "",
    };
  },

  created() {
    if (currentUser != null) {
      this.name = currentUser.displayName;
      this.photoURL = currentUser.photoURL;
    }
  },

  computed: {
    isReviewExist() {
      return this.reviews.length > 0;
    },
  },
};
</script>

<style>
.profile-img {
  height: 3em;
}
</style>