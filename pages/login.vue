<template>
  <div>
    <h1>ログイン</h1>
    <div class="field">
      <p class="control">
        <!-- TODO: 合言葉入力フォーム -->
        <GoogleLogin/>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import firebase from "../plugins/firebase";

@Component

export default class LoginPage extends Vue {
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$router.push("/");
      } else {
      }
    });
  }
}

</script>