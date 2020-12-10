<template>
  <div>
    <p class="title">レビューを読む</p>
    <form>
      <select class="select"
        ><option>ブラジル中煎り</option></select
      >
    </form>
    <ReviewCards :reviews="reviews"></ReviewCards>
  </div>
</template>

// TODO最新n件を表示する。
<script>
export default {
  data() {
    return {
      reviews: []
    };
  },

  async created() {
    this.reviews = await this.$axios
      .$get("/reviews")
      .then(response => {
        if (response.result) {
          return response.data;
        } else {
          alert("データの取得に失敗しました。" + response.message);
        }
      })
      .catch(e => {
        alert("データの取得に失敗しました。" + response.message);
      });
  }
};
</script>

<style></style>
