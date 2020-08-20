<template>
  <div class="container">
    <h1>トップページ</h1>
    <div v-if="isLogin">
      <p>ログイン中</p>
      <button @click="logout">ログアウト</button>
    </div>
  </div>
</template>

<script lang="ts">
</script>

<style>
</style>
