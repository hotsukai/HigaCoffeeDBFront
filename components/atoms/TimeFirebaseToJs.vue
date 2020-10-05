<template>
  <span>{{ shapeTime }}</span>
</template>

<script>
export default {
  props: ["time"],
  data() {
    return { shapeTime: null };
  },
  created() {
    if (this.time) {
      let jsTime = this.time.toDate();
      this.shapeTime =
        jsTime.getFullYear() +
        "/" +
        jsTime.getMonth() +
        "/" +
        jsTime.getDate() +
        " " +
        jsTime.getHours() +
        ":" +
        jsTime.getMinutes();
    }
  },
};
</script>

<style>
</style>