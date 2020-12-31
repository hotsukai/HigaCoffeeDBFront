<template>
  <div>
    <p class="title">レビューを読む</p>
    <form>
      <div class="select is-multiple">
        <select v-model="selectedBeans" multiple
          ><option v-for="bean in beans" :key="bean.id" :value="bean.id">{{
            bean.name
          }}</option></select
        >
      </div>
    </form>
    <ReviewCards :reviews="reviews"></ReviewCards>
    <div v-show="reviews.length === 0">条件に該当するレビューがまだありません</div>
  </div>
</template>

<script>
// TODO:絞り込み条件を増やす
export default {
  data() {
    return {
      reviews: [],
      beans: [],
      selectedBeans: []
    };
  },

  watch: {
    async selectedBeans(val) {
      let beansParam = val.join();
      this.reviews = await this.$axios
        .$get("/reviews", {
          params: {
            beans: beansParam
          }
        })
        .then(res => {
          return res.data;
        });
    }
  },

  async created() {
    const getBeans = await this.$axios
      .$get("/beans")
      .then(res => {
        this.beans = res.data;
        this.selectedBeans = Object.keys(this.beans);
      })
      .catch(e => {
        console.warn("データの取得でエラーが発生しました : " + e);
      });
  }
};
</script>

<style></style>
