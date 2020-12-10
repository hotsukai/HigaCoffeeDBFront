<template>
  <div>
    <button @click="addRentalCoffees()" class="button">
      レンタルサービス初回登録
    </button>
    <p>
      レンタルサービスに申込後、上記のボタンを押すことでアプリケーションにコーヒーが登録されます。
    </p>
  </div>
</template>

<script>
import firebase from "@/plugins/firebase";
const db = firebase.firestore();
const currentUser = firebase.auth().currentUser;

export default {
  props: ["user"],

  data() {
    return {
      // TODO:コーヒーのデータを正しいものに
      coffees: [
        {
          beanId: 3,
          extractionTime: 3,
          isReviewExist: false,
          powderAmount: 8.2,
          userId: this.user.uid,
          waterAmount: 150,
          mesh: "設定されていません",
          waterTemperature: -1,
          extractionMethodId: 1,
        },
        {
          beanId: 3,
          extractionTime: 3,
          isReviewExist: false,
          powderAmount: 8.2,
          userId: this.user.uid,
          waterAmount: 150,
          mesh: "設定されていません",
          waterTemperature: -1,
          extractionMethodId: 1,
        },
        {
          beanId: 3,
          extractionTime: 5,
          isReviewExist: false,
          powderAmount: 12.5,
          userId: this.user.uid,
          waterAmount: 150,
          mesh: "設定されていません",
          waterTemperature: -1,
          extractionMethodId: 1,
        },
        {
          beanId: 3,
          extractionTime: 5,
          isReviewExist: false,
          powderAmount: 12.5,
          userId: this.user.uid,
          waterAmount: 150,
          mesh: "設定されていません",
          waterTemperature: -1,
          extractionMethodId: 1,
        },
        {
          beanId: 4,
          extractionTime: 3,
          isReviewExist: false,
          powderAmount: 8.2,
          userId: this.user.uid,
          waterAmount: 150,
          mesh: "設定されていません",
          waterTemperature: -1,
          extractionMethodId: 1,
        },
        {
          beanId: 4,
          extractionTime: 3,
          isReviewExist: false,
          powderAmount: 8.2,
          userId: this.user.uid,
          waterAmount: 150,
          mesh: "設定されていません",
          waterTemperature: -1,
          extractionMethodId: 1,
        },
        {
          beanId: 4,
          extractionTime: 5,
          isReviewExist: false,
          powderAmount: 12.5,
          userId: this.user.uid,
          waterAmount: 150,
          mesh: "設定されていません",
          waterTemperature: -1,
          extractionMethodId: 1,
        },
        {
          beanId: 4,
          extractionTime: 5,
          isReviewExist: false,
          powderAmount: 12.5,
          userId: this.user.uid,
          waterAmount: 150,
          mesh: "設定されていません",
          waterTemperature: -1,
          extractionMethodId: 1,
        },
      ],
    };
  },

  methods: {
    async addRentalCoffees() {
      if (this.user != null) {
        var batch = db.batch();

        await this.coffees.forEach((coffee) => {
          var generatedId = db.collection("coffees").doc().id;
          var coffeesDoc = db.collection("coffees").doc(generatedId);
          coffee.id = generatedId;
          coffee.registeredTime = firebase.firestore.FieldValue.serverTimestamp();
          batch.set(coffeesDoc, coffee);

          let usersDoc = db.collection("users").doc(this.user.uid);
          batch.update(usersDoc, {
            coffees: firebase.firestore.FieldValue.arrayUnion(generatedId),
          });

          let datasDoc = db
            .collection("datas")
            .doc("all")
            .collection("datas")
            .doc(String(coffee.beanId));
          batch.update(datasDoc, {
            countCoffees: firebase.firestore.FieldValue.increment(1),
          });

          let userDatasDoc = db
            .collection("datas")
            .doc(this.user.uid)
            .collection("datas")
            .doc(String(coffee.beanId));
          batch.update(userDatasDoc, {
            countCoffees: firebase.firestore.FieldValue.increment(1),
          });
        });

        batch
          .commit()
          .then(() => {
            alert(
              "レンタルサービスのコーヒーのレビューがかけるようになりました。"
            );
            this.$router.push({ path: "/reviews/create", params: {} });
          })
          .catch((error) => {
            alert("エラーが発生しました : ", error);
            console.warn("ERROR : rental button ", error);
          });
      } else {
        alert("ログインしてください");
        this.$router.push({ path: "/login", params: {} });
      }
    },
  },
};
</script>

<style>
</style>