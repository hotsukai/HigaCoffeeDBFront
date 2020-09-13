<template>
  <div>
    <button @click="addRentalCoffees()" class="button">レンタルサービス初回登録</button>
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
            beanId: 1,
            extractionTime: 3,
            isReviewExist: false,
            powderAmount: 8.2,
            userId: currentUser.uid,
            waterAmount: 150,
            mesh: "設定されていません",
            waterTemperature: -1,
            extractionMethodId: 1,
          },
          {
            beanId: 1,
            extractionTime: 3,
            isReviewExist: false,
            powderAmount: 12.5,
            userId: currentUser.uid,
            waterAmount: 150,
            mesh: "設定されていません",
            waterTemperature: -1,
            extractionMethodId: 1,
          },
          {
            beanId: 1,
            extractionTime: 5,
            isReviewExist: false,
            powderAmount: 8.2,
            userId: currentUser.uid,
            waterAmount: 150,
            mesh: "設定されていません",
            waterTemperature: -1,
            extractionMethodId: 1,
          },
          {
            beanId: 1,
            extractionTime: 5,
            isReviewExist: false,
            powderAmount: 12.5,
            userId: currentUser.uid,
            waterAmount: 150,
            mesh: "設定されていません",
            waterTemperature: -1,
            extractionMethodId: 1,
          },
          {
            beanId: 2,
            extractionTime: 3,
            isReviewExist: false,
            powderAmount: 8.2,
            userId: currentUser.uid,
            waterAmount: 150,
            mesh: "設定されていません",
            waterTemperature: -1,
            extractionMethodId: 1,
          },
          {
            beanId: 2,
            extractionTime: 3,
            isReviewExist: false,
            powderAmount: 12.5,
            userId: currentUser.uid,
            waterAmount: 150,
            mesh: "設定されていません",
            waterTemperature: -1,
            extractionMethodId: 1,
          },
          {
            beanId: 2,
            extractionTime: 5,
            isReviewExist: false,
            powderAmount: 8.2,
            userId: currentUser.uid,
            waterAmount: 150,
            mesh: "設定されていません",
            waterTemperature: -1,
            extractionMethodId: 1,
          },
          {
            beanId: 2,
            extractionTime: 5,
            isReviewExist: false,
            powderAmount: 12.5,
            userId: currentUser.uid,
            waterAmount: 150,
            mesh: "設定されていません",
            waterTemperature: -1,
            extractionMethodId: 1,
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
            beanId: coffee.beanId,
            extractionTime: coffee.extractionTime,
            isReviewExist: coffee.isReviewExist,
            powderAmount: coffee.powderAmount,
            userId: currentUser.uid,
            waterAmount: coffee.waterAmount,
            extractionMethodId: 1,
            createdTime:firebase.firestore.FieldValue.serverTimestamp()
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