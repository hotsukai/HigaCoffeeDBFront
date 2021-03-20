<template>
  <ul :class="{ 'horizonal-list': isHorizonal }">
    <li
      v-for="review in reviews"
      :key="review.id"
      :class="{ 'horizonal-item': isHorizonal }"
    >
      <ReviewCard :key="'reviewCard-' + review.id" :review="review" />
    </li>
    <li v-show="existMore" class="view-more-box horizonal-item">
      <div class="view-more">
        <a @click="viewMore">
          <i class="fas fa-angle-double-right"></i>
        </a>
      </div>
    </li>
  </ul>
</template>
      
<script lang="ts">
import Vue, { PropType } from "vue";
import { Review } from "~/types/models";
export default Vue.extend({
  props: {
    reviews: { type: Array as PropType<Review[]>, default: () => [] },
    isHorizonal: { type: Boolean, default: false },
    existMore: { type: Boolean, default: false },
  },
  methods: {
    viewMore(): void {
      this.$emit("view-more-button-click");
    },
  },
});
</script>
      
<style lang="scss" scoped>
.horizonal-list {
  overflow-x: auto;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  .horizonal-item {
    display: inline-block;
    width: 80%;
    max-width: 25em;
    margin-right: 3em;
    vertical-align: top;
    white-space: normal;
  }
  .view-more-box {
    margin: 0;
    position: relative;
    height: 400px;
    width: 30px;
    .view-more {
      position: absolute;
      font-size: 5rem;
      top: 50%;
      left: 50%;
      transform: translateY(-50%) translateX(-50%);
      -webkit-transform: translateY(-50%) translateX(-50%);
    }
  }
}
</style>