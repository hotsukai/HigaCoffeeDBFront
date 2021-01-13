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

<script lang="ts">
import Vue, { PropType } from "vue";
import { User } from "~/types/models";
export default Vue.extend({
  props: {
    users: { type: Array as PropType<User[]>, default: () => [] },
  },
});
</script>

<style>
</style>