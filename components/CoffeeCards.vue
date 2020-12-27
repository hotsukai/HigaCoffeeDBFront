<template>
  <ul v-if="coffees" class="horizonal-list">
    <li v-for="coffee in coffees" v-bind:key="coffee.id" class="horizonal-item">
      <CoffeeCard
        :coffee="coffee"
        :showReview="showReview"
        :createReview="createReview"
        :showDetails="showDetails"
      ></CoffeeCard>
    </li>
    <button class="button">もっとみる</button>
  </ul>
</template>
      
<script>
export default {
  props: {
    coffees: Array,
    showReview: Boolean,
    createReview: Boolean,
    showDetails: Boolean,
  },
};
</script>
<style scoped>
.horizonal-list {
  overflow-x: auto;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
}
.horizonal-item {
  /* 横スクロール用 */
  display: inline-block;
  width: 80%;
  height: -webkit-fill-available;
  margin: 1em;
}
.button {
  display: inline-block;
  margin-top: 30%;
}
</style>