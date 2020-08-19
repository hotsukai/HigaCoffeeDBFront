<template>
  <div>
    <div v-if="isLogin">
      <button @click="logout" class="button">ログアウト</button>
    </div>
    <div v-else>
      <nuxt-link to="login" class="button">ログイン</nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import firebase from "@/plugins/firebase";
@Component({
  layout: "default",
  components: {},
})
export default class LogginButton extends Vue {
  isLogin: boolean = false;
  async mounted() {
    await firebase
      .auth()
      .onAuthStateChanged((user) => (this.isLogin = user ? true : false));
  }
  async logout() {
    await firebase.auth().signOut();
    this.$router.push("/");
  }
}
</script>

<style>
</style>