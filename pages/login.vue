<template>
  <div>
    <h1 class="title">ログイン</h1>
    <div class="field">
      <div class="control">
        <input v-model="inputSecretWord" placeholder="合言葉は？？" type="password" />
        <button class="button is-primary" @click="checkSecretWord">認証</button>
        <div v-if="isSecretWordCorrect">
          <GoogleLogin />
        </div>
        <div v-show="isWordIncorrect">
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
      isSecretWordCorrect: false,
      isWordIncorrect: false,
    };
  },

  async created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$router.push("/");
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

  methods: {
    checkSecretWord() {
      if (this.secretWord === this.inputSecretWord) {
        this.isSecretWordCorrect = true;
        this.isWordIncorrect = false;
      } else {
        this.isWordIncorrect = true;
      }
    },
  },
};
</script>