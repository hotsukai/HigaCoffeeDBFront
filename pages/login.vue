<template>
  <div>
    <h1>ログイン</h1>
    <div class="field">
      <div class="control">
        <input v-model="inputSecretWord" placeholder="合言葉は？？" type="password" />
        <div v-if="isSecretWordCorrect">
          <GoogleLogin />
        </div>
        <div v-else>
          <p>合言葉が間違っています</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";
import firebase from "@/plugins/firebase";
const db = firebase.firestore();

export default {
  data() {
    return {
      inputSecretWord: "",
      secretWord: "",
    };
  },

  async mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$router.push("/");
      } else {
      }
    });

    await db
      .collection("secretWord")
      .doc("2020")
      .get()
      .then((doc) => {
        if (doc.exists) {
          this.secretWord = doc.data().secretWord;
        }
      });
  },

  computed: {
    isSecretWordCorrect() {
      return this.secretWord === this.inputSecretWord;
    },
  },
};
</script>