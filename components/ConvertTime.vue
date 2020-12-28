<template>
  <span>{{ convertJapaneseTime }}</span>
</template>

<script>
export default {
  props: ["time"],
  computed: {
    convertJapaneseTime() {
      let date = new Date(this.time);
      date.setHours(date.getHours() - 9);
      return date.toLocaleString("ja").slice(0, -3);
    },
  },
};
</script>

<style></style>
