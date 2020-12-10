<template>
  <div>
    <div v-show="isLogin">
      <button @click="logout" class="button">ログアウト</button>
    </div>
    <div v-show="!isLogin">
      <nuxt-link to="/login" class="button">ログイン</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLogin: false
    };
  },

  computed: {
    user() {
      return this.$store.state.currentUser;
    }
  },

  created() {
    this.isLogin = this.$store.state.currentUser !== null;
  },

  watch: {
    user(val) {
      console.debug("val : " + val);
      this.isLogin = val !== null;
    }
  },

  methods: {
    async logout() {
      await this.$store.dispatch("logout").then(res => {
        if (res) {
          alert("ログアウトしました");
          this.$router.push("/");
        }
      });
    }
  }
};
</script>

<style></style>
