<template>
  <div>
    <div v-show="isLogin">
      <button @click="logout" type="button" class="button">ログアウト</button>
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
      this.isLogin = val !== null;
    }
  },

  methods: {
    logout() {
      this.$store.commit("deleteUser");
      alert("ログアウトしました");
      location.replace("/");
    }
  }
};
</script>

<style></style>
