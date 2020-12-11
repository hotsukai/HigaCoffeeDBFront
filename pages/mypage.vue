<template>
  <div v-if="user">
    <h1 class="title">{{ user.name }}のマイページ</h1>
    <div>
      <!-- <img :src="photoURL" class="profile-img" /> -->
      <p>お名前:{{ user.name }}</p>
    </div>
    <!-- <RentalButton :user="currentUser" />-->
    <p class="subtitle">あなたが書いたレビュー</p>
    <div v-show="isReviewExist">
      <ReviewCards :reviews="reviews" />
      <div class v-show="false">
        <button @click="getMoreReview">もっと見る</button>
      </div>
    </div>
    <div v-show="!isReviewExist">
      <p>まだレビューがありません</p>
    </div>
    <p class="subtitle">あなたが淹れたコーヒー</p>
    <div v-show="isCoffeeExist">
      <CoffeeCards :coffees="coffees" />
      <div class v-show="true">
        <button @click="getMoreCoffee">もっと見る</button>
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

    this.reviews = await this.$axios
      .$get("/reviews", { params: { reviewer: user.id } })
      .then(response => {
        return response.data;
      });

    this.coffees = await this.$axios.$get("/coffees", {
      params: { dripper_id: user.id }
    }).then(res=>{
      return res.data
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
