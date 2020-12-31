<template>
  <div v-if="users">
    <slot />
    <span v-for="(user, index) in users" :key="user.id">
      <span v-if="index != 0">,</span>
      <nuxt-link :to="'/users/' + user.id">
        {{ user.name }}
      </nuxt-link>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    users: { type: Array, default: new Array() },
  },
};
</script>

<style>
</style>