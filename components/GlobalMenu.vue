<template>
  <Slide :closeOnNavigation="true">
      <nuxt-link to="/" :class="{ isSelected: isDataSelected }"
      ><i class="fas fa-home"></i>　トップ</nuxt-link
    >
    <nuxt-link to="/data" :class="{ isSelected: isDataSelected }"
      ><i class="far fa-chart-bar"></i>　みる</nuxt-link
    >

    <nuxt-link to="/reviews/" :class="{ isSelected: isReadReviewSelected }"
      ><i class="fas fa-book"></i>　よむ</nuxt-link
    >

    <nuxt-link
      to="/reviews/create"
      :class="{ isSelected: isCreateReviewSelected, notActive: !isLogin }"
      ><i class="fas fa-pen"></i>　かく</nuxt-link
    >

    <nuxt-link
      to="/coffees/create"
      :class="{ isSelected: isCreateCoffeeSelected, notActive: !isLogin }"
      ><i class="fas fa-hourglass-half"></i>　いれる</nuxt-link
    >

    <nuxt-link
      to="/mypage"
      :class="{ isSelected: isMypageSelected, notActive: !isLogin }"
      ><i class="fas fa-user"></i>　マイページ</nuxt-link
    >
    <LoginButton />
    <div v-show="!isLogin">
      <button @click="$router.push('/signup')" type="button" class="button">
        サインアップ
      </button>
    </div>
  </Slide>
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
      isLogin: false,
    };
  },

  created() {
    this.changeSelectedPage();
    this.isLogin = this.$store.state.currentUser !== null;
  },
  computed: {
    user() {
      return this.$store.state.currentUser;
    },
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
          break;
      }
    },
  },

  watch: {
    $route() {
      this.isMenuActive = false;
      this.changeSelectedPage();
    },
    user(val) {
      this.isLogin = val !== null;
    },
  },
};
</script>

<style scoped lang="scss">

.isSelected {
  font-weight: bold;
}

.notActive {
 opacity: 0.3;
}
// <Slide>にスタイル指定。
::v-deep {
  .bm-burger-button {
    position: fixed;
    width: 36px;
    height: 30px;
    left: 1.5em;
    top: 25px;
    cursor: pointer;
    z-index: 100;
  }
  .bm-burger-bars {
    background-color: #373a47;
  }
  .line-style {
    position: absolute;
    height: 20%;
    left: 0;
    right: 0;
  }
  .cross-style {
    position: absolute;
    top: 12px;
    right: 2px;
    cursor: pointer;
  }
  .bm-cross {
    background: #bdc3c7;
  }
  .bm-cross-button {
    height: 24px;
    width: 24px;
  }
  .bm-menu {
    height: 100%; /* 100% Full-height */
    width: 0; /* 0 width - change this with JavaScript */
    position: fixed; /* Stay in place */
    z-index: 1000; /* Stay on top */
    top: 0;
    left: 0;
    background-color: #eeeeee; /* Black*/
    overflow-x: hidden; /* Disable horizontal scroll */
    padding-top: 60px; /* Place content 60px from the top */
    transition: 0.5s; /*0.5 second transition effect to slide in the sidenav*/
  }

  .bm-overlay {
    background: rgba(0, 0, 0, 0.3);
  }
  .bm-item-list {
    color: #b8b7ad;
    margin-left: 10%;
    font-size: 20px;
  }
  .bm-item-list > * {
    display: flex;
    text-decoration: none;
    padding: 0.7em;
  }
  .bm-item-list > * > span {
    margin-left: 10px;
    font-weight: 700;
    color: white;
  }
}
</style>
