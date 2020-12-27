<template>
  <ul class="horizonal-list">
    <li v-for="review in reviews" :key="review.id" class="horizonal-item">
      <ReviewCard :review="review" :key="'reviewCard-'+review.id"/>
    </li>
    <a class="view-more"><i class="fas fa-angle-double-right"></i></a>
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

.view-more{
  display: inline-block;
  margin-top: 2%;
  font-size:3em;
}
</style>