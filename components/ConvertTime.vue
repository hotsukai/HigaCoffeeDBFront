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
      return date.toLocaleString("ja");
    }
  }
};
</script>

<style></style>
