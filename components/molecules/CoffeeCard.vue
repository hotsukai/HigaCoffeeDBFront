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
        <li>
          登録された時間 :
          <TimeFirebaseToJs :time="coffee.createdTime" />
        </li>
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
          <nuxt-link :to="fullPath" class="button is-primary">レビューを書く</nuxt-link>
        </span>
        <span>
          <button class="button is-danger" @click="confirmDelete()">削除</button>
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

  methods: {
    deleteCoffee() {
      db.collection("coffees")
        .doc(this.coffee.id)
        .delete()
        .then(function () {
          console.log("Document successfully deleted!");
        })
        .catch(function (error) {
          console.error("Error removing document: ", error);
        });
    },

    confirmDelete() {
      // TODO:確認モダール作成
      var answer = window.confirm(this.coffee.id + "のコーヒーを削除します");
      if (answer == true) {
        this.deleteCoffee();
        this.$router.push("/mypage");
      }
    },
  },
};
</script>

<style>
</style>