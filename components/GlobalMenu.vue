<template>
  <Slide :close-on-navigation="true">
    <nuxt-link to="/" :class="{ isSelected: isDataSelected }" class="top">
      トップ</nuxt-link
    >
    <nuxt-link to="/data" :class="{ isSelected: isDataSelected }" class="data">
      みる</nuxt-link
    >

    <nuxt-link
      to="/reviews/"
      :class="{ isSelected: isReadReviewSelected }"
      class="reviews"
    >
      よむ</nuxt-link
    >

    <nuxt-link
      to="/reviews/create"
      :class="{ isSelected: isCreateReviewSelected, notActive: !isLogin }"
      class="reviews-create"
    >
      かく</nuxt-link
    >

    <nuxt-link
      to="/coffees/create"
      :class="{ isSelected: isCreateCoffeeSelected, notActive: !isLogin }"
      class="coffees-create"
    >
      いれる</nuxt-link
    >

    <a
      :class="{ isSelected: isMypageSelected, notActive: !isLogin }"
      class="mypage"
      @click="toMypage"
    >
      マイページ</a
    >
    <LoginButton />
    <div v-show="!isLogin">
      <button type="button" class="button" @click="$router.push('/signup')">
        サインアップ
      </button>
    </div>
  </Slide>
</template>

<script lang="ts">
import Vue from "vue";
import { User } from "~/types/models";
export default Vue.extend({
  data(): {
    isMenuActive: boolean;
    isDataSelected: boolean;
    isMypageSelected: boolean;
    isCreateReviewSelected: boolean;
    isCreateCoffeeSelected: boolean;
    isReadReviewSelected: boolean;
    isLogin: boolean;
  } {
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
  computed: {
    user(): User {
      return this.$store.state.currentUser;
    },
  },

  watch: {
    $route(): void {
      this.isMenuActive = false;
      this.changeSelectedPage();
    },
    user(val: User): void {
      this.isLogin = val !== null;
    },
  },

  created(): void {
    this.changeSelectedPage();
    this.isLogin = this.$store.state.currentUser !== null;
  },

  methods: {
    toggleMenu(): void {
      this.isMenuActive = !this.isMenuActive;
    },

    changeSelectedPage(): void {
      this.isDataSelected = false;
      this.isMypageSelected = false;
      this.isCreateReviewSelected = false;
      this.isCreateCoffeeSelected = false;
      this.isReadReviewSelected = false;
      switch (this.$route.name) {
        case "data":
          this.isDataSelected = true;
          break;
        case "'users/' + this.$store.state.currentUser.id":
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
    toMypage(): void {
      if (this.$store.state.currentUser)
        this.$router.push("/users/" + this.$store.state.currentUser.id);
      else {
        this.$toast.show("ログインが必要です");
        this.$router.push("/login");
      }
    },
  },
});
</script>

<style scoped lang="scss">
.isSelected {
  font-weight: bold;
}

.notActive {
  opacity: 0.3;
}

.top::before {
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  margin-right: 0.3em;
  content: "\f015";
}

.data::before {
  font-family: "Font Awesome 5 Free";
  margin-right: 0.3em;
  font-weight: 900;
  content: "\f080";
}

.reviews::before {
  font-family: "Font Awesome 5 Free";
  margin-right: 0.3em;
  font-weight: 900;
  content: "\f518";
}

.reviews-create::before {
  font-family: "Font Awesome 5 Free";
  margin-right: 0.3em;
  font-weight: 900;
  content: "\f304";
}

.coffees-create::before {
  font-family: "Font Awesome 5 Free";
  margin-right: 0.3em;
  font-weight: 900;
  content: "\f253";
}
.mypage::before {
  font-family: "Font Awesome 5 Free";
  margin-right: 0.3em;
  font-weight: 900;
  content: "\f007";
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
