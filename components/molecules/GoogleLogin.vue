<template>
  <a class="googleLogin" @click="signInWithGooglePopup">グーグルでログイン</a>
</template>

<script>
import firebase from "@/plugins/firebase";

const googleProvider = new firebase.auth.GoogleAuthProvider();
var db = firebase.firestore();
export default {
  methods: {
    sendUser(user) {
      db.collection("users")
        .doc(user.uid)
        .set({
          uid: user.uid,
          name: user.displayName,
          reviews: [], //TODO:新規ログインのたびに初期化されてしまう。
        })
        .then(function () {
          console.log("add user data ");
        })
        .catch(function (error) {
          console.error("Error adding document: ", error);
        });
    },

    signInWithGooglePopup() {
      firebase
        .auth()
        .signInWithPopup(googleProvider)
        .then((result) => {
          var user = result.user;
          console.log(user);
          this.sendUser(user);
          this.$router.push("/mypage");
        });
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