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
export default class IndexPage extends Vue {}
</script>

<style>
</style>