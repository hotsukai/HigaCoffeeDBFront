<template>
  <div>
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-menu">
        <div class="navbar-start">
          <nuxt-link to="/" class="navbar-item">トップへ</nuxt-link>
          <a class="navbar-item">データを見る</a>
          <!--TODO: データページ作成-->
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <nuxt-link to="/mypage" class="navbar-item">マイページ</nuxt-link>
            <nuxt-link to="/reviews/create" class="navbar-item">レビューを書く</nuxt-link>
            <nuxt-link to="/coffees/create" class="navbar-item">コーヒーを淹れる</nuxt-link>
            <div class="buttons">
              <LoginButton />
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component({
  layout: "default",
  components: {},
})
export default class HeaderComponents extends Vue {}
</script>

<style scoped>
.navbar-menu {
  background-color: darkgoldenrod;
}
</style>