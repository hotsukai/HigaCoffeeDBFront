<template>
  <div>
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <nuxt-link to="/" class="navbar-item">HiGaCoffeeDBProject</nuxt-link>
        <div
          class="navbar-burger burger"
          data-target="navbarMenu"
          @click="toggleMenu()"
          :class="{ 'is-active': isMenuActive }"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </div>
      </div>
      <div
        class="navbar-menu"
        id="navbarMenu"
        :class="{ 'is-active': isMenuActive }"
      >
        <div class="navbar-end">
          <nuxt-link
            to="/data"
            class="navbar-item"
            :class="{ isSelected: isDataSelected }"
            >データを見る</nuxt-link
          >
          <nuxt-link
            to="/mypage"
            class="navbar-item"
            :class="{ isSelected: isMypageSelected }"
            >マイページ</nuxt-link
          >
          <nuxt-link
            to="/reviews/create"
            class="navbar-item"
            :class="{ isSelected: isCreateReviewSelected }"
            >レビューを書く</nuxt-link
          >
          <nuxt-link
            to="/coffees/create"
            class="navbar-item"
            :class="{ isSelected: isCreateCoffeeSelected }"
            >コーヒーを淹れる</nuxt-link
          >
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
    return {
      isMenuActive: false,
      isDataSelected: false,
      isMypageSelected: false,
      isCreateReviewSelected: false,
      isCreateCoffeeSelected: false,
    };
  },

  created() {
    this.changeSelectedPage();
  },

  methods: {
    toggleMenu() {
      this.isMenuActive = !this.isMenuActive;
    },

    changeSelectedPage() {
      this.isDataSelected = false;
      this.isMypageSelected = false;
      this.isCreateReviewSelected = false;
      this.isCreateCoffeeSelected = false;
      switch (this.$route.name) {
        case "data":
          this.isDataSelected = true;
          break;
        case "mypage":
          this.isMypageSelected = true;
          break;
        case "reviews-create":
          this.isCreateReviewSelected = true;
          break;
        case "coffeescreate":
          this.isCreateCoffeeSelected = true;
          break;
        default:
          console.debug("selected route", this.$route.name);
          break;
      }
    },
  },

  watch: {
    $route() {
      this.isMenuActive = false;
      this.changeSelectedPage();
    },
  },
};
</script>

<style scoped>
.navbar {
  background-color: #303033;
}

.navbar-menu {
  background-color: #303033;
}

.navbar-item {
  color: #e1dfdb;
}

.isSelected {
  font-weight: bold;
}
</style>