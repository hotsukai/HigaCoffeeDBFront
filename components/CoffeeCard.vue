<template>
  <div class="card" v-if="coffee">
    <div class="card-content">
      <p class="title">
        {{ coffee.bean.name }}
      </p>
      <p class="subtitle">Coffee-ID: {{ coffee.id }}</p>
      <ul>
        <li>登録された時間 : <ConvertTime :time="coffee.createdAt" /></li>
        <li v-if="coffee.dripper">淹れた人 : {{ coffee.dripper.name }}</li>
        <li v-if="coffee.drinkers">
          飲む人 :
          <span v-for="drinker in coffee.drinkers" :key="drinker.id"
            >{{ drinker.name }},
          </span>
        </li>
        <li v-if="coffee.memo">
          メモ:
          {{ coffee.memo }}
        </li>
        <li v-if="showDetails && coffee.extractionTime">
          蒸らし時間 : {{ coffee.extractionTime }}min
        </li>
        <li v-if="showDetails && coffee.powderAmount">
          粉の量 : {{ coffee.powderAmount }}g
        </li>
        <li v-if="showDetails && coffee.waterAmount">
          水の量 : {{ coffee.waterAmount }}ml
        </li>
        <li v-if="showDetails && coffee.meshId">
          メッシュ : {{ coffee.meshId }}
        </li>
        <li v-if="showDetails && coffee.waterTemperature">
          湯温 :
          {{ coffee.waterTemperature }}
        </li>
        <li v-if="showDetails && coffee.extractionMethod">
          抽出方法 :
          {{ coffee.extractionMethod.name }}
        </li>
      </ul>
    </div>
    <slot>
      <footer class="card-footer">
        <p class="card-footer-item" v-show="createReview">
          <span>
            <nuxt-link :to="'/reviews/create/' + coffee.id" class="button"
              >レビューを書く</nuxt-link
            >
          </span>
        </p>
        <p
          class="card-footer-item"
          v-show="showReview && coffee.reviewId.length > 0"
        >
          <span>
            <nuxt-link :to="'reviews?coffeeId=' + coffee.id" class="button"
              >レビューを見る</nuxt-link
            >
          </span>
        </p>
      </footer>
    </slot>
  </div>
</template>

<style scoped>
.card {
  margin-bottom: 1em;
}
</style>

<script>
export default {
  props: {
    coffee: Object,
    showReview: Boolean,
    createReview: Boolean,
    showDetails: { type: Boolean, default: true }
  },

  computed: {
    fullPath: function() {
      return "/reviews/create/" + this.coffee.id;
    }
  }
};
</script>

<style></style>
