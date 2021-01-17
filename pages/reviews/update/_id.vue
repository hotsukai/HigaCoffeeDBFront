<template>
  <div>
    <h1 class="title">かきなおす</h1>
    <CoffeeCard :coffee="coffee" :show-details="true" style="height: auto"
      ><span></span
    ></CoffeeCard>
    <review-form
      v-if="review"
      :coffee="coffee"
      :existing-review="review"
      @reviewFromForm="sendReview"
    ></review-form>
  </div>
</template>

<script lang="ts">
import { Coffee, Review } from "~/types/models";
import Vue from "vue";
import ReviewForm from "~/components/ReviewForm.vue";
export default Vue.extend({
  components: { ReviewForm },
  data(): {
    review: Review | null;
    reviewId: number;
    coffee: Coffee | null;
  } {
    return {
      review: null,
      reviewId: parseInt(this.$route.params.id),
      coffee: null,
    };
  },

  async created() {
    await this.$axios
      .$get("/reviews/" + this.reviewId)
      .then((res: { data: Review }) => {
        this.review = res.data;
        this.coffee = res.data.coffee;
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
    async sendReview(review: Review): Promise<void> {
      await this.$axios
        .$put("/reviews/" + this.reviewId, {
          bitterness: review.bitterness,
          coffeeId: review.coffee.id,
          feeling: review.feeling,
          situation: review.situation,
          strongness: review.strongness,
          reviewerId: this.$store.state.currentUser.id,
          wantRepeat: review.wantRepeat,
        })
        .then((res: { result: boolean; message: string }) => {
          if (res.result) {
            this.$toast.success("レビューを更新しました");
          } else {
            this.$toast.error("レビューの更新に失敗しました" + res.message);
          }
          this.$router.push("/mypage");
        })
        .catch((e: { response: { message: string } }) => {
          this.$toast.error("エラーが発生しました。" + e.response.message);
          console.error(
            "エラーが発生しました。" + JSON.stringify(e.response, null, 2)
          );
          this.$router.push("/");
        });
    },
  },
});
</script>


