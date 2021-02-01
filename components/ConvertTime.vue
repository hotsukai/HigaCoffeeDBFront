<template>
  <span>{{ convertJapaneseTime }}</span>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    time: {
      type: String,
      default: "",
    },
  },
  computed: {
    /**受け取ったGMT文字列を表示する時間文字列に変更
     *  @param {void}
     * this.time - "Mon, 01 Feb 2021 01:18:32 GMT"
     *  @return {string} - 2021/2/1 10:18
     */
    convertJapaneseTime(): string {
      return new Date(this.time).toLocaleString("ja").slice(0, -3);
    },
  },
});
</script>

<style></style>
