<template>
  <div>
    <div v-show="isLogin">
      <button type="button" class="button" @click="logout">ログアウト</button>
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

  watch: {
    user(val) {
      this.isLogin = val !== null;
    }
  },

  created() {
    this.isLogin = this.$store.state.currentUser !== null;
  },

  methods: {
    logout() {
      this.$store.commit("deleteUser");
     this.$toast.success("ログアウトしました");
      location.replace("/");
    }
  }
};
</script>

<style></style>
