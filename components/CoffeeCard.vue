<template>
  <div v-if="coffee" class="card">
    <div class="card-content">
      <p class="title is-4">
        <nuxt-link :to="'/reviews?bean=' + coffee.bean.id">
          {{ coffee.bean.name }}
        </nuxt-link>
      </p>
      <p class="subtitle is-6">Coffee-ID : {{ coffee.id }}</p>
      <ul>
        <li>抽出日 : <ConvertTime :time="coffee.createdAt" /></li>
        <li v-if="coffee.dripper">
          <UsersName :users="[coffee.dripper]">Dripper : </UsersName>
        </li>
        <li v-if="coffee.drinkers">
          <UsersName :users="coffee.drinkers">Drinkers : </UsersName>
        </li>
        <li v-if="coffee.memo">
          メモ:
          {{ coffee.memo }}
        </li>
        <CoffeeDetails v-if="showDetails" :coffee="coffee" />
      </ul>
    </div>
    <slot>
      <footer class="card-footer">
        <p v-show="createReview" class="card-footer-item">
          <span>
            <nuxt-link :to="'/reviews/create/' + coffee.id" class="button"
              >レビューを書く</nuxt-link
            >
          </span>
        </p>
        <p
          v-show="showReview && coffee.reviewId.length > 0"
          class="card-footer-item"
        >
          <span>
            <nuxt-link :to="'reviews?coffeeId=' + coffee.id" class="button"
              >レビューを見る</nuxt-link
            >
          </span>
        </p>
      </footer>
    </slot>
  </div>
</template>



<script>
export default {
  props: {
    coffee: { type: Object, default: new Object() },
    showReview: Boolean,
    createReview: Boolean,
    showDetails: { type: Boolean, default: true },
  },

  computed: {
    fullPath: function () {
      return "/reviews/create/" + this.coffee.id;
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  margin-bottom: 1em;
  height: 400px;
  .card-content {
    height: 340px;
  }
  .card-footer-item {
    height: 60px;
  }
}
</style>