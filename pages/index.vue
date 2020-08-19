<template>
  <div class="container">
    <h1>トップページ</h1>
    <div v-if="isLogin">
      <p>ログイン中</p>
      <button @click="logout">ログアウト</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { auth } from "../plugins/firebase";
@Component({
  layout: 'default',
  components: {
  }
})

export default class IndexPage extends Vue {
  isLogin: boolean = false;
  async mounted() {
    await auth.onAuthStateChanged(
      (user) => (this.isLogin = user ? true : false)
    );
  }
  async logout() {
    await auth.signOut();
    this.$router.push("/login");
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
