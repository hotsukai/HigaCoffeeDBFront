<template>
  <ul v-if="coffees" class="horizonal-list">
    <li v-for="coffee in coffees" :key="coffee.id" class="horizonal-item">
      <CoffeeCard
        :coffee="coffee"
        :show-review="showReview"
        :create-review="createReview"
        :show-details="showDetails"
      ></CoffeeCard>
    </li>
    <a class="view-more"><i class="fas fa-angle-double-right"></i></a>
  </ul>
</template>
      
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    coffees: { type: Array , default: () => [] },
    showReview: Boolean,
    createReview: Boolean,
    showDetails: Boolean,
  },
});
</script>

<style scoped>
.horizonal-list {
  overflow-x: auto;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
}
.horizonal-item {
  display: inline-block;
  width: 80%;
  max-width: 25em;
  margin: 0em 2em 1em 0em;
  vertical-align: top;
}
.view-more {
  display: inline-block;
  margin-top: 2%;
  font-size: 3em;
}
</style>