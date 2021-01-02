<template>
  <div>
    <p class="title">レビューを読む</p>
    <filter-button/>
    <form>
      <div class="select is-multiple">
        <select v-model="selectedBeans" multiple>
          <option v-for="bean in beans" :key="bean.id" :value="bean.id">
            {{ bean.name }}
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
    async selectedBeans(val: Array<number>): Promise<any> {
      let beansParam = val.join();
      this.reviews = await this.$axios
        .$get("/reviews", {
          params: {
            beans: beansParam,
          },
        })
        .then((res: { data: Array<Review> }) => {
          return res.data;
        });
    },
  },

  async created(): Promise<any> {
    await this.$axios
      .$get("/beans")
      .then((res: { data: Bean[] }) => {
        this.beans = res.data;
        this.selectedBeans = Object.keys(this.beans).map((key) =>
          parseInt(key)
        );
      })
      .catch((e: string) => {
        console.warn("データの取得でエラーが発生しました : " + e);
      });
  },
});
</script>

<style></style>
