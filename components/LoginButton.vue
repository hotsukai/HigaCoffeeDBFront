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

<script lang="ts">
import Vue from "vue";
import { User } from "~/types/models";

export default Vue.extend({
  data(): { isLogin: boolean } {
    return {
      isLogin: false,
    };
  },

  computed: {
    user(): User {
      return this.$store.state.currentUser;
    },
  },

  watch: {
    user(val: User) {
      this.isLogin = val !== null;
    },
  },

  created() {
    this.isLogin = this.$store.state.currentUser !== null;
  },

  methods: {
    logout(): void {
      this.$store.commit("deleteUser");
      this.$toast.success("ログアウトしました");
      location.replace("/");
    },
  },
});
</script>

<style></style>
