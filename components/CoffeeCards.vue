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

<style>
</style>