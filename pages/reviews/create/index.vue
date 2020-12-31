<template>
  <div>
    <h1 class="title">あなたあてのコーヒー</h1>
    <div v-show="isCoffeeExist">
      <CoffeeCards :coffees="coffees" :show-review="false" :create-review="true" :show-details="false"/>
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

  computed: {
    isCoffeeExist() {
      return this.coffees.length > 0;
    }
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
  }
};
</script>

<style></style>
