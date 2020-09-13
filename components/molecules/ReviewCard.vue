<template>
  <div class="card">
    <div class="card-content">
      <p class="title">
        <BeanName :bean-id="targetCoffee.beanId" />

      </p>
      <p class="subtitle">ID : {{review.coffeeId}}</p>
      <div class="columns is-mobile">
        <div class="column">
          <ul>
            <li>苦さ : {{review.bitterness}}</li>
            <li>濃さ : {{review.strongness}}</li>
            <li>また飲みたいか : {{repeatToJapanese}}</li>
            <li>役割 : {{situationToJapanese}}</li>
          </ul>
        </div>
        <div class="column">
          <ul>
            <!-- TODO: すべてコンポーネントにする -->
            <li>蒸らし時間 : {{targetCoffee.extractionTime}}min</li>
            <li>粉の量 : {{targetCoffee.powderAmount}}g</li>
            <li>水の量 : {{targetCoffee.waterAmount}}ml</li>
            <li>メッシュ : {{targetCoffee.mesh}}</li>
            <li>
              湯温 :
              <WaterTemperature :wt="targetCoffee.WaterTemperature" />
            </li>
            <li>
              抽出方法 :
              <Method :em="targetCoffee.extractionMethodId" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "@/plugins/firebase";
const db = firebase.firestore();

export default {
  props: ["review"],
  data() {
    return {
      targetCoffee: {},
    };
  },

  async created() {
    await db
      .collection("coffees")
      .doc(this.review.coffeeId)
      .get()
      // .then(function (doc) {//動かない
      .then((doc) => {
        //動く
        if (doc.exists) {
          this.targetCoffee = doc.data();
        }
      });
  },

  computed: {
    repeatToJapanese() {
      const repeat_japanese = ["飲みたくない!!", "普通", "また飲みたい!"];
      return repeat_japanese[parseInt(this.review.repeat) - 1];
    },

    situationToJapanese() {
      const situation_japanese = [
        "リラックス",
        "ややリラックス",
        "やや眠気覚まし",
        "眠気覚まし",
      ];
      return situation_japanese[parseInt(this.review.situation) - 1];
    },
  },
};
</script>

<style scoped>
.card {
  margin-bottom: 1em;
}
</style>