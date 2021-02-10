<template>
  <ul v-if="coffees" class="horizonal-list">
    <li v-for="coffee in coffees" :key="coffee.id" class="horizonal-item">
      <CoffeeCard
        :coffee="coffee"
        :show-review="showReview"
        :create-review="createReview"
        :show-details="showDetails"
      ></CoffeeCard>
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
import { Coffee } from "~/types/models";
export default Vue.extend({
  props: {
    coffees: { type: Array as PropType<Coffee[]>, default: null },
    showReview: Boolean,
    createReview: Boolean,
    showDetails: Boolean,
    existMore: { type: Boolean, default: false },
  },
  methods:{
    viewMore():void{
      this.$emit("view-more-button-click")
    }
  }
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
    margin: 0em 2em 1em 0em;
    vertical-align: top;
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