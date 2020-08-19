<template>
    <a class="googleLogin" @click="signInWithGoogleRedirect">グーグルでログイン </a>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import firebase from "../plugins/firebase"

const googleProvider = new firebase.auth.GoogleAuthProvider()
export default class GoogleLogin extends Vue {
  public signInWithGoogleRedirect () {
    firebase.auth().signInWithRedirect(googleProvider);
  }
}
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