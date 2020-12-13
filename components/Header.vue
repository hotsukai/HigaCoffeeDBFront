<template>
  <div>
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <nuxt-link to="/" class="navbar-item"><img src="/logo.png"/></nuxt-link>
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
            >みる</nuxt-link
          >
          <nuxt-link
            to="/reviews/"
            class="navbar-item"
            :class="{ isSelected: isReadReviewSelected }"
            >よむ</nuxt-link
          >

          <nuxt-link
            to="/reviews/create"
            class="navbar-item"
            :class="{ isSelected: isCreateReviewSelected, notActive: !isLogin }"
            >かく</nuxt-link
          >
          <nuxt-link
            to="/coffees/create"
            class="navbar-item"
            :class="{ isSelected: isCreateCoffeeSelected, notActive: !isLogin }"
            >淹れる</nuxt-link
          >
          <nuxt-link
            to="/mypage"
            class="navbar-item"
            :class="{ isSelected: isMypageSelected, notActive: !isLogin }"
            >マイページ</nuxt-link
          >
          <div class="buttons" v-show="!isLogin">
            <div>
            <nuxt-link to="/signup" class="button">サインアップ</nuxt-link>
            </div>
          </div>
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
      isReadReviewSelected: false,
      isLogin: false
    };
  },

  created() {
    this.changeSelectedPage();
    this.isLogin = this.$store.state.currentUser !== null;
  },
  computed: {
    user() {
      return this.$store.state.currentUser;
    }
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
      this.isReadReviewSelected = false;
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
        case "coffees-create":
          this.isCreateCoffeeSelected = true;
          break;
        case "reviews":
          this.isReadReviewSelected = true;
          break;
        default:
          // console.debug("selected route", this.$route.name);
          break;
      }
    }
  },

  watch: {
    $route() {
      this.isMenuActive = false;
      this.changeSelectedPage();
    },
    user(val) {
      console.debug("val : " + val);
      this.isLogin = val !== null;
    }
  }
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
  color: #eee;
}
.navbar-burger {
  color: #eee;
}

.isSelected {
  font-weight: bold;
}

.notActive {
  color: #aaa;
}
</style>
