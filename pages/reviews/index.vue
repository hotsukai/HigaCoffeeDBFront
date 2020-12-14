<template>
  <div>
    <p class="title">レビューを読む</p>
    <form>
      <div class="select is-multiple">
        <select multiple v-model="selectedBeans"
          ><option v-for="bean in beans" :key="bean.id" :value="bean.id">{{
            bean.name
          }}</option></select
        >
      </div>
    </form>
    <ReviewCards :reviews="reviews"></ReviewCards>
  </div>
</template>

// TODO最新n件を表示する。
<script>
export default {
  data() {
    return {
      reviews: [],
      beans: [],
      selectedBeans: []
    };
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
  }
};
</script>

<style></style>
