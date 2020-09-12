<template>
  <div>
    <button @click="addRentalCoffees()">レンタルサービス初回登録</button>
    <p>レンタルサービスに申込後、上記のボタンを押すことでアプリケーションにコーヒーが登録されます。</p>
  </div>
</template>

<script>
import firebase from "@/plugins/firebase";
const db = firebase.firestore();
const currentUser = firebase.auth().currentUser;

export default {
  data() {
    if (currentUser != null) {
      return {
        // TODO:コーヒーのデータを正しいものに
        coffees: [
          {
            bean_id: 1,
            extractionTime: 3,
            isReviewExist: false,
            powderAmount: 8.2,
            user_id: currentUser.uid,
            waterAmount: 150,
            mesh: "設定されていません",
            waterTemperature: -1,
            extractionMethod_id: 1,
          },
          {
            bean_id: 1,
            extractionTime: 3,
            isReviewExist: false,
            powderAmount: 12.5,
            user_id: currentUser.uid,
            waterAmount: 150,
            mesh: "設定されていません",
            waterTemperature: -1,
            extractionMethod_id: 1,
          },
          {
            bean_id: 1,
            extractionTime: 5,
            isReviewExist: false,
            powderAmount: 8.2,
            user_id: currentUser.uid,
            waterAmount: 150,
            mesh: "設定されていません",
            waterTemperature: -1,
            extractionMethod_id: 1,
          },
          {
            bean_id: 1,
            extractionTime: 5,
            isReviewExist: false,
            powderAmount: 12.5,
            user_id: currentUser.uid,
            waterAmount: 150,
            mesh: "設定されていません",
            waterTemperature: -1,
            extractionMethod_id: 1,
          },
          {
            bean_id: 2,
            extractionTime: 3,
            isReviewExist: false,
            powderAmount: 8.2,
            user_id: currentUser.uid,
            waterAmount: 150,
            mesh: "設定されていません",
            waterTemperature: -1,
            extractionMethod_id: 1,
          },
          {
            bean_id: 2,
            extractionTime: 3,
            isReviewExist: false,
            powderAmount: 12.5,
            user_id: currentUser.uid,
            waterAmount: 150,
            mesh: "設定されていません",
            waterTemperature: -1,
            extractionMethod_id: 1,
          },
          {
            bean_id: 2,
            extractionTime: 5,
            isReviewExist: false,
            powderAmount: 8.2,
            user_id: currentUser.uid,
            waterAmount: 150,
            mesh: "設定されていません",
            waterTemperature: -1,
            extractionMethod_id: 1,
          },
          {
            bean_id: 2,
            extractionTime: 5,
            isReviewExist: false,
            powderAmount: 12.5,
            user_id: currentUser.uid,
            waterAmount: 150,
            mesh: "設定されていません",
            waterTemperature: -1,
            extractionMethod_id: 1,
          },
        ],
      };
    }
  },
  methods: {
    addRentalCoffees() {
      this.coffees.forEach((coffee) => {
        var generatedId = db.collection("coffees").doc().id;
        db.collection("coffees")
          .doc(generatedId)
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
      this.$router.push({ path: "/reviews/create", params: {} });

    },
  },
};
</script>

<style>
</style>