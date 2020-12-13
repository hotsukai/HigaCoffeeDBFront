<template>
  <div>
    <h1 class="title">あなたあてのコーヒー</h1>
    <div v-show="isCoffeeExist">
      <CoffeeCards :coffees="coffees" :showReview="false" :createReview="true"/>
    </div>
    <div v-show="!isCoffeeExist">あなたあてのコーヒーがありません。</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      coffees: []
    };
  },

  async created() {
    let user = this.$store.state.currentUser
    this.coffees = await this.$axios.$get("/coffees", {
      params: {
        has_review: false,
        drinker_id: user.id
      }
    }).then(res =>{
      return res.data
    });
  },

  computed: {
    isCoffeeExist() {
      return this.coffees.length > 0;
    }
  }
};
</script>

<style></style>
