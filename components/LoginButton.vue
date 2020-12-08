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
      isLogin: false,
    };
  },

  async created() {
    let user=true
    this.isLogin = user ? true : false
  },

  methods: {
    async logout() {
      
      alert("ログアウトしました。")
      this.$router.push("/");
    },
  },
};
</script>

<style>
</style>