<template>
  <div v-if="user">
    <h1 class="title">{{ user.name }}のマイページ</h1>
    <p class="subtitle">User-ID : {{ user.id }}</p>
    <p class="subtitle">あなたが書いたレビュー</p>
    <div v-show="isReviewExist">
      <ReviewCards :reviews="reviews" :is-horizonal="true" class="cards" />
    </div>
    <div v-show="!isReviewExist">
      <p>まだレビューがありません</p>
    </div>
    <hr />
    <p class="subtitle">あなたが淹れたコーヒー</p>
    <div v-show="isCoffeeExist">
      <CoffeeCards
        :coffees="coffees"
        :show-review="true"
        :show-details="true"
        class="cards"
      ></CoffeeCards>
    </div>
    <div v-show="!isCoffeeExist">
      <p>まだコーヒーがありません</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { User, Coffee, Review } from "~/types/models";

export default Vue.extend({
  data(): {
    reviews: Array<Review>;
    coffees: Array<Coffee>;
    user: User | null;
  } {
    return {
      reviews: [],
      coffees: [],
      user: null,
    };
  },

  computed: {
    isReviewExist(): boolean {
      return this.reviews.length > 0;
    },
    isCoffeeExist(): boolean {
      return this.coffees.length > 0;
    },
  },

  async created() {
    let user: User = this.$store.state.currentUser;
    this.user = user;
    if (!user) {
      this.$toast.show("ログインしてください");
      this.$router.push("/login");
    }

    const getReviews = await this.$axios.$get("/reviews", {
      params: { reviewer: user.id },
    });

    const getCoffees = await this.$axios.$get("/coffees", {
      params: { dripper_id: user.id },
    });
    await Promise.all([getReviews, getCoffees])
      .then((result) => {
        this.reviews = result[0].data;
        this.coffees = result[1].data;
      })
      .catch((e) => {
        console.warn("データの取得でエラーが発生しました : " + e);
      });
  },

  methods: {
    getMoreReview() {
      return;
    },
    getMoreCoffee() {
      return;
    },
  },
});
</script>

<style scoped>
.cards {
  margin-bottom: 2em;
}
</style>
