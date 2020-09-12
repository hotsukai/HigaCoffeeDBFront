<template>
  <div>
    <button @click="addRentalCoffees()">レンタルサービス初回登録。</button>
    <p>レンタルサービスに申込後、上記のボタンを押すことでアプリケーションにコーヒーが登録されます。</p>
  </div>
</template>

<script>
import firebase from "@/plugins/firebase";
const db = firebase.firestore();
const currentUser = firebase.auth().currentUser;
console.debug("before export :", currentUser.uid);

export default {
  data() {
    return {
      // TODO:コーヒーのデータを正しいものに
      coffees: [
        {
          bean_id: 1,
          extractionTime: 3,
          isReviewExist: false,
          powderAmount: 12,
          user_id: currentUser.uid,
          waterAmount: 120,
          extractionMethod_id: 1,
        },
        {
          bean_id: 1,
          extractionTime: 3,
          isReviewExist: false,
          powderAmount: 12,
          user_id: currentUser.uid,
          waterAmount: 120,
        },
        {
          bean_id: 1,
          extractionTime: 3,
          isReviewExist: false,
          powderAmount: 12,
          user_id: currentUser.uid,
          waterAmount: 120,
        },
        {
          bean_id: 1,
          extractionTime: 3,
          isReviewExist: false,
          powderAmount: 12,
          user_id: currentUser.uid,
          waterAmount: 120,
        },
        {
          bean_id: 1,
          extractionTime: 3,
          isReviewExist: false,
          powderAmount: 12,
          user_id: currentUser.uid,
          waterAmount: 120,
        },
        {
          bean_id: 1,
          extractionTime: 3,
          isReviewExist: false,
          powderAmount: 12,
          user_id: currentUser.uid,
          waterAmount: 120,
        },
        {
          bean_id: 1,
          extractionTime: 3,
          isReviewExist: false,
          powderAmount: 12,
          user_id: currentUser.uid,
          waterAmount: 120,
        },
        {
          bean_id: 1,
          extractionTime: 3,
          isReviewExist: false,
          powderAmount: 12,
          user_id: currentUser.uid,
          waterAmount: 120,
        },
        {
          bean_id: 1,
          extractionTime: 3,
          isReviewExist: false,
          powderAmount: 12,
          user_id: currentUser.uid,
          waterAmount: 120,
        },
      ],
    };
  },
  methods: {
    addRentalCoffees() {
      this.coffees.forEach((coffee) => {
       var  generatedId = db.collection("coffees").doc().id;
        console.debug("gId:",generatedId)
        db.collection("coffees").doc(generatedId)
          .set({
            id: generatedId,
            bean_id: coffee.bean_id,
            extractionTime: coffee.extractionTime,
            isReviewExist: coffee.isReviewExist,
            powderAmount: coffee.powderAmount,
            user_id: currentUser.uid,
            waterAmount: coffee.waterAmount,
            extractionMethod_id: 1,
          })
          .then(function () {})
          .catch(function (error) {
            alert("エラーが発生しました : ", error);
            console.log("ERROR : rental button ", error);
          });
      });
      alert("レンタルサービスのコーヒーのレビューがかけるようになりました。");
      // TODO:レビューページへ
    },
  },
};
</script>

<style>
</style>