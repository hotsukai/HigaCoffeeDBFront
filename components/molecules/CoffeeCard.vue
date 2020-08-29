<template>
  <div class="card">
    <div class="card-content">
      <p class="title">{{beanData.name}}{{beanData.roast}}</p>
      <p class="subtitle">ID; {{coffee.id}}</p>
      <ul>
        <li>蒸らし時間:{{coffee.extractionTime}}min</li>
        <li>粉の量:{{coffee.powderAmount}}g</li>
        <li>水の量 :{{coffee.waterAmount}}ml</li>
      </ul>
    </div>
    <footer class="card-footer">
      <p class="card-footer-item">
        <span>
          このコーヒーの
          <nuxt-link :to="fullPath">レビューを書く</nuxt-link>
        </span>
      </p>
    </footer>
  </div>
</template>

<script>
import firebase from "@/plugins/firebase";
const db = firebase.firestore();

export default {
  props: ["coffee"],
  data() {
    return {
      beanData: {},
    };
  },
  async mounted() {
    await db
      .collection("beans")
      .doc(this.coffee.bean_id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.debug("bean data:", doc.data());
          this.beanData = doc.data();
        }
      });
  },

  computed: {
    fullPath: function () {
      return "/reviews/create/" + this.coffee.id;
    },
  },
};
</script>

<style>
</style>