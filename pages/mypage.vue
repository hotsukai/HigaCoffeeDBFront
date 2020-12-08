<template>
  <div v-if="user">
    <h1 class="title">{{ user.name }}のマイページ</h1>
    <div>
      <!-- <img :src="photoURL" class="profile-img" /> -->
      <p>お名前:{{ user.name }}</p>
    </div>
    <!-- <RentalButton :user="currentUser" />-->
    <div v-show="isReviewExist">
      <p class="subtitle">あなたが書いたレビュー</p>
      <ReviewCards :reviews="reviews" />
      <div class v-show="false">
        <button @click="getMoreReview">もっと見る</button>
      </div>
    </div>
    <div v-show="!isReviewExist">
      <p>まだレビューがありません</p>
    </div>
  </div> 
</template>

<script>
export default {
  data() {
    return {
      reviews: [],
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
  },

  computed: {
    isReviewExist() {
      return this.reviews.length > 0;
    }
  },

  methods: {
    getMoreReview() {}
  }
};
</script>

<style>
.profile-img {
  height: 3em;
}
</style>
