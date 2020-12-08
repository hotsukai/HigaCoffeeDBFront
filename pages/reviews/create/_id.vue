<template>
  <div>
    <CoffeeCard :coffee="coffee"></CoffeeCard>
  </div>
</template>

<script>
export default {
  data() {
    return {
      coffee: null,
    };
  },

  created() {
    let coffeeId = this.$route.params.id;
  },
};
</script>

<style>
</style>