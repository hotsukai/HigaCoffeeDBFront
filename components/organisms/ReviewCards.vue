<template>
  <div>
    <div v-for="review in reviews" :key="review.id">
      <ReviewCard :review="review" />
    </div>
  </div>
</template>
      
<script>
export default {
  props: ["reviews"],
};
</script>
      
      <style>
</style>