<template>
  <div>
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <nuxt-link to="/" class="navbar-item">HiGaCoffeeDBProject</nuxt-link>
        <div
          class="navbar-burger burger"
          data-target="navbarMenu"
          @click="toggleMenu()"
          :class="{'is-active':isMenuActive}"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </div>
      </div>
      <div class="navbar-menu" id="navbarMenu" :class="{'is-active':isMenuActive}">
        <div class="navbar-end">
          <nuxt-link to="/data" class="navbar-item">データを見る</nuxt-link>
          <!--TODO: データページ作成-->
          <nuxt-link to="/mypage" class="navbar-item">マイページ</nuxt-link>
          <nuxt-link to="/reviews/create" class="navbar-item">レビューを書く</nuxt-link>
          <nuxt-link to="/coffees/create" class="navbar-item">コーヒーを淹れる</nuxt-link>
          <div class="buttons">
            <LoginButton />
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data: () => {
    return { isMenuActive: false };
  },
  
  methods: {
    toggleMenu() {
      this.isMenuActive = !this.isMenuActive;
    },
  },

  watch: {
    '$route' () {
      this.isMenuActive = false
    }
  }
};
</script>

<style scoped>
.navbar {
  background-color: #34bb81;
}
</style>