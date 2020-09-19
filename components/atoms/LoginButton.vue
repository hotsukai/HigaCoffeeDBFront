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

<script>
import firebase from "@/plugins/firebase"
export default {
  data(){
    return{
      isLogin: false,
    }
  },

  async mounted() {
    await firebase
      .auth()
      .onAuthStateChanged((user) => (this.isLogin = user ? true : false));
  },
  
  methods:{
    async logout() {
      await firebase.auth().signOut();
      this.$router.push("/");
    }
  }
}
</script>

<style>
</style>