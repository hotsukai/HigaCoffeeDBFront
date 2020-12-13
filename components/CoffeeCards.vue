<template>
  <div v-if="coffees">
    <div v-for="coffee in coffees" v-bind:key="coffee.id">
      <CoffeeCard :coffee="coffee" :user="user" :showReview="showReview" :createReview="createReview"></CoffeeCard>
    </div>
  </div>
</template>
      
<script>
export default {
  props: ["coffees", "user","showReview","createReview"],
};
</script>

<style>
</style>