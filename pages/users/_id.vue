<template>
  <div v-if="user">
    <h1 v-show="!isCurrentUser" class="title">{{ user.name }}</h1>
    <h1 v-show="isCurrentUser" class="title">{{ user.name }}(マイページ)</h1>
    <p class="subtitle">User-ID : {{ user.id }}</p>
    <p class="subtitle">レビュー</p>
    <div v-show="isReviewExist">
      <review-cards
        :reviews="reviews"
        :is-horizonal="true"
        :exist-more="reviewExistMore"
        class="cards"
        @view-more-button-click="getMoreReviews()"
      />
    </div>
    <div v-show="!isReviewExist">
      <p>まだレビューがありません</p>
    </div>
    <hr />
    <p class="subtitle">コーヒー</p>
    <div v-show="isCoffeeExist">
      <coffee-cards
        :coffees="coffees"
        :show-review="true"
        :show-details="true"
        :exist-more="coffeeExistMore"
        class="cards"
        @view-more-button-click="getMoreCoffees()"
      />
    </div>
    <div v-show="!isCoffeeExist">
      <p>まだコーヒーがありません</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import CoffeeCards from "~/components/CoffeeCards.vue";
import ReviewCards from "~/components/ReviewCards.vue";
import { User, Coffee, Review } from "~/types/models";

export default Vue.extend(
  {
    // IMO: この2つのコンポーネントは共通化できそう
  components: { CoffeeCards, ReviewCards },
  data(): {
    reviews: Array<Review>;
    coffees: Array<Coffee>;
    user: User | null;
    isCurrentUser: boolean;
    coffeeExistMore: boolean;
    reviewExistMore: boolean;
  } {
    return {
      reviews: [],
      coffees: [],
      user: null,
      isCurrentUser: false,
      coffeeExistMore: false,
      reviewExistMore: false,
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
    let user: User = await this.$axios
      .$get("/users/" + this.$route.params.id)
      .then((res) => {
        return res.data;
      });
    this.user = user;
    this.isCurrentUser = user.id == this.$store.state.currentUser.id;

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
        this.reviewExistMore = result[0].existMore;
        this.coffeeExistMore = result[1].existMore;
      })
      .catch((e: { response: { message: string } }) => {
        this.$toast.error("エラーが発生しました。" + e.response.message);
        console.error(
          "エラーが発生しました。" + JSON.stringify(e.response, null, 2)
        );
        this.$router.push("/");
      });
  },

  methods: {
    getMoreReview() {
      return;
    },
    async getMoreCoffees(): Promise<void> {
      if (!this.user || !this.coffeeExistMore) return;
      this.$axios
        .$get("/coffees", {
          params: { dripper_id: this.user.id, offset: this.coffees.length },
        })
        .then((res) => {
          this.coffees.push(...res.data);
          this.coffeeExistMore = res.existMore;
        });
    },
    async getMoreReviews(): Promise<void> {
      if (!this.user || !this.reviewExistMore) return;
      this.$axios
        .$get("/reviews", {
          params: { reviewer: this.user.id, offset: this.reviews.length },
        })
        .then((res) => {
          this.reviews.push(...res.data);
          this.reviewExistMore = res.existMore;
        });
    },
  },
});
</script>

<style scoped>
.cards {
  margin-bottom: 2em;
}
</style>
