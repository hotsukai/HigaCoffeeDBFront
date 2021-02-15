<template>
  <div>
    <h1 class="title">かく</h1>
    <coffee-card :coffee="coffee" :show-details="false" style="height: auto"
      ><span></span
    ></coffee-card>
    <review-form :coffee="coffee" @reviewFromForm="sendReview"></review-form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Coffee, Review } from "~/types/models";
import CoffeeCard from "~/components/CoffeeCard.vue";
import ReviewForm from "~/components/ReviewForm.vue";

export default Vue.extend({
  components: { CoffeeCard, ReviewForm },
  data(): {
    coffee: Coffee | null;
    coffeeId: number;
  } {
    return {
      coffee: null,
      coffeeId: parseInt(this.$route.params.id),
    };
  },

  async created() {
    this.coffee = await this.$axios
      .$get("/coffees/" + this.coffeeId)
      .then((res) => {
        return res.data;
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
      if (!this.coffee) return;
      await this.$axios
        .$post("/reviews", {
          bitterness: review.bitterness,
          coffeeId: review.coffee.id,
          feeling: review.feeling,
          situation: review.situation,
          strongness: review.strongness,
          reviewerId: review.reviewer?.id,
          wantRepeat: review.wantRepeat,
        })
        .then((res) => {
          if (res.result) {
            this.$toast.success("レビューを作成しました");
          } else {
            this.$toast.error("レビューの作成に失敗しました" + res.message);
            console.error(res.message);
          }
          this.$router.push('/users/' + this.$store.state.currentUser.id);
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

