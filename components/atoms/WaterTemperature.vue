<template>
  <span>{{wtData}}</span>
</template>

<script>
export default {
  props: ["wt"],
  computed: {
    wtData() {
        console.debug(this.wt)
      if (this.wt < 0 || this.wt == null) {
        return "設定されていません";
      } else {
        return wt;
      }
    },
  },
};
</script>

<style>
</style>