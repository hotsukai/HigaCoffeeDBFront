<template>
  <span>{{wtData}}</span>
</template>

<script>
export default {
  props: ["wt"],
  computed: {
    wtData() {
      if (this.wt < 0 || this.wt == null) {
        return "設定されていません";
      } else {
        return this.wt+"℃";
      }
    },
  },
};
</script>

<style>
</style>