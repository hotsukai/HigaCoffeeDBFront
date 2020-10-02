<template>
  <div class="card" v-if="coffee">
    <div class="card-content">
      <p class="title">
        <BeanName :bean-id="coffee.beanId" />
      </p>
      <p class="subtitle">ID: {{ coffee.id }}</p>
      <ul>
        <li>
          登録された時間 :
          <TimeFirebaseToJs :time="coffee.registeredTime" />
        </li>
        <li>蒸らし時間 : {{ coffee.extractionTime }}min</li>
        <li>粉の量 : {{ coffee.powderAmount }}g</li>
        <li>水の量 : {{ coffee.waterAmount }}ml</li>
        <li>メッシュ : {{ coffee.mesh }}</li>
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
    <slot>
      <footer class="card-footer">
        <p class="card-footer-item">
          <span>
            <nuxt-link :to="fullPath" class="button is-primary"
              >レビューを書く</nuxt-link
            >
          </span>
          <span>
            <CoffeeDeleteButton :coffee="coffee" :user="user" />
          </span>
        </p>
      </footer>
    </slot>
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
  props: ["coffee", "user"],

  computed: {
    fullPath: function () {
      return "/reviews/create/" + this.coffee.id;
    },
  },
};
</script>

<style>
</style>