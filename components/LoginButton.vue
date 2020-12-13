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
      this.isLogin = val !== null;
    }
  },

  methods: {
    async logout() {
      await this.$axios
        .$get(`/auth/logout`)
        .then(response => {
          if (response.result) {
            this.$store.commit("deleteUser");
            alert("ログアウトしました");
            this.$router.push("/");
            return true;
          } else {
            return false;
          }
        })
        .catch(err => {
          console.error("error 1 : ", err.message);
          return false;
        });
    }
  }
};
</script>

<style></style>
