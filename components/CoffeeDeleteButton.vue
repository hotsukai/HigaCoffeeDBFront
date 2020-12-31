<template>
  <button class="button is-danger" @click="confirmDelete()">削除</button>
</template>

<script>
// export default {
//   props: ["coffee"],

//   data() {
//     return {
//       currentUser: null,
//     };
//   },

//   created() {
//   },

//   methods: {
//     deleteCoffee() {
//       let batch = db.batch();

//       let coffeeDoc = db.collection("coffees").doc(this.coffee.id);
//       batch.delete(coffeeDoc);

//       let usersDoc = db.collection("users").doc(this.currentUser.uid);
//       batch.update(usersDoc, {
//       });

//       let datasDoc = db
//         .collection("datas")
//         .doc("all")
//         .collection("datas")
//         .doc(String(this.coffee.beanId));
//       batch.update(datasDoc, {
//       });

//       let userDatasDoc = db
//         .collection("datas")
//         .doc(this.currentUser.uid)
//         .collection("datas")
//         .doc(String(this.coffee.beanId));
//       batch.update(userDatasDoc, {
//       });

//       batch
//         .commit()
//         .then(function () {
//           this.$toast.success("コーヒーを削除しました");
//         })
//         .catch(function (error) {
//           this.$toast.error("コーヒーの削除に失敗しました", error);
//           console.error("Error removing document: ", error);
//         });
//     },

//     async confirmDelete() {
//       var answer = window.confirm(this.coffee.id + "のコーヒーを削除します");
//       if (answer === true && this.currentUser !== null) {
//         await this.deleteCoffee();
//         this.$router.push("/mypage");
//       }
//     },
//   },
// };
</script>

<style>
</style>