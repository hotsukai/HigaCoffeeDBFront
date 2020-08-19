<template>
  <div>
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-menu">
        <div class="navbar-start">
          <nuxt-link to="index" class="navbar-item">トップへ</nuxt-link>
          <a class="navbar-item">マイページ</a>
          <a class="navbar-item">レビューを見る</a>
          <a class="navbar-item">データを見る</a>
          <a class="navbar-item">レビューを書く</a>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <a class="button is-primary">
                <strong>登録</strong>
              </a>
              <div v-if="isLogin">
                <button @click="logout" class="button">ログアウト</button>
              </div>
              <div v-else>
                <nuxt-link to="login" class="button">ログイン</nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { auth } from "../plugins/firebase";
@Component({
  layout: "default",
  components: {},
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
</style>