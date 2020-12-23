<template>
  <div v-if="coffees">
    <div v-for="coffee in coffees" v-bind:key="coffee.id">
      <CoffeeCard :coffee="coffee" :showReview="showReview" :createReview="createReview" :showDetails="showDetails"></CoffeeCard>
    </div>
  </div>
</template>
      
<script>
export default {
  props: ["coffees", "showReview","createReview","showDetails"],
};
</script>

<style>
</style>