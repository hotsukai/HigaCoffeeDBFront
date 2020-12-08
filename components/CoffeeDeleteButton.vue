<template>
  <button class="button is-danger" @click="confirmDelete()">削除</button>
</template>

<script>
import firebase from "@/plugins/firebase";
const db = firebase.firestore();

export default {
  props: ["coffee"],

  data() {
    return {
      currentUser: null,
    };
  },

  created() {
    this.currentUser = firebase.auth().currentUser;
  },

  methods: {
    deleteCoffee() {
      let batch = db.batch();

      let coffeeDoc = db.collection("coffees").doc(this.coffee.id);
      batch.delete(coffeeDoc);

      let usersDoc = db.collection("users").doc(this.currentUser.uid);
      batch.update(usersDoc, {
        coffees: firebase.firestore.FieldValue.arrayRemove(this.coffee.id),
      });

      let datasDoc = db
        .collection("datas")
        .doc("all")
        .collection("datas")
        .doc(String(this.coffee.beanId));
      batch.update(datasDoc, {
        countCoffees: firebase.firestore.FieldValue.increment(-1),
      });

      let userDatasDoc = db
        .collection("datas")
        .doc(this.currentUser.uid)
        .collection("datas")
        .doc(String(this.coffee.beanId));
      batch.update(userDatasDoc, {
        countCoffees: firebase.firestore.FieldValue.increment(-1),
      });

      batch
        .commit()
        .then(function () {
          alert("コーヒーを削除しました");
        })
        .catch(function (error) {
          alert("コーヒーの削除に失敗しました", error);
          console.error("Error removing document: ", error);
        });
    },

    async confirmDelete() {
      var answer = window.confirm(this.coffee.id + "のコーヒーを削除します");
      console.debug("cu", this.currentUser);
      if (answer === true && this.currentUser !== null) {
        await this.deleteCoffee();
        this.$router.push("/mypage");
      }
    },
  },
};
</script>

<style>
</style>