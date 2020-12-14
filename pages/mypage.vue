<template>
  <div v-if="user">
    <h1 class="title">{{ user.name }}のマイページ</h1>
    <p class="subtitle">あなたが書いたレビュー</p>
    <div v-show="isReviewExist">
      <ReviewCards :reviews="reviews" />
      <div class v-show="false">
        <button @click="getMoreReview" class="button">もっと見る</button>
      </div>
    </div>
    <div v-show="!isReviewExist">
      <p>まだレビューがありません</p>
    </div>
    <p class="subtitle">あなたが淹れたコーヒー</p>
    <div v-show="isCoffeeExist">
      <CoffeeCards :coffees="coffees" :showReview="true"
        ></CoffeeCards>
      <!-- TODO: レビューを見るボタン -->
      <div class v-show="true">
        <button @click="getMoreCoffee" class="button">もっと見る</button>
      </div>
    </div>
    <div v-show="!isCoffeeExist">
      <p>まだコーヒーがありません</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      reviews: [],
      coffees: [],
      user: {}
    };
  },

  async created() {
    let user = this.$store.state.currentUser;
    this.user = user;
    if (!user) {
      alert("ログインしてください");
      this.$router.push("/login");
    }

    const getReviews = await this.$axios.$get("/reviews", {
      params: { reviewer: user.id }
    });

    const getCoffees = await this.$axios.$get("/coffees", {
      params: { dripper_id: user.id }
    });
    await Promise.all([getReviews, getCoffees])
      .then(result => {
        this.reviews = result[0].data;
        this.coffees = result[1].data;
      })
      .catch(e => {
        console.warn("データの取得でエラーが発生しました : " + e);
      });
  },

  computed: {
    isReviewExist() {
      return this.reviews.length > 0;
    },
    isCoffeeExist() {
      return this.coffees.length > 0;
    }
  },

  methods: {
    getMoreReview() {},
    getMoreCoffee() {}
  }
};
</script>

<style>
.profile-img {
  height: 3em;
}
</style>
