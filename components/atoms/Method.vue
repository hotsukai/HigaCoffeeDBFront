<template>
  <span>{{extractionMethod}}</span>
</template>

<script>
import firebase from "@/plugins/firebase";
const db = firebase.firestore();
export default {
  props: ["em"],
  data() {
    return {
      unsafeExtractionMethod: "",
    };
  },
  async mounted() {
    this.unsafeExtractionMethod = this.$extractionMethods[this.em - 1];
    
  },
  computed: {
    extractionMethod() {
      if (
        this.unsafeExtractionMethod > 0 ||
        this.unsafeExtractionMethod != null
      ) {
        return this.unsafeExtractionMethod;
      } else {
        return "設定されていません";
      }
    },
  },
};
</script>

<style>
</style>