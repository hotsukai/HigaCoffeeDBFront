<template>
  <a class="googleLogin" @click="signInWithGooglePopup">グーグルでログイン</a>
</template>

<script>
import firebase from "@/plugins/firebase";

const googleProvider = new firebase.auth.GoogleAuthProvider();
var db = firebase.firestore();

export default {
  methods: {
    async signInWithGooglePopup() {
      let user;
      await firebase
        .auth()
        .signInWithPopup(googleProvider)
        .then((result) => {
          user = result.user;
        });

      let batch = db.batch();

      let usersDoc = db.collection("users").doc(user.uid);
      batch.set(usersDoc, {
        uid: user.uid,
        name: user.displayName,
        reviews: [],
        coffees: [],
      });

      let usersDatasDoc = db.collection("datas").doc(user.uid);
      for (let i = 1; i <= 8; i++) {
        batch.set(usersDatasDoc.collection("datas").doc(String(i)), {});
      }

      batch.commit().then(() => {
        this.$router.push("/mypage");
      }).catch(err =>{
        alert("エラーが発生しました : ",err)
        console.warn(err)
      })
    },
  },
};
</script>


<style scoped>
a.googleLogin {
  display: block;
  cursor: pointer;
  width: 191px;
  height: 46px;
  margin: 0 auto;
}
</style>