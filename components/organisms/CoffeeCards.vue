<template>
  <div v-if="coffees">
    <div v-for="coffee in coffees" v-bind:key="coffee.id">
      <CoffeeCard :coffee="coffee" />
    </div>
  </div>
</template>
      
<script>
export default {
  props: ["coffees"],
};
</script>

<style>
</style>