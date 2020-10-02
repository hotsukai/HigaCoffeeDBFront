<template>
  <div>
    <h1 class="title">{{name}}のマイページ</h1>
    <div>
      <img :src="photoURL" class="profile-img" />
      <p>お名前:{{name}}</p>
    </div>
    <RentalButton :user="currentUser" />
    <div v-show="isReviewExist">
      <p class="subtitle">あなたが書いたレビュー</p>
      <ReviewCards :reviews="reviews" />
      <div class v-show="false">
        <button @click="getMoreReview">もっと見る</button>
      </div>
    </div>
    <div v-show="! isReviewExist">
      <p>まだレビューがありません</p>
    </div>
  </div>
</template>

<script>
import firebase from "@/plugins/firebase";
const db = firebase.firestore();

export default {
  async asyncData() {
    let cUser;
    await firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        cUser = user;
      }
    });

    const reviewsArray = [];
    await db
      .collection("coffees")
      .where("userId", "==", cUser.uid) // TODO:ページネーション
      .where("isReviewExist","==", true)
      .orderBy("reviewRegisteredTime", "desc")
      .limit(25)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          reviewsArray.push(doc.data());
        });
      });
    return { reviews: reviewsArray, currentUser: cUser };
  },

  data() {
    return {
      name: "初期の名前",
      photoURL: "",
    };
  },

  created() {
    if (this.currentUser != null) {
      this.name = this.currentUser.displayName;
      this.photoURL = this.currentUser.photoURL;
    }
  },

  computed: {
    isReviewExist() {
      return this.reviews.length > 0;
    },
  },

  methods: {
    getMoreReview() {},
  },
};
</script>

<style>
.profile-img {
  height: 3em;
}
</style>