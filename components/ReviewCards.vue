<template>
  <ul class="horizonal-list">
    <ul v-for="review in reviews" :key="review.id" class="horizonal-item">
      <ReviewCard :review="review" />
    </ul>
  </ul>
</template>
      
<script>
export default {
  props: ["reviews"],
};
</script>
      
<style>
.horizonal-list {
  overflow-x: auto;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
}
.horizonal-item {
  /* 横スクロール用 */
  display: inline-block;
  width: 80%;
  margin :1em;
}
</style>