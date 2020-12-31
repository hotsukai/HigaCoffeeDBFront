<template>
  <ul :class="{ 'horizonal-list': isHorizonal }">
    <li
      v-for="review in reviews"
      :key="review.id"
      :class="{ 'horizonal-item': isHorizonal }"
    >
      <ReviewCard :key="'reviewCard-' + review.id" :review="review" />
    </li>
    <a class="view-more"><i class="fas fa-angle-double-right"></i></a>
  </ul>
</template>
      
<script>
export default {
  props: {
    reviews: { type: Array, default: new Array() },
    isHorizonal: { type: Boolean, default: false },
  },
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
  vertical-align: top;
  width: 80%;
  max-width: 25em;
  margin: 0em 2em 1em 0em;
}

.view-more {
  display: inline-block;
  margin-top: 2%;
  font-size: 3em;
}
</style>