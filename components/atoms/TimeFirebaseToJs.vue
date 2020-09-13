<template>
  <span>{{shapeTime}}</span>
</template>

<script>
export default {
  props: ["time"],

  computed: {
    shapeTime() {
      var jsTime = this.time.toDate();
      return (
        jsTime.getFullYear() +
        "/" +
        jsTime.getMonth() +
        "/" +
        jsTime.getDate() +
        " " +
        jsTime.getHours() +
        ":" +
        jsTime.getMinutes()
      );
    },
  },
};
</script>

<style>
</style>