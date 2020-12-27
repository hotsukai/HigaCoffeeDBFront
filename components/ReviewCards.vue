<template>
  <ul class="horizonal-list">
    <li v-for="review in reviews" :key="review.id" class="horizonal-item">
      <ReviewCard :review="review" :key="'reviewCard-'+review.id"/>
    </li>
    <button class="button">もっとみる</button>
  </ul>
</template>
      
<script>
export default {
  props: { reviews: Array },
};
</script>
      
<style scoped>
.horizonal-list {
  overflow-x: auto;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
}
.horizonal-item {
  /* 横スクロール用 */
  display: inline-block;
  width: 80%;
  margin: 1em;
}
.button {
  display: inline-block;
  margin-top: 30%;
}
</style>