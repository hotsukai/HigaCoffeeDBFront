<template>
  <div>
    <div v-for="coffee in coffees">
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