<template>
  <!-- TODO:削除する方法を作る。 -->
  <div class="card">
    <div class="card-content">
      <p class="title">
        <BeanName :bean-id="coffee.beanId" />
      </p>
      <p class="subtitle">ID: {{coffee.id}}</p>
      <ul>
        <!-- TODO: すべてコンポーネントにする -->
        <li>蒸らし時間 : {{coffee.extractionTime}}min</li>
        <li>粉の量 : {{coffee.powderAmount}}g</li>
        <li>水の量 : {{coffee.waterAmount}}ml</li>
        <li>メッシュ : {{coffee.mesh}}</li>
        <li>
          湯温 :
          <WaterTemperature :wt="coffee.WaterTemperature" />
        </li>
        <li>
          抽出方法 :
          <Method :em="coffee.extractionMethodId" />
        </li>
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

<style  scoped>
.card {
  margin-bottom: 1em;
}
</style>

<script>
import firebase from "@/plugins/firebase";
const db = firebase.firestore();

export default {
  props: ["coffee"],

  computed: {
    fullPath: function () {
      return "/reviews/create/" + this.coffee.id;
    },
  },
};
</script>

<style>
</style>