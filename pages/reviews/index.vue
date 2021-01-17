<template>
  <div>
    <p class="title">レビューを読む</p>
    <filter-button />
    <form>
      <div class="select is-multiple">
        <select v-model="selectedBeans" multiple>
          <option v-for="bean in beans" :key="bean.id" :value="bean.id">
            {{ bean.fullName }}
          </option>
        </select>
      </div>
    </form>
    <ReviewCards :reviews="reviews"></ReviewCards>
    <div v-show="reviews.length === 0">
      条件に該当するレビューがまだありません
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Bean, Review } from "~/types/models";
export default Vue.extend({
  data(): {
    reviews: Array<Review>;
    beans: Array<Bean>;
    selectedBeans: Array<number>;
  } {
    return {
      reviews: [],
      beans: [],
      selectedBeans: [],
    };
  },

  watch: {
    async selectedBeans(val: Array<number>): Promise<void> {
      let beansParam = val.join();
      this.reviews = await this.$axios
        .$get("/reviews", {
          params: {
            beans: beansParam,
          },
        })
        .then((res: { data: Array<Review> }) => {
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
  },

  async created(): Promise<void> {
    await this.$axios
      .$get("/beans")
      .then((res: { data: Bean[] }) => {
        this.beans = res.data;
        this.selectedBeans = Object.keys(this.beans).map((key) =>
          parseInt(key)
        );
      })
      .catch((e: { response: { message: string } }) => {
        this.$toast.error("エラーが発生しました。" + e.response.message);
        console.error(
          "エラーが発生しました。" + JSON.stringify(e.response, null, 2)
        );
        this.$router.push("/");
      });
  },
});
</script>

<style></style>
