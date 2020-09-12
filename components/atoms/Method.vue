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
    await db
      .collection("methods")
      .doc(String(this.em))
      .get()
      .then((doc) => {
        if (doc.exists) {
          this.unsafeExtractionMethod = doc.data().name;
        }
      });
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