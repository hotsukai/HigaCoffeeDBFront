<template>
  <div>
    <p>ID:{{coffeeId}}のコーヒーについて</p>
    <ReviewForm :coffeeId="coffeeId"></ReviewForm>
  </div>
</template>

<script>
export default {
  data() {
    return {
      coffeeId: "",
    };
  },
  created() {
    this.coffeeId = this.$route.params.id;
  },
};
</script>

<style>
</style>