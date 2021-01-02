<template>
  <span>{{ convertJapaneseTime }}</span>
</template>

<script lang="ts">
import Vue from "vue"
export default Vue.extend({
  props: { time: { type: String, default: "" }  },
  computed: {
    convertJapaneseTime(): string {
      let date: Date = new Date(this.time);
      date.setHours(date.getHours() - 9);
      return date.toLocaleString("ja").slice(0, -3);
    },
  },
});
</script>

<style></style>
